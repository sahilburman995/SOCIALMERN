import mongoose from "mongoose";

// Define the user schema
const userSchema = new mongoose.Schema({
  userId: {
    type: String,
   
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
});

// Create a User model using the schema
const User = mongoose.model('User', userSchema);

export default User;