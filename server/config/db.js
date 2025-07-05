const mongoose = require ('mongoose');

//connect to mongoDB

const connect = async () => {
    try{
     await mongoose.connect(process.env.MONGO_URI);
       console.log('mongoDB connected')
    }catch (error) {
        console.error('Error connecting to mongoBD:', error.message);
        process.exit(1);
    }
};
module.exports = connect