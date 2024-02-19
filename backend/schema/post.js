import mongoose from 'mongoose';

const {  model } = mongoose;
mongoose.connect('mongodb://localhost:27017/test');
const post =  new mongoose.Schema({

  userId: {
    type: String,
    
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
 
  photo: {
    type: String, // Store the file path or URL to the photo
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Post = mongoose.model('Post', post);

export default Post;
