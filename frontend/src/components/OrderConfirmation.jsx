/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { 
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Paper
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const OrderConfirmation = ({ orderDetails, onClose }) => {
  const [timeLeft, setTimeLeft] = useState(orderDetails.estimatedTime * 60);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
        zIndex: 1300
      }}
    >
      <Card sx={{ 
        width: '100%', 
        maxWidth: 450,
        borderRadius: 3,
        position: 'relative',
        maxHeight: '90vh',
        overflow: 'auto'
      }}>
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: 'gray'
          }}
        >
          <CloseIcon />
        </IconButton>

        <Box sx={{ 
          bgcolor: '#f0fdf4',
          p: 3,
          textAlign: 'center',
          borderBottom: '1px solid #e5e7eb'
        }}>
          <Box
            sx={{
              width: 64,
              height: 64,
              bgcolor: '#dcfce7',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px'
            }}
          >
            <CheckCircleIcon sx={{ fontSize: 32, color: '#16a34a' }} />
          </Box>
          <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#15803d', mb: 1 }}>
            Order Confirmed!
          </Typography>
          <Typography sx={{ color: '#16a34a', fontWeight: 500 }}>
            Order Token: {orderDetails.orderToken}
          </Typography>
        </Box>

        <CardContent sx={{ p: 3 }}>
          <Paper
            elevation={0}
            sx={{
              bgcolor: '#fff8f1',
              p: 2,
              borderRadius: 2,
              mb: 3,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <RestaurantIcon sx={{ color: '#ea580c' }} />
              <Typography sx={{ fontWeight: 500 }}>
                Preparing Your Order
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <AccessTimeIcon sx={{ color: '#ea580c' }} />
              <Typography sx={{ fontFamily: 'monospace', fontSize: '1.1rem' }}>
                {formatTime(timeLeft)}
              </Typography>
            </Box>
          </Paper>

          <Typography variant="h6" sx={{ mb: 2, fontWeight: 500 }}>
            Order Summary
          </Typography>

          <Box sx={{ maxHeight: 300, overflow: 'auto' }}>
            {orderDetails.items.map((item, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  py: 1.5,
                  borderBottom: '1px solid #e5e7eb'
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <img
                    src={item.image || "/api/placeholder/48/48"}
                    alt={item.name}
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 8,
                      objectFit: 'cover'
                    }}
                  />
                  <Box>
                    <Typography sx={{ fontWeight: 500 }}>{item.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Qty: {item.quantity}
                    </Typography>
                  </Box>
                </Box>
                <Typography sx={{ fontWeight: 500 }}>
                  ₹{item.totalPrice}
                </Typography>
              </Box>
            ))}
          </Box>

          <Box sx={{ pt: 2, mt: 2, borderTop: '1px solid #e5e7eb' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6">Total Amount</Typography>
              <Typography variant="h6">
                ₹{orderDetails.totalAmount}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default OrderConfirmation;