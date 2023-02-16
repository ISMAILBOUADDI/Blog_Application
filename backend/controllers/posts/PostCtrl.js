const Post = require("../../model/post/Post");
const expressAsyncHandler = require('express-async-handler');
const Filter = require('bad-words');
const validateMongodbID = require("../../Utils/validateMongodbID");

const createPostCtrl = expressAsyncHandler(async (req, res) => {
    console.log("tesr",req.body.user)
    // validateMongodbID(req.body.user);
    const filter = new Filter();
    const isProfane = filter.isProfane("fuck");
    console.log("hello",isProfane)
   try
   {
        const post = await Post.create(res.body)
   }
   catch(error)
   {
    res.json(error)
   }
    // res.json("tsett")
});

module.exports = {
    createPostCtrl,
}