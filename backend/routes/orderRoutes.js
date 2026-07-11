// routes/orderRoutes.js
import express from 'express';
import Order from '../models/Order.js';
// Remove the protect import
// import { protect } from '../middleware/auth.js';

const router = express.Router();

// Create order - No authentication required
router.post('/create', async (req, res) => {
    try {
        // Get userId from request body instead of req.user
        const { userId, ...orderData } = req.body;
        
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: 'User ID is required'
            });
        }

        const order = new Order({
            userId: userId,
            ...orderData
        });
        
        await order.save();
        
        res.status(201).json({
            success: true,
            message: 'Order Created Successfully',
            data: order
        });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to create order'
        });
    }
});


// Get all orders - No authentication required (returns all orders)
router.get('/my-orders', async (req, res) => {
    try {
        // Get userId from query parameter
        const { userId } = req.query;
        
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: 'User ID is required'
            });
        }

        const orders = await Order.find({ userId: userId })
            .sort({ createdAt: -1 });
        
        res.status(200).json({
            success: true,
            count: orders.length,
            data: orders
        });
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to fetch orders'
        });
    }
});

// Get single order by ID - No authentication
router.get('/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        
        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }
        
        res.status(200).json({
            success: true,
            data: order
        });
    } catch (error) {
        console.error('Error fetching order:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to fetch order'
        });
    }
});

// Cancel order - No authentication
router.put('/:id/cancel', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        
        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }
        
        if (order.status === 'delivered' || order.status === 'cancelled') {
            return res.status(400).json({
                success: false,
                message: `Order cannot be cancelled because it is ${order.status}`
            });
        }
        
        order.status = 'cancelled';
        await order.save();
        
        res.status(200).json({
            success: true,
            message: 'Order cancelled successfully',
            data: order
        });
    } catch (error) {
        console.error('Error cancelling order:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to cancel order'
        });
    }
});

export default router;