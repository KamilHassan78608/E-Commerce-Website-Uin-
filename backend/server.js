import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import ConnectDB from './config/mongoDB.js';
import router from './routes/authRoutes.js';
import uploadRoutes from './routes/uploadRoute.js';
import orderRoutes from './routes/orderRoutes.js';
import userRoutes from './routes/userRouter.js';
import walletRoutes from './routes/walletRoutes.js';
import cartRoutes from './routes/cartRoutes.js';

// App Configuration
const app = express();
dotenv.config();

// App Middle Ware
app.use(cors({
    origin : 'http://localhost:5173'
}));
app.use(express.json());


// Connecting to database Mongo DB
ConnectDB();

// Routes
app.use('/api/auth', router);
app.use('/api/upload', uploadRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/user', userRoutes);
app.use('/api/wallet', walletRoutes);
app.use('/api/cart', cartRoutes);

// API EndPoints
app.get('/', (req, res) => {
    res.send("Welcome to Express");
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`The Server is listening on http://localhost:${PORT}`);
});
