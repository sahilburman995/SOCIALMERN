import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from 'bcrypt'
//import dotenv from "dotenv";
import { Server } from "socket.io";
import post from './schema/post.js'
import { createServer } from "http";
import router from "./routes/route.js";
import User from './schema/user.js'
import multer from "multer"; 
import helmet from "helmet";
//zimport morgan from "morgan";
import fs from 'fs'

import path from "path";
import { fileURLToPath } from "url";
import jwt from 'jsonwebtoken';

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


///**********     MULTER SETUP    ************************************************************************************* */
app.use(express.urlencoded({extended:false}))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });


//****************************************************************************** */
app.post('/upload', upload.single('photo'), (req, res) => {
  // Access the uploaded file details via req.file
  console.log('Request body:', req.body);
  console.log('File uploaded:', req.file);

  // Handle the file as needed (e.g., save to a database, respond to the client, etc.)

  res.status(200).json({ message: 'Photo uploaded successfully' });
});


// Add a route to display the uploaded image on a GET request
app.get('/image', (req, res) => {
  const uploadPath = path.join(__dirname, 'uploads');

  // Read the contents of the 'uploads' directory
  fs.readdir(uploadPath, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      // Send the list of filenames as a response
      res.json({ images: files });
    }
  });
});

/* ROUTES WITH FILES */
// app.post("/auth/register", upload.single("picture"), register);
// app.post("/posts", verifyToken, upload.single("picture"), createPost);

// // /* ROUTES */
// app.use("/auth", authRoutes);
// app.use("/users", userRoutes);
// app.use("/posts", postRoutes);

/* MONGOOSE SETUP */
app.use('/',router)
app.use('/api/user', router);
//  '/' krn se sare routes a jayenge e.g /about /connect etc

app.get('/api/userdetails',async( req,res)=>{
  try {
    // Retrieve all users from the database
    const users = await User.find({}, { _id: 0, __v: 0 });

    res.json(users);
  } catch (error) {
    console.error('Error retrieving user details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }

})

const secretKey = 'sahilburman';
app.post('/api/userdetails',async(req,res)=>{
 
    const { username, email, password, occupation } = req.body;
    try {
        
        if (!username || !email || !password || !occupation) {
            return res.status(400).json({ error: 'All fields are required' });
          }
        // Create a new user instance
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
          username,
          email,
          password: hashedPassword,
          occupation,
        });
    
        // Save the user to the database
        const savedUser = await newUser.save();
      console.log(__dirname)
        console.log('User saved:', {
          username: savedUser.username,
          email: savedUser.email,
          password:savedUser.password,
          occupation: savedUser.occupation,
        });
        const token = jwt.sign({ userId: savedUser._id }, secretKey, { expiresIn: '1h' });
        res.status(200).json({
          status: 'User saved successfully okkkkk',
          user: {
            username: savedUser.username,
            email: savedUser.email,
            occupation: savedUser.occupation,
          },
          token: token,
        });
       
      } catch (error) {
        console.error('Error saving user:');
        res.status(500).json({ error: 'Internal Server Error' });
      }
})
//**************************************************************************************************************** */
app.post('/api/posts',upload.single('photos'), async(req,res)=>{

  try {
    const { title, content } = req.body;

    // Get the file path of the uploaded photo
    const photoPath = req.file.path;
 console.log(photoPath);
    const newPost = new post({
      title,
      content,
      photo: photoPath,
    });

    const savedPost = await newPost.save();
    console.log(title);
    console.log(content);
  
    res.status(201).json(savedPost);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})


app.get('/api/posts', async (req, res) => {
  try {
    // Fetch all posts from the database
    const posts = await post.find();

    // Send the fetched posts as a response
    res.status(200).json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


//********************************************************************************************** */
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://127.0.0.1:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(
  cors({
    origin: "http://127.0.0.1:5173",
    methods: ["GET", "POST"],
    credentials: true,
  })
);



// Define message schema and model
const messageSchema = new mongoose.Schema({
  room: { type: String, required: true },
  message: { type: String, required: true },
});

const Message = mongoose.model('Message', messageSchema);

// Socket.IO event handlers
io.on("connection", (socket) => {
  console.log("connected user");
  console.log("id", socket.id);
  socket.broadcast.emit("welcome", `welcome to the server${socket.id}`);

  socket.on("send", (sa) => {
    console.log(sa);
  });

  // Handler for receiving messages
  socket.on("message", ({ room, message }) => {
    console.log({ room, message });

    // Save the message to MongoDB
    const newMessage = new Message({ room, message });
    newMessage.save()
      .then(savedMessage => {
        console.log('Message saved to MongoDB:', savedMessage.message);
        // Emit the received message to all clients in the room
        io.to(room).emit("recive", message);
      })
      .catch(error => {
        console.error('Error saving message to MongoDB:', error);
      });
  });

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
  });
});

server.listen(5000, () => {
  console.log(`Server is running on port ${5000}`);
});

// MongoDB connection
const PORT =  3000;
const murl="mongodb://localhost:27017/test";
mongoose
  .connect(murl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(` Server is running on Port: ${PORT} and  Mongodb is connected`));

    /* ADD DATA ONE TIME */
    // User.insertMany(users);
    // Post.insertMany(posts);
  })
  .catch((error) => console.log(`${error} did not connect`));