const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const Admin = require('../models/adminModel');

const protect = async (req, res, next) => {
    try {
        const authHeader = req.header('Authorization');
        if (!authHeader) {
            return res.status(401).json({
                error: 'Please authenticate',
                details: 'No authorization header found'
            });
        }

        if (!authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                error: 'Please authenticate',
                details: 'Invalid token format. Use: Bearer <token>'
            });
        }

        const token = authHeader.replace('Bearer ', '');

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        const user = await User.findOne({ 
            _id: decoded.id, 
            'tokens.token': token 
        });

        if (!user) {
            return res.status(401).json({
                error: 'Please authenticate',
                details: 'User not found or token invalid'
            });
        }

        if (decoded.exp && decoded.exp * 1000 < Date.now()) {
            return res.status(401).json({
                error: 'Please authenticate',
                details: 'Token has expired'
            });
        }

        req.token = token;
        req.user = user;
        next();

    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                error: 'Please authenticate',
                details: 'Invalid token'
            });
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                error: 'Please authenticate',
                details: 'Token has expired'
            });
        }

        res.status(401).json({
            error: 'Please authenticate',
            details: error.message
        });
    }
};

const protectAdmin = async (req, res, next) => {
    try {
        const authHeader = req.header('Authorization');
        if (!authHeader) {
            return res.status(401).json({
                error: 'Please authenticate',
                details: 'No authorization header found'
            });
        }

        if (!authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                error: 'Please authenticate',
                details: 'Invalid token format. Use: Bearer <token>'
            });
        }

        const token = authHeader.replace('Bearer ', '');

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        const user = await Admin.findOne({ 
            _id: decoded.id, 
            'tokens.token': token 
        });

        if (!user) {
            return res.status(401).json({
                error: 'Please authenticate',
                details: 'User not found or token invalid'
            });
        }

        if (decoded.exp && decoded.exp * 1000 < Date.now()) {
            return res.status(401).json({
                error: 'Please authenticate',
                details: 'Token has expired'
            });
        }

        req.token = token;
        req.user = user;
        next();

    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                error: 'Please authenticate',
                details: 'Invalid token'
            });
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                error: 'Please authenticate',
                details: 'Token has expired'
            });
        }

        res.status(401).json({
            error: 'Please authenticate',
            details: error.message
        });
    }
};
module.exports = { protect, protectAdmin };