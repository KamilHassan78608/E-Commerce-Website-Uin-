import Product from '../models/ProductModel.js';
import cloudinary from '../config/cloudinary.js';

// Get all products - Public
export const getAllProducts = async (req, res) => {
    try {
        const { category, subCategory, search, bestseller, theme } = req.query;

        // Build filter object
        const filter = {};

        if (category) {
            filter.category = category;
        }

        if (subCategory) {
            filter.subCategory = subCategory;
        }

        if (bestseller === 'true') {
            filter.bestseller = true;
        }

        if (theme) {
            filter.themes = { $in: [theme] };
        }

        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { category: { $regex: search, $options: 'i' } },
                { subCategory: { $regex: search, $options: 'i' } }
            ];
        }

        const products = await Product.find(filter).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: products.length,
            products
        });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get single product by ID - Public
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        res.status(200).json({
            success: true,
            product
        });
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Create a new product - Admin Only
export const createProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, themes, sizes, bestseller } = req.body;

        // Validate required fields
        if (!name || !description || !price || !category || !subCategory) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields: name, description, price, category, subCategory'
            });
        }

        // Check if image file was uploaded
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'Please upload a product image'
            });
        }

        // Upload image to Cloudinary
        const fileStr = req.file.buffer.toString('base64');
        const fileData = `data:${req.file.mimetype};base64,${fileStr}`;

        const uploadResult = await cloudinary.uploader.upload(fileData, {
            folder: 'e-commerce-store/products',
            width: 500,
            height: 500,
            crop: 'fill'
        });

        // Parse themes and sizes if they come as JSON strings
        let parsedThemes = themes;
        let parsedSizes = sizes;

        if (typeof themes === 'string') {
            try { parsedThemes = JSON.parse(themes); } catch { parsedThemes = [themes]; }
        }
        if (typeof sizes === 'string') {
            try { parsedSizes = JSON.parse(sizes); } catch { parsedSizes = [sizes]; }
        }

        const product = new Product({
            name,
            description,
            price: Number(price),
            image: uploadResult.secure_url,
            category,
            subCategory,
            themes: parsedThemes || [],
            sizes: parsedSizes || [],
            bestseller: bestseller === 'true' || bestseller === true
        });

        await product.save();

        res.status(201).json({
            success: true,
            message: 'Product created successfully',
            product
        });
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Update a product - Admin Only
export const updateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        const { name, description, price, category, subCategory, themes, sizes, bestseller } = req.body;

        // Update fields if provided
        if (name) product.name = name;
        if (description) product.description = description;
        if (price) product.price = Number(price);
        if (category) product.category = category;
        if (subCategory) product.subCategory = subCategory;

        if (themes) {
            if (typeof themes === 'string') {
                try { product.themes = JSON.parse(themes); } catch { product.themes = [themes]; }
            } else {
                product.themes = themes;
            }
        }

        if (sizes) {
            if (typeof sizes === 'string') {
                try { product.sizes = JSON.parse(sizes); } catch { product.sizes = [sizes]; }
            } else {
                product.sizes = sizes;
            }
        }

        if (bestseller !== undefined) {
            product.bestseller = bestseller === 'true' || bestseller === true;
        }

        // If a new image is uploaded, replace the old one
        if (req.file) {
            // Delete old image from Cloudinary if it exists
            if (product.image) {
                try {
                    // Extract public_id from URL
                    const urlParts = product.image.split('/');
                    const folderAndFile = urlParts.slice(-2).join('/');
                    const public_id = folderAndFile.split('.')[0];
                    await cloudinary.uploader.destroy(`e-commerce-store/products/${public_id.split('/').pop()}`);
                } catch (deleteError) {
                    console.error('Error deleting old image:', deleteError);
                }
            }

            // Upload new image
            const fileStr = req.file.buffer.toString('base64');
            const fileData = `data:${req.file.mimetype};base64,${fileStr}`;

            const uploadResult = await cloudinary.uploader.upload(fileData, {
                folder: 'e-commerce-store/products',
                width: 500,
                height: 500,
                crop: 'fill'
            });

            product.image = uploadResult.secure_url;
        }

        await product.save();

        res.status(200).json({
            success: true,
            message: 'Product updated successfully',
            product
        });
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Delete a product - Admin Only
export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        // Delete image from Cloudinary
        if (product.image) {
            try {
                const urlParts = product.image.split('/');
                const folderAndFile = urlParts.slice(-2).join('/');
                const public_id = folderAndFile.split('.')[0];
                await cloudinary.uploader.destroy(`e-commerce-store/products/${public_id.split('/').pop()}`);
            } catch (deleteError) {
                console.error('Error deleting image from Cloudinary:', deleteError);
            }
        }

        await Product.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: 'Product deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
