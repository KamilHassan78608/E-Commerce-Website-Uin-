import express from 'express';
import Order from '../models/Order.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/create', protect, async(req, res) => {
    try {
        const order = new Order({
            userId : req.user.userId,
            ...req.body
        });
        await order.save();
        res.status(200).json({
            success : true,
            messege : 'Order Created Successfully'
        });
    } catch (error) {
        res.status(500).json({
            success : false,
            messege : error.messege
        });
    }
});

router.get('/my-orders', protect, async (req, res) => {
    const order = await Order.find({
        userId : req.user.userId
    });
    res.json(order);
});

export default router;
