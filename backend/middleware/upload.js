import multer from 'multer';
import path from 'path';

// Files will be stored temporary in memeory
const storage = multer.memoryStorage();

// File Filter - Allow only images
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = allowedTypes.test(file.mimetype);

    if (mimeType && extname) {
        return cb (null, true);
    } else {
        cb(new Error("Only Images are Allowed"));
    };
};

const upload = multer({
    storage : storage,
    limits : { fileSize: 10 *  1024 * 1024 },
    fileFilter : fileFilter
});

export default upload;
