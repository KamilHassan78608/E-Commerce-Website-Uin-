import express from 'express';
import Card from '../models/Card.js';
import Wallet from '../models/Wallet.js';
import { protect } from '../middleware/auth.js';
import { body, validationResult } from 'express-validator';

const router = express.Router();

// ==================== CARD ROUTES ====================

// Add a new card
// POST /api/wallet/card/add
router.post('/card/add', protect, [
    body('cardName').notEmpty().withMessage('Card name is required'),
    body('cardNumber').isLength({ min: 16, max: 16 }).withMessage('Card number must be 16 digits'),
    body('expiryMonth').isInt({ min: 1, max: 12 }).withMessage('Invalid expiry month'),
    body('expiryYear').isInt({ min: new Date().getFullYear() }).withMessage('Card has expired'),
    body('cvv').isLength({ min: 3, max: 4 }).withMessage('CVV must be 3-4 digits')
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        const { cardName, cardNumber, expiryMonth, expiryYear, cvv, isDefault } = req.body;
        const userId = req.user.userId;

        // If setting as default, remove default from other cards
        if (isDefault) {
            await Card.updateMany(
                { userId, isDefault: true },
                { isDefault: false }
            );
        }

        const card = new Card({
            userId,
            cardName,
            cardNumber: cardNumber.slice(-4).padStart(16, '*'), // Store only last 4 digits
            expiryMonth,
            expiryYear,
            cvv,
            isDefault: isDefault || false
        });

        await card.save();

        res.status(201).json({
            success: true,
            message: 'Card added successfully',
            card
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Get all cards for user
// GET /api/wallet/cards
router.get('/cards', protect, async (req, res) => {
    try {
        const cards = await Card.find({ userId: req.user.userId });
        res.json({
            success: true,
            cards
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Set default card
// PUT /api/wallet/card/:cardId/default
router.put('/card/:cardId/default', protect, async (req, res) => {
    try {
        const { cardId } = req.params;
        const userId = req.user.userId;

        // Remove default from all cards
        await Card.updateMany(
            { userId, isDefault: true },
            { isDefault: false }
        );

        // Set new default
        const card = await Card.findByIdAndUpdate(
            { _id: cardId, userId },
            { isDefault: true },
            { new: true }
        );

        if (!card) {
            return res.status(404).json({
                success: false,
                message: 'Card not found'
            });
        }

        res.json({
            success: true,
            message: 'Card set as default',
            card
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Delete a card
// DELETE /api/wallet/card/:cardId
router.delete('/card/:cardId', protect, async (req, res) => {
    try {
        const { cardId } = req.params;
        const userId = req.user.userId;

        const card = await Card.findByIdAndDelete(
            { _id: cardId, userId }
        );

        if (!card) {
            return res.status(404).json({
                success: false,
                message: 'Card not found'
            });
        }

        res.json({
            success: true,
            message: 'Card deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// ==================== WALLET ROUTES ====================

// Get wallet info
// GET /api/wallet/info
router.get('/info', protect, async (req, res) => {
    try {
        const userId = req.user.userId;
        let wallet = await Wallet.findOne({ userId });

        if (!wallet) {
            wallet = new Wallet({ userId });
            await wallet.save();
        }

        res.json({
            success: true,
            wallet
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Add balance/credits
// POST /api/wallet/add-balance
router.post('/add-balance', protect, [
    body('amount').isFloat({ min: 0.01 }).withMessage('Amount must be greater than 0'),
    body('type').isIn(['credit', 'debit', 'refund', 'bonus']).withMessage('Invalid transaction type'),
    body('description').optional().isString()
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        const { amount, type, description, orderId } = req.body;
        const userId = req.user.userId;

        let wallet = await Wallet.findOne({ userId });
        if (!wallet) {
            wallet = new Wallet({ userId });
        }

        // Add transaction
        const transaction = {
            type,
            amount,
            description: description || '',
            orderId: orderId || null
        };

        wallet.transactions.push(transaction);

        // Update balance based on type
        if (type === 'credit' || type === 'bonus') {
            wallet.balance += amount;
            wallet.totalEarned += amount;
            if (type === 'bonus') {
                wallet.credits += amount;
            }
        } else if (type === 'debit') {
            if (wallet.balance < amount) {
                return res.status(400).json({
                    success: false,
                    message: 'Insufficient balance'
                });
            }
            wallet.balance -= amount;
            wallet.totalSpent += amount;
        } else if (type === 'refund') {
            wallet.balance += amount;
            wallet.totalEarned += amount;
        }

        await wallet.save();

        res.json({
            success: true,
            message: `Balance updated successfully`,
            wallet
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Get transaction history
// GET /api/wallet/transactions
router.get('/transactions', protect, async (req, res) => {
    try {
        const userId = req.user.userId;
        const wallet = await Wallet.findOne({ userId }).populate('transactions.orderId');

        if (!wallet) {
            return res.json({
                success: true,
                transactions: []
            });
        }

        // Sort transactions by date (newest first)
        const transactions = wallet.transactions.sort((a, b) => b.date - a.date);

        res.json({
            success: true,
            transactions
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Use wallet balance for payment
// POST /api/wallet/use-balance
router.post('/use-balance', protect, [
    body('amount').isFloat({ min: 0.01 }).withMessage('Amount must be greater than 0'),
    body('orderId').notEmpty().withMessage('Order ID is required')
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        const { amount, orderId, description } = req.body;
        const userId = req.user.userId;

        const wallet = await Wallet.findOne({ userId });

        if (!wallet) {
            return res.status(404).json({
                success: false,
                message: 'Wallet not found'
            });
        }

        if (wallet.balance < amount) {
            return res.status(400).json({
                success: false,
                message: 'Insufficient wallet balance'
            });
        }

        // Deduct from wallet
        wallet.balance -= amount;
        wallet.totalSpent += amount;
        wallet.transactions.push({
            type: 'debit',
            amount,
            description: description || 'Order payment',
            orderId
        });

        await wallet.save();

        res.json({
            success: true,
            message: 'Payment processed from wallet',
            remainingBalance: wallet.balance,
            wallet
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

export default router;
