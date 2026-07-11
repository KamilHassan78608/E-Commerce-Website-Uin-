import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Product from './models/ProductModel.js';

// Setup __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Product data matching Products.js
const productsData = [
    {
        name: "Denim Jacket for Men",
        description: "Classic blue denim jacket with a rugged look, perfect for layering in all seasons.",
        price: 120,
        imageFile: "pic1.png",
        category: "Men",
        subCategory: "Outerwear",
        themes: ["AVANT-GARDE"],
        sizes: ["M", "L", "XL"],
        bestseller: true
    },
    {
        name: "White Crew Neck T-Shirt",
        description: "Soft cotton t-shirt with a clean minimalist design for everyday comfort.",
        price: 40,
        imageFile: "pic2.png",
        category: "Men",
        subCategory: "Topwear",
        themes: ["MINIMALIST"],
        sizes: ["S", "M", "L"],
        bestseller: false
    },
    {
        name: "Black Women's Dress",
        description: "Elegant black dress designed for evening wear and special occasions.",
        price: 90,
        imageFile: "pic3.png",
        category: "Women",
        subCategory: "Dresses",
        themes: ["ROMANTIC"],
        sizes: ["S", "M", "L"],
        bestseller: true
    },
    {
        name: "Men's Jeans",
        description: "Comfortable slim-fit jeans made from durable denim fabric.",
        price: 70,
        imageFile: "pic4.png",
        category: "Men",
        subCategory: "Bottomwear",
        themes: ["MINIMALIST"],
        sizes: ["M", "L", "XL"],
        bestseller: false
    },
    {
        name: "Kids' Puffer Jacket",
        description: "Warm and lightweight puffer jacket designed to keep kids cozy in winter.",
        price: 60,
        imageFile: "pic5.png",
        category: "Kids",
        subCategory: "Outerwear",
        themes: ["BOHEMIAN"],
        sizes: ["XS", "S", "M"],
        bestseller: true
    },
    {
        name: "Kids' Yellow Raincoat",
        description: "Bright yellow raincoat with waterproof material, perfect for rainy days.",
        price: 50,
        imageFile: "pic6.png",
        category: "Kids",
        subCategory: "Outerwear",
        themes: ["BOHEMIAN"],
        sizes: ["XS", "S", "M"],
        bestseller: false
    },
    {
        name: "White Summer Dress",
        description: "Lightweight and airy summer dress ideal for warm sunny days.",
        price: 80,
        imageFile: "pic7.png",
        category: "Women",
        subCategory: "Dresses",
        themes: ["ROMANTIC", "BOHEMIAN"],
        sizes: ["S", "M", "L"],
        bestseller: true
    },
    {
        name: "Folded Sweaters Pack",
        description: "Pack of cozy sweaters designed for comfort and layering during colder months.",
        price: 100,
        imageFile: "pic8.png",
        category: "Unisex",
        subCategory: "Topwear",
        themes: ["MINIMALIST"],
        sizes: ["S", "M", "L", "XL"],
        bestseller: false
    },
    {
        name: "Kids' Denim Overalls",
        description: "Durable and stylish denim overalls for active kids.",
        price: 55,
        imageFile: "pic9.png",
        category: "Kids",
        subCategory: "Bottomwear",
        themes: ["BOHEMIAN"],
        sizes: ["XS", "S", "M"],
        bestseller: true
    },
    {
        name: "Men's Formal Shirt",
        description: "Crisp formal shirt suitable for office wear and formal occasions.",
        price: 65,
        imageFile: "pic10.png",
        category: "Men",
        subCategory: "Topwear",
        themes: ["MINIMALIST"],
        sizes: ["M", "L", "XL"],
        bestseller: false
    },
    {
        name: "Gray Cardigan",
        description: "Soft knit cardigan with a relaxed fit, perfect for casual layering.",
        price: 75,
        imageFile: "pic11.png",
        category: "Men",
        subCategory: "Outerwear",
        themes: ["MINIMALIST"],
        sizes: ["M", "L", "XL"],
        bestseller: false
    },
    {
        name: "Men's Checked Shirt",
        description: "Stylish checked shirt offering a casual yet trendy look.",
        price: 60,
        imageFile: "pic12.png",
        category: "Men",
        subCategory: "Topwear",
        themes: ["BOHEMIAN"],
        sizes: ["M", "L", "XL"],
        bestseller: true
    },
    {
        name: "Men's White Dress Shirt",
        description: "Premium white dress shirt for a sharp and professional appearance.",
        price: 70,
        imageFile: "pic13.png",
        category: "Men",
        subCategory: "Topwear",
        themes: ["MINIMALIST"],
        sizes: ["M", "L", "XL"],
        bestseller: true
    },
    {
        name: "Men's Light Blue Shirt",
        description: "Light blue shirt with a fresh and modern style for daily wear.",
        price: 65,
        imageFile: "pic14.png",
        category: "Men",
        subCategory: "Topwear",
        themes: ["MINIMALIST"],
        sizes: ["M", "L", "XL"],
        bestseller: false
    },
    {
        name: "Men's Navy Pants",
        description: "Smart navy pants with a tailored fit for both casual and formal settings.",
        price: 80,
        imageFile: "pic15.png",
        category: "Men",
        subCategory: "Bottomwear",
        themes: ["AVANT-GARDE"],
        sizes: ["M", "L", "XL"],
        bestseller: true
    }
];

// Path to frontend assets
const assetsDir = path.resolve(__dirname, '../frontend/src/assets');

const seedProducts = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('✅ Connected to MongoDB');

        // Clear existing products
        await Product.deleteMany({});
        console.log('🗑️  Cleared existing products');

        const seededProducts = [];

        for (let i = 0; i < productsData.length; i++) {
            const productData = productsData[i];
            const imagePath = path.join(assetsDir, productData.imageFile);

            console.log(`📤 Uploading image ${i + 1}/15: ${productData.imageFile}...`);

            // Check if image file exists
            if (!fs.existsSync(imagePath)) {
                console.error(`❌ Image file not found: ${imagePath}`);
                continue;
            }

            // Upload to Cloudinary
            const uploadResult = await cloudinary.uploader.upload(imagePath, {
                folder: 'e-commerce-store/products',
                width: 500,
                height: 500,
                crop: 'fill'
            });

            // Create product in MongoDB
            const product = new Product({
                name: productData.name,
                description: productData.description,
                price: productData.price,
                image: uploadResult.secure_url,
                category: productData.category,
                subCategory: productData.subCategory,
                themes: productData.themes,
                sizes: productData.sizes,
                bestseller: productData.bestseller
            });

            await product.save();
            seededProducts.push(product);

            console.log(`✅ Product ${i + 1}/15 seeded: ${productData.name}`);
        }

        console.log(`\n🎉 Successfully seeded ${seededProducts.length} products!`);
        console.log('\nSeeded product IDs:');
        seededProducts.forEach(p => {
            console.log(`  - ${p.name}: ${p._id}`);
        });

    } catch (error) {
        console.error('❌ Seeding error:', error);
    } finally {
        await mongoose.connection.close();
        console.log('\n📦 MongoDB connection closed');
        process.exit(0);
    }
};

seedProducts();
