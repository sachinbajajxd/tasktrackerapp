const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv=require('dotenv');

dotenv.config();

const app = express();

app.use(cors());

const PORT = process.env.PORT || 5000;

// MongoDB connection URL
const url = process.env.MONGO_DB_URI;


// Options for the MongoDB connection
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

// Connect to MongoDB
mongoose.connect(url, options)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error);
    });



app.use(express.json());
app.use('/',require('./routes'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
