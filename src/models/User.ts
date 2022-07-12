import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
  userId: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: String,
});

export default mongoose.model('User', userSchema);
