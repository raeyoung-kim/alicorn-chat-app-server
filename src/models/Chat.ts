import mongoose from 'mongoose';

const { Schema } = mongoose;

const chatSchema = new Schema({
  chatId: {
    type: String,
    required: true,
  },
  partnerId: {
    type: String,
    required: true,
  },
  partnerName: {
    type: String,
    required: true,
  },
  senderId: {
    type: String,
    required: true,
  },
  senderName: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  timestamps: {
    type: Date,
    required: true,
  },
});

export default mongoose.model('Chat', chatSchema);
