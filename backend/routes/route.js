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
