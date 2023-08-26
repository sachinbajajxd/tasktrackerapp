const jwt=require('jsonwebtoken');

module.exports.Login = (req, res) => {
    // console.log(process.env.SECRET_KEY);
    // res.json(202);
    const user={
        Name:"Sachin",
        Mail:"testing@gmail.com",
        phone:"1234"
    };
    jwt.sign({user}, process.env.SECRET_KEY, {expiresIn: '2h'}, (err, token) => {
        if(err){
            res.json({
                message: "There is some error"
            })
        }else{
            user.token=token;
            res.json({
                user
            });
        }
    })
} 
