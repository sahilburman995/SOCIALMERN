import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
//import dotenv from "dotenv";
import router from "./routes/route.js";
import User from './schema/user.js'
import multer from "multer";
import helmet from "helmet";
//import morgan from "morgan";
import path from "path";
 import { fileURLToPath } from "url";

// import authRoutes from "./routes/auth.js";
// import userRoutes from "./routes/users.js";
// import postRoutes from "./routes/posts.js";
 //import { register } from "./controller/auth.js";
// import { createPost } from "./controllers/posts.js";
// import { verifyToken } from "./middleware/auth.js";
// import User from "./models/User.js";
// import Post from "./models/Post.js";
// import { users, posts } from "./data/index.js";

/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
//app.use(morgan("common"));// Server is running on Port: 3000
//::1 - - [26/Jan/2024:05:36:20 +0000] "GET / HTTP/1.1" 200 5 moragn ke karan ye dikhtA hai
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* FILE STORAGE */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

/* ROUTES WITH FILES */
// app.post("/auth/register", upload.single("picture"), register);
// app.post("/posts", verifyToken, upload.single("picture"), createPost);

// // /* ROUTES */
// app.use("/auth", authRoutes);
// app.use("/users", userRoutes);
// app.use("/posts", postRoutes);

/* MONGOOSE SETUP */

app.use('/', router);
//  '/' krn se sare routes a jayenge e.g /about /connect etc



app.post('/api/userdetails',async(req,res)=>{
 
    const { username, email, password, occupation } = req.body;
    try {
        
        if (!username || !email || !password || !occupation) {
            return res.status(400).json({ error: 'All fields are required' });
          }
        // Create a new user instance
        const newUser = new User({
          username,
          email,
          password,
          occupation,
        });
    
        // Save the user to the database
        const savedUser = await newUser.save();
    
        console.log('User saved:', {
          username: savedUser.username,
          email: savedUser.email,
          occupation: savedUser.occupation,
        });
    
        res.status(200).json({ status: 'User saved successfully' });
      } catch (error) {
        console.error('Error saving user:');
        res.status(500).json({ error: 'Internal Server Error' });
      }
})

const PORT =  3000;
const murl="mongodb://localhost:27017";
mongoose
  .connect(murl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(` Server is running on Port: ${PORT}`));

    /* ADD DATA ONE TIME */
    // User.insertMany(users);
    // Post.insertMany(posts);
  })
  .catch((error) => console.log(`${error} did not connect`));