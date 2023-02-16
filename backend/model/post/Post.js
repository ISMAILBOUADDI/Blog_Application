const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Post title is required'],
        trim : true,
    },
    // Created by only category
    category :{
        type : String,
        required : [true, 'Post category is required'],
        default : "All",
    },
    isLiked : {
        type: Boolean,
        default: false,
    },
    isDisLiked : {
        type: Boolean,
        default: false,
    },
    numViews : {
        type: Number,
        default: 0,
    },
    likes : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ],
    dislikes : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ],
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Please Author is require"],
    },
    description : {
        type: String,
        required: [true, "Post description is required"],
    },
    image:{
        type: String,
        default:
            "https://cdn.pixabay.com/photo/2022/11/16/16/56/city-7596379_960_720.jpg",
    },
},{
    toJSON: {
        virtuals: true,
    },
    toObject:{
        virtuals: true,
    },
    timestamps: true,
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;