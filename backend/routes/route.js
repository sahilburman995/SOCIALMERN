import express from 'express';
import jwt from 'jsonwebtoken';

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


// Example of using the middleware for a protected route
router.get('/api/protected', verifyToken, (req, res) => {
  // Access granted, req.userId contains the user's ID
  console.log('Authorized user ID:', req.userId);
  res.json({ message: 'Protected route accessed successfully' });
});


router.get('/',(req,res)=>{
    try {
     
        res.send("hello From the Router!");
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
 
})
let friends = [];

  
router.get('/api/friends', (req, res) => {
  // Create an array to hold the dummy friends
  res.json(friends);
});
router.post('/api/friends', (req, res) => {
  const {  name } = req.body;

  // Validate the request body
  if ( !name) {
    return res.status(400).json({ error: 'ID and name are required.' });
  }

  // Check if the friend already exists
  

  // Add the new friend
  friends.push({  name });
  res.status(201).json({ message: 'Friend added successfully.' });
});


// Assuming you have a route setup like this in your Express app
router.get('/user/:id/posts', async (req, res) => {
  try {
    const userId = req.params.id;
    // Fetch posts from your database based on the userId
    const userPosts = await Post.find({ userId }); // Example assuming you have a Post model with userId field
    res.json(userPosts);
  } catch (error) {
    console.error('Error fetching user posts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
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
