import express from 'express';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import path from 'path';
const router = express.Router();

// Secret key for JWT
const secretKey = 'sahilburman'; // Replace with a secure secret key in production

// Middleware to verify JWT before accessing protected routes
export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized hai tu'  });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    req.userId = decoded.userId;
    next();
  });
};
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads'); // Save files to the 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });


// Example of using the middleware for a protected route
router.get('/api/protected', verifyToken, (req, res) => {
  // Access granted, req.userId contains the user's ID
  console.log('Authorized user ID:', req.userId);
  res.json({ message: 'Protected route accessed successfully' });
});


router.get('/',(req,res)=>{
    try {
      console.log(__dirname);
        res.send("hello From the Router!");
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
 
})


// Endpoint for handling file upload
router.post('/api/uploadPhoto', upload.single('photo'), (req, res) => {
  // Access the uploaded file details via req.file
  console.log('File uploaded:', req.file);

  // Handle the file as needed (e.g., save to a database, respond to the client, etc.)

  res.status(200).json({ message: 'Photo uploaded successfully' });
});
  

router.get('/user/:id', (req, res) => {
  console.log("user id is",req.params.id)
  res.send('user is!');
});
router.get('/connect', (req, res) => {

  try{
  console.log(req.query);
    res.send(req.query);    //agar res.send( )  do bar likhenge to error ayega
    //res.send('About page from the connnn!');
  }
    catch (error) {
      console.error('Error fetching messages:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
  });
  
export default router ;
