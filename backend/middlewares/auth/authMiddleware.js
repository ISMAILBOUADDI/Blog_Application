const expressAsyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');

const authMiddleware = expressAsyncHandler(async (req, res, next) => {
   let token ;
   
   if(req?.headers?.authorization?.startsWith('Bearer')){
       try {
        token = req.headers.authorization.split(' ')[1];
        if(token){
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
        }
       } catch (error) {
        
       }
   }

})