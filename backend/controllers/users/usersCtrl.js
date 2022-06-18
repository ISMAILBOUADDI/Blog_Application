const User = require('../../model/user/User');
const expressAsyncHandler = require('express-async-handler');
const generateToken = require('../../config/token/generateToken');
const validateMongodbID = require('../../Utils/validateMongodbID');



const userRegisterCtrl = expressAsyncHandler(async (req, res) => {
    //   console.log(req.body);
    //Check if user already exists
    const userExist = await User.findOne({ email: req?.body?.email });
    if(userExist) throw new Error('User already exists');
        try {
            const user = await User.create({
                firstName:req?.body?.firstName,
                lastName:req?.body?.lastName,
                email:req?.body?.email,
                password:req?.body?.password,
            })
            res.status(200).json(user);
        } catch (error) {
        res.json(error);
        }
    });
    //----------------------------------------------------------------------------------------------------------------------
    //login user
    //----------------------------------------------------------------------------------------------------------------------
    const loginUserCtrl = expressAsyncHandler(async (req, res) => {
        const{email,password} = req.body;
        //Check if user already exists
        const user = await User.findOne({ email });
        // if(!user) throw new Error('Login failed');
        //check if passowrd is correct
        if(user && (await user.isPasswordMatched(password))){
            res.json({
               firstName:user?.firstName,
               lastName:user?.lastName, 
                email:user?.email,
                profilePhoto:user?.profilePhoto,
                bio:user?.bio,
                postCount:user?.postCount,
                token:generateToken(user._id),
            })
        }else{
            res.status(404)
            throw new Error('Login failed');
        }
    });

//----------------------------------------------------------------------------------------------------------------------
//get user
//----------------------------------------------------------------------------------------------------------------------
const fetchUserCtrl = expressAsyncHandler(async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        res.json(error);
    }
});
//-----------------------
//delete user
//-----------------------
const deleteUserCtrl = expressAsyncHandler(async (req, res) => {
    const {id} = req.params;
    //check id id is valid
    validateMongodbID(id);

    try {
        const user = await User.findByIdAndDelete(id);
        res.status(200).json(user);
    } catch (error) {
        res.json(error);
    }

});

//----------------------------------------------------------------------------------------------------------------------
//user details
//----------------------------------------------------------------------------------------------------------------------

    
const userDetailsCtrl = expressAsyncHandler(async (req, res) => {
      const {id} = req.params;
        //check id id is valid
        validateMongodbID(id);
        try {
            const user = await User.findById(id);
            res.status(200).json(user);
        } catch (error) {
            res.json(error);
        }
    
    })

    //----------------------------------------------------------------------------------------------------------------------
    //User profile
    //----------------------------------------------------------------------------------------------------------------------
 const userProfileCtrl = expressAsyncHandler(async (req, res) => {
    const {id} = req.params;
    validateMongodbID(id);
    try {
        const myProfile = await User.findById(id);
        res.status(200).json(myProfile);
     } catch (error) {
        
     }

 })

 //----------------------------------------------------------------------------------------------------------------------
 //Update User Profile
 //----------------------------------------------------------------------------------------------------------------------
const updateUserProfileCtrl = expressAsyncHandler(async (req, res) => {
    const {id} = req?.user
    validateMongodbID(id);
    console.log(id)
    try {
        const user = await User.findByIdAndUpdate(id, {
            firstName:req?.body?.firstName,
            lastName:req?.body?.lastName,
            email:req?.body?.email,
            bio:req?.body?.bio,
        }, {
            new: true,
            runValidators: true,
        });
        res.status(200).json(user);
    } catch (error) {
        res.json(error);
        
    }

})

module.exports = {
        userRegisterCtrl,
        loginUserCtrl,
        fetchUserCtrl,
        deleteUserCtrl,
        userDetailsCtrl,
        userProfileCtrl,
        updateUserProfileCtrl,
    };