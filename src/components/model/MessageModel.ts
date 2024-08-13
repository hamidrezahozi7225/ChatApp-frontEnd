import mongoose, { Schema } from 'mongoose';

const MessageSchema = new Schema(
  {
    chatId: {
      type: Schema.Types.ObjectId,
      ref: 'chat',
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    text: {
      type: String,
    },
    socketMessageID: {
      type: Number,
      default: ' ',
    },
  },
  { timestamps: true }
);

const MessageModel =
  mongoose.models.message || mongoose.model('message', MessageSchema);
export default MessageModel;
