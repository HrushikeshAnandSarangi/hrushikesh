import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { User } from './models';

let isConnected = false;

export const connectDB = async () => {
  if (isConnected) return;

  try {
    const uri = process.env.DATABASE_URI;
    if (!uri) {
      throw new Error('DATABASE_URI environment variable is missing.');
    }
    await mongoose.connect(uri);
    isConnected = true;
    console.log('Connected to MongoDB');

    // Seed default admin user
    const adminExists = await User.findOne({ username: 'hrushi' });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('123456', 10);
      await User.create({
        username: 'hrushi',
        password: hashedPassword,
      });
      console.log('Default admin user seeded.');
    }
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
  }
};
