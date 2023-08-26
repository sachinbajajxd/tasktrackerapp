const express=require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const userControllers=require('../controllers/userControllers');

router.get('/', (req, res) => {
    console.log("Hello we are on home page");
    res.json(202);
});

router.post('/login', userControllers.Login);
router.post('/signup', userControllers.Signup);




module.exports = router;