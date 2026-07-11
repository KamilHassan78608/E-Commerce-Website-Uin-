import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

dotenv.config();

async function run() {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected to DB");
        
        const User = mongoose.model('User', new mongoose.Schema({
            email: String,
            password: String,
            role: String
        }));
        
        const hashedPassword = await bcrypt.hash('123456', 10);
        
        const result = await User.updateOne(
            { email: 'kamilhassan@email.com' },
            { $set: { password: hashedPassword, role: 'admin' } }
        );
        
        console.log("Update result:", result);
        
    } catch (err) {
        console.error(err);
    } finally {
        await mongoose.connection.close();
        process.exit(0);
    }
}

run();
