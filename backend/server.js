const express = require('express');

const app = express();
const PORT = process.env.PORT || 5000;


app.listen(5000, console.log('Server started on port 5000'));