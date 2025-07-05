const bcryptjs = require('bcryptjs');
const jwt = require ('jsonwebtoken');
const User =  require ('../models/User')

// sign up end point;

exports.signup = async (req, res) => {
    try {
    const { email, password } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return 
    res.status(400).json({message:'User already exist'});

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({email, 
        password: hashed});

    const token = jwt.sign({ id: user._id, role: user.role}, process.env.JWT_SECRET, {expiresIn: '1h'})
    res.json(token);}catch(error) {
        console.error(error).send('internal server error')}

};

//login in end point

exports.login = async (req, res) => {
    try { 
        const { email, password } = req.body;
        // check if user exist
        const user = await User.findOne({email});
        if(!user) return
        res.status(404).json({message:'User not found'})
        // check if password matches
        const isMatch =await bcrypt.compare(password, user.password);
        if(!isMatch) return
        res.status(401).json({message:'invalid password'});

     const token = jwt.sign({ id: user._id, role: user.role},
         process.env.JWT_SECRET, 
        {expiresIn: '1h'})
        res.json(token)

    }catch(error) 
    {console.error(error).send('Internal server error')}
};

// check roles
exports.authorize = (roles) => {
    return(req, res, next) => {
        if(!roles.includes(req.user.role)){
            return res.status(403).json({message: 'Access denied'});
            next();
        }
    }
}