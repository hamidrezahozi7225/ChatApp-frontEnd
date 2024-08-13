import mongoose, { Schema } from 'mongoose';

const ChatSchema = new Schema(
  {
    users: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'user',
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
    lastMessage: {
      type: String,
      default: '',
    },
    readed: {
      type: [Object],
    },
  },
  { timestamps: true }
);

const ChatModel = mongoose.models.chat || mongoose.model('chat', ChatSchema);
export default ChatModel;
