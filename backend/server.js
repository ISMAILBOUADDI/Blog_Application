const express = require('express');
const dbConnect = require('./config/db/dbConnect');
const app = express();
const PORT = process.env.PORT || 5000;
 
//server 
dbConnect();
app.listen(5000, console.log(`Server started on port ${PORT}`));