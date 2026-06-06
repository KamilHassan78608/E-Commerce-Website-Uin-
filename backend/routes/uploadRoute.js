import express from 'express';
import { protect } from '../middleware/auth.js';
import upload from '../middleware/upload.js';
import cloudinary from '../config/cloudinary.js';

const router = express.Router();

// Creating Route for a single Image
router.post('/image', protect, upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success : false,
                messege : "No file Uploaded"
            });
        }

        // convert file to base64
        const fileStr = req.file.buffer.toString('base64');
        const fileData = `data:${req.file.mimetype};base64,${fileStr}`;

        // Upload file into claudinary 
        const result = await cloudinary.uploader.upload(fileData, {
            folder : 'e-commerce-store' ,
            width : 500,
            height : 500,
            crop : 'fill'
        });

        res.status(200).json({
            success : true,
            url: result.secure_url,
            public_id: result.public_id
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});


// Route - To upload multiple images 
router.post('/images', protect, upload.array('images', 5), async (req, res) => {
    try {
        if (!req.files || req.files.length === 0 ) {
            return res.status(400).json({
                success : false,
                message : "No file Uploaded"
            });
        }

        const uploadedImage = [];

        // Upload each one of the files
        for (const file of req.files) {
            const fileStr = file.buffer.toString('base64');
            const fileData = `data:${file.mimetype};base64,${fileStr}`;

            const result = await cloudinary.uploader.upload(fileData ,{
                folder : 'e-commerce-store/multiple',
                width : 500,
                height : 500,
                crop : 'fill'
            });

            uploadedImage.push({
                url : result.secure_url,
                public_id : result.public_id,
                originalName: file.originalname
            });
        }

        res.status(200).json({
            success : true, 
            count :uploadedImage.length,
            images: uploadedImage
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});


export default router;