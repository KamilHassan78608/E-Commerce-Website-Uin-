import express from 'express';
import { protect, adminOnly } from '../middleware/auth.js';
import upload from '../middleware/upload.js';
import {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} from '../controllers/productController.js';

const router = express.Router();

// Public Routes
router.get('/', getAllProducts);
router.get('/:id', getProductById);

// Admin Only Routes (Protected + Admin)
router.post('/', upload.single('image'), createProduct);
router.put('/:id', upload.single('image'), updateProduct);
router.delete('/:id', deleteProduct);

export default router;
