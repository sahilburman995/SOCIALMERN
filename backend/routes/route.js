// routes.mjs (Note the .mjs file extension for ESM)
import express from 'express';

const router = express.Router();

router.get('/',(req,res)=>{
    try {
     
        res.send("hello From the Router!");
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    
})

router.get('/about', (req, res) => {
  res.send('About page from the router!');
});
router.get('/connect', (req, res) => {
    res.send('About page from the connnn!');
  });
  
export default router;
