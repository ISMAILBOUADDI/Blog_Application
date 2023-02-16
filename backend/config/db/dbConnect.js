const mongoose = require('mongoose');
require('dotenv').config();
const dbConnect = async () => {
try {
    const URL = process.env.MONGODB_URI;
    await mongoose.connect(URL, {
        useNewUrlParser: true, 

        useUnifiedTopology: true 
        
    });
    console.log("Db is Connected Successfully");
} catch (error) {
    console.log(`Error: ${error.message}`);
}

}

module.exports = dbConnect;