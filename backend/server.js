const { request } = require('express');
const express = require('express');
const dbConnect = require('./config/db/dbConnect');
const app = express();
const PORT = process.env.PORT || 5000;
const {errorHandles} = require('./middlewares/error/errorHandles');
const {notFound} = require('./middlewares/error/errorHandles');
const postRoute = require("./route/posts/postRoute");

//import routes
const usersRoute = require('./route/users/usersRoute');
//server 
dbConnect();
//Middleware
app.use(express.json());
//users Route
app.use('/api/users', usersRoute);
//Post route
app.use('/api/post', postRoute);

//error 
app.use(notFound);
app.use(errorHandles);
//server 
app.listen(5000, console.log(`Server started on port ${PORT}`));