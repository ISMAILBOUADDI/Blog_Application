const express = require('express');
const router = express.Router();
const {userRegisterCtrl} = require('../../controllers/users/usersCtrl');

router.post('/register', userRegisterCtrl);


module.exports = router;