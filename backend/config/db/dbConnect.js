const mongoose = require('mongoose');

const dbConnect = async () => {
try {
    await mongoose.connect(process.env.MONGO_URI, {
    
        useCreatedIndex: true,
        useFindAndModify: true,
        useUnifiendTopology: true,
        useNewUrlParser: true,


    });
    console.log('MongoDB connected');
} catch (error) {
    
}

}