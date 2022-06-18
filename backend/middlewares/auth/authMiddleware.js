const expressAsyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require('../../model/user/User');

const authMiddleware = expressAsyncHandler(async (req, res, next) => {
   let token ;
   
   if(req?.headers?.authorization?.startsWith('Bearer')){
       try {
        token = req.headers.authorization.split(' ')[1];
        console.log(token);
        if(token){
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            //find the user by id
            const user = await User.findById(decoded.id).select('-password');
            //attach the user to the request object
            req.user = user;
            next();
        }else {
            throw new Error('there is no token attached to the header');
        }
       } catch (error) {
         throw new Error('Not authorized token wxpired, login again');
       }
   }

});

module.exports = authMiddleware;
