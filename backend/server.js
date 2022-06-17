const express = require('express');
const dbConnect = require('./config/db/dbConnect');
const app = express();
const PORT = process.env.PORT || 5000;

const {userRegisterCtrl} = require('./controllers/users/usersCtrl');
 
//server 
dbConnect();
//Middleware
app.use(express.json());
//Register
app.post('/api/users/register', userRegisterCtrl);
app.listen(5000, console.log(`Server started on port ${PORT}`));