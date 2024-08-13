import { Schema, models, model } from 'mongoose';

const UserSchema = new Schema({
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  userName: {
    type: String,
    minLength: 3,
  },
  imageUrl: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
});

export const UserModel = models.user || model('user', UserSchema);
