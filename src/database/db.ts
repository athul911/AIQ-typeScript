import mongoose from 'mongoose';

const mongoURI = process.env.MONGO_URL || 'mongodb://localhost:27017/mydatabase';
const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

export default connectDB;
