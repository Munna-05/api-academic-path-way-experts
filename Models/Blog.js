import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description:{
    type:String,
    required:true
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  image: {type:String}, // Array of image URLs associated with the blog post
  
},{timestamps:true});

const Blog = mongoose.model('Blog', BlogSchema);

export default Blog;
