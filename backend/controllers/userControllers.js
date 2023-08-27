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

module.exports.CreateTask = async(req, res) => {
    // console.log(req.body);
    const userId = req.id;

    const newTask = new Task({
        userId: userId,
        title: req.body.title,
        description: req.body.description,
        dueDate: req.body.dueDate,
        priority: req.body.priority,
    });

    // console.log(newTask);
    
    newTask.save()
        .then(savedTask => {
        console.log('Task saved:', savedTask);
        res.status(202).json({
            message: "Task created successfully"
        })
        })
        .catch(error => {
        console.error('Error saving task:', error);
        res.status(500).json({
            message: `${error}`
        })
        });
}

module.exports.tasks = async (req, res) => {
    console.log(req.id, "user._id");
    const userId = req.id;

    const { search } = req.query;
    console.log(search, 'search');

    try {

        let query = { userId };
        console.log(query, "Query");

        if (search) {
            query = {
                ...query,
                $or: [
                    { title: { $regex: search, $options: 'i' } }, // Case-insensitive title search
                    { description: { $regex: search, $options: 'i' } } // Case-insensitive description search
                ]
            };
        }

        const tasks = await Task.find(query)
            .sort({ priority: -1, dueDate: -1 });; // Fetch tasks belonging to the user
        // console.log(tasks);
        res.json(tasks);
      } catch (error) {
        res.status(500).json({ message: 'Error fetching tasks', error });
      }
}

module.exports.deleteTask = async(req, res) => {
    const userId = req.id;
    try{
        const { id } = req.params;
        console.log(id, 'req.params');
        const deletedItem = await Task.findByIdAndDelete({_id: id});
        console.log(deletedItem);
    
        res.status(200).json({message: "Item deleted successfully"});
    
    }catch(error){
        res.status(500).json({ error: error.message});
    }
}

module.exports.updateTask = async(req, res) => {
    const userId = req.id;

    console.log(req.params.id, 'req.params');
    const id=req.params.id;

    console.log(req.body);
    console.log(userId);

    const { title, description, dueDate, priority} = req.body;

    try{
        const updatedTask = { title, description, dueDate, priority, userId, _id: id };
        console.log(updatedTask);

        await Task.findByIdAndUpdate(id, updatedTask, {
        new: true,
        });
    
        res.status(200).json(updatedTask);

    }catch(error){
        res.status(500).json({
            error: error.message,
            success: false,
        });
    }
}

