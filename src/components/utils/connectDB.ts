import mongoose from 'mongoose';

async function connectDB() {
  if (mongoose.connections[0].readyState) return;
  mongoose.set('strictQuery', false);
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI is not defined in the environment variables');
  }

  await mongoose.connect(uri);
  ('Connected to DB');
}

export default connectDB;
