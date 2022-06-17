const User = require('../../model/user/User');


const userRegisterCtrl = async (req, res) => {
//   console.log(req.body);
//Check if user already exists
const userExist = await User.findOne({ email: req?.body?.email });
if(userExist) return res.status(400).json({ msg: 'User already exists' });
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
}
module.exports = {userRegisterCtrl};