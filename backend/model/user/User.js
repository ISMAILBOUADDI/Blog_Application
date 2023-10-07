const mongoose = require('mongoose');
const bycrypt = require('bcryptjs');
const crypto = require('crypto')

//create schema

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First Name is required']
    },
    lastName: {
        type: String,
        required: [true, 'Last Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    profilePhoto: {
        type: String,
        default: 'https://res.cloudinary.com/dzq9qzqjx/image/upload/v1624098981/default_profile_photo_qzq9qzq.png'
    },
    bio:{
        type: String,
        default: 'No bio yet'
    },
    postCount: {
        type: Number,
        default: 0,
    },
    isBlocked: {
        type: Boolean,
        default: false,
    },
    isAdmin:{
        type: Boolean,
        default: false,
    },
    role:{
        type: String,
        enum: ['Guest', 'Admin','Blogger'],
    },
    isFollowing: {
        type: Boolean,
        default: false,
    },
    isUnFollowing: {
        type: Boolean,
        default: false,
    },
    isAccountVerified: {
        type: Boolean,
        default: false,
    },
    acccountVerificationToken: String,
    accountVerificationExpiry: Date,
    viewedby: {
        type: [
          { 
             type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
          }
        ],
    },
    followers: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            }
        ],
    },
    following: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            }
        ],
    },

    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpiry: Date,
    active: {
        type: Boolean,
        default: false,
    },



},{
   toJson:{
         virtuals:true
   },
    toObject:{
        virtuals:true
    },
    timestamps:true
})


//hash password
userSchema.pre("save", async function(next) {
    if (!this.isModified("password")) {
        
        next();
    }
    const salt = await bycrypt.genSalt(10);
    this.password = await bycrypt.hash(this.password, salt);
    next()
})

//match password
userSchema.methods.isPasswordMatched = async function(enteredPassword) {
    return await bycrypt.compare(enteredPassword, this.password);
}

// verification account

 userSchema.method.createAcounteVerificationToken = async function()
 {
    //create token
    const verificationToken = crypto.randomBytes(32).toString('hex');
    this.acccountVerificationToken = crypto.createHash('sha256').update(verificationToken).digest('hex');
    this.accountVerificationExpiry = Date.now() + 30 * 60 * 1000 // 10 minutes
    return verificationToken;
 }

// Compile schema into model
const User = mongoose.model('User', userSchema);
module.exports = User;