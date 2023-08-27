const express=require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const userControllers=require('../controllers/userControllers');
const jwt=require('jsonwebtoken');

// Middleware to verify JWT token
function verifyToken(req, res, next) {
    
    const authHeader = req.headers.authorization;
  
    if (!authHeader) {
      return res.status(401).json({ message: 'Token not provided' });
    }
  
    const token = authHeader.split(' ')[1];

    // console.log(token);
  
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Token invalid' });
      }
    //   console.log(decoded);
      req.id = decoded.user._id;
      console.log(req.id,'Req');
      next();
    });
  }

router.get('/', (req, res) => {
    console.log("Hello we are on home page");
    res.json(202);
});

router.post('/login', userControllers.Login);
router.post('/signup', userControllers.Signup);
router.get('/tasks/:userId', verifyToken, userControllers.tasks);
router.post('/createtask', verifyToken, userControllers.CreateTask);
router.delete('/tasks/:id', verifyToken, userControllers.deleteTask);
router.put('/tasks/:id', verifyToken, userControllers.updateTask);




module.exports = router;