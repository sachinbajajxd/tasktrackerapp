const User = require('../models/User');
const Task = require('../models/Tasks');
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');


module.exports.Login = async (req, res) => {

    const body = {
        email: req.body.email,
        password: req.body.password
    }

    const email=body.email;
    const password=body.password;

    console.log(body);

    try{
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Authentication failed' });
        }

        jwt.sign({user}, process.env.SECRET_KEY, {expiresIn: '2h'}, (err, token) => {
            if(err){
                res.json({
                    message: "There is some error"
                })
            }else{
                // user.token=token;
                res.json({
                    user,
                    token
                });
            }
        })

    }catch(error){
        res.status(500).json({ message: 'Server error' });
    }
} 

module.exports.Signup = async (req, res) => {

    const body = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }

    const username=body.username;
    const email=body.email;
    const password=body.password;

    console.log(body);

    try {
        // Check if username or email already exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    
        if (existingUser) {
          return res.status(400).json({ message: 'Username or email is already taken' });
        }
    
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
    
        // Create new user
        const newUser = new User({
          username,
          email,
          password: hashedPassword,
        });
    
        await newUser.save();
    
        // const token = jwt.sign({ userId: newUser._id }, 'your-secret-key', { expiresIn: '1h' });
    
        return res.json({
            message: "Signup successful",
            newUser
        });
      } catch (error) {
        res.status(500).json({ message: 'Server error' });
      }
} 

