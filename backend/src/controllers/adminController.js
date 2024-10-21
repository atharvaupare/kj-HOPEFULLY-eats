const Admin = require("../models/adminModel");
const Order = require("../models/orderModel")
const jwt = require("jsonwebtoken");

// Generate JWT Token
const generateToken = async (admin) => {
    try {
        const token = jwt.sign(
            { id: admin._id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        // Add token to admin's tokens array
        admin.tokens = admin.tokens || []; // Initialize if undefined
        admin.tokens.push({ token });
        await admin.save();

        return token;
    } catch (error) {
        throw new Error('Error generating token: ' + error.message);
    }
};

// Register Admin
const registerAdmin = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        console.log("Register Admin Request Body:", req.body);

        // Check if the admin already exists by email
        const adminExists = await Admin.findOne({ email });

        if (adminExists) {
            return res
                .status(400)
                .json({ status: "fail", message: "Admin already exists" });
        }

        // Create a new admin
        const admin = new Admin({
            name,
            email,
            password,
        });

        // Save the admin first
        await admin.save();

        // Generate token
        const token = await generateToken(admin);

        // Send response
        res.status(201).json({
            status: "success",
            message: "Admin user registered successfully",
            data: {
                admin: {
                    id: admin._id,
                    name: admin.name,
                    email: admin.email
                },
                token
            }
        });
    } catch (error) {
        console.error("Error Registering admin:", error);

        if (error.name === "ValidationError") {
            return res.status(400).json({
                status: "fail",
                message: "Invalid input data",
                errors: Object.values(error.errors).map(err => err.message)
            });
        }

        res.status(500).json({
            status: "fail",
            message: "Error registering admin"
        });
    }
};

// Login Admin
const loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Input validation
        if (!email || !password) {
            return res.status(400).json({
                status: "fail",
                message: "Please provide email and password"
            });
        }

        // Find admin and select password field explicitly if it's not selected by default
        const admin = await Admin.findOne({ email }).select('+password');

        if (!admin) {
            return res.status(401).json({
                status: "fail",
                message: "Invalid email or password"
            });
        }

        // Check if password matches
        const isMatch = await admin.matchPassword(password);

        if (!isMatch) {
            return res.status(401).json({
                status: "fail",
                message: "Invalid email or password"
            });
        }

        // Generate token
        const token = await generateToken(admin);

        // Remove password from response
        admin.password = undefined;

        res.status(200).json({
            status: "success",
            message: "Login successful",
            data: {
                admin: {
                    id: admin._id,
                    name: admin.name,
                    email: admin.email
                },
                token
            }
        });
    } catch (error) {
        console.error("Error Logging In Admin:", error);
        res.status(500).json({
            status: "fail",
            message: "Error logging in admin"
        });
    }
};

const fetchOrders = async (req, res) => {
    try {
        // Pagination parameters
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        // Filter parameters
        const filterOptions = {};

        // Add status filter if provided
        if (req.query.status) {
            filterOptions.status = req.query.status;
        }

        // Add date range filter if provided
        if (req.query.startDate && req.query.endDate) {
            filterOptions.orderDate = {
                $gte: new Date(req.query.startDate),
                $lte: new Date(req.query.endDate)
            };
        }

        // Add user filter if provided
        if (req.query.userId) {
            filterOptions.user = req.query.userId;
        }

        // Sorting parameters
        const sortOptions = {};
        if (req.query.sortBy) {
            const parts = req.query.sortBy.split(':');
            sortOptions[parts[0]] = parts[1] === 'desc' ? -1 : 1;
        } else {
            // Default sort by most recent
            sortOptions.createdAt = -1;
        }

        // Fetch orders
        const orders = await Order.find(filterOptions)
            .populate('user', 'name email') // Populate user details
            .sort(sortOptions)
            .skip(skip)
            .limit(limit)
            .lean(); // Convert to plain JavaScript objects for better performance

        // Get total count for pagination
        const totalOrders = await Order.countDocuments(filterOptions);
        const totalPages = Math.ceil(totalOrders / limit);

        // Calculate orders statistics
        const statistics = {
            totalOrders,
            pendingOrders: await Order.countDocuments({ ...filterOptions, status: 'pending' }),
            confirmedOrders: await Order.countDocuments({ ...filterOptions, status: 'confirmed' }),
            deliveredOrders: await Order.countDocuments({ ...filterOptions, status: 'delivered' }),
            canceledOrders: await Order.countDocuments({ ...filterOptions, status: 'canceled' })
        };

        res.status(200).json({
            status: 'success',
            message: 'Orders fetched successfully',
            data: {
                orders,
                pagination: {
                    currentPage: page,
                    totalPages,
                    totalOrders,
                    hasNextPage: page < totalPages,
                    hasPrevPage: page > 1
                },
                statistics
            }
        });

    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({
            status: 'error',
            message: 'Error fetching orders',
            error: error.message
        });
    }
};

// Fetch single order by ID
const fetchOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate('user', 'name email');

        if (!order) {
            return res.status(404).json({
                status: 'fail',
                message: 'Order not found'
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Order fetched successfully',
            data: { order }
        });

    } catch (error) {
        console.error('Error fetching order:', error);
        res.status(500).json({
            status: 'error',
            message: 'Error fetching order',
            error: error.message
        });
    }
};

const fetchUserOrders = async (req, res) => {
    try {
        const userId = req.params.userId;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const orders = await Order.find({ user: userId })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const totalOrders = await Order.countDocuments({ user: userId });
        const totalPages = Math.ceil(totalOrders / limit);

        res.status(200).json({
            status: 'success',
            message: 'User orders fetched successfully',
            data: {
                orders,
                pagination: {
                    currentPage: page,
                    totalPages,
                    totalOrders,
                    hasNextPage: page < totalPages,
                    hasPrevPage: page > 1
                }
            }
        });

    } catch (error) {
        console.error('Error fetching user orders:', error);
        res.status(500).json({
            status: 'error',
            message: 'Error fetching user orders',
            error: error.message
        });
    }
};

const updateOrderStatus = async (req, res) => {
    try {
        const { orderToken, newStatus } = req.body;

        // Find the order by orderToken and update the status
        const updatedOrder = await Order.findOneAndUpdate(
            { orderToken: orderToken },
            { status: newStatus },
            { new: true } 
        );

        if (!updatedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json({ message: "Order status updated successfully", updatedOrder });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to update order status", error });
    }
};


module.exports = { registerAdmin, loginAdmin, fetchOrders, fetchOrderById, fetchUserOrders, updateOrderStatus };