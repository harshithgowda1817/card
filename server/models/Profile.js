import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  bio: { type: String, default: '' },
  avatar: { type: String, default: '' },
}, { timestamps: true });

export default mongoose.model('Profile', profileSchema);
