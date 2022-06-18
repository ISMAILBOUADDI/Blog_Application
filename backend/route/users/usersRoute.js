const express = require('express');

const {
    userRegisterCtrl,
    loginUserCtrl,
    fetchUserCtrl,
    deleteUserCtrl,
    userDetailsCtrl
} = require('../../controllers/users/usersCtrl');
const authMiddleware = require('../../middlewares/auth/authMiddleware');

const router = express.Router();

router.post('/register', userRegisterCtrl);
router.post('/login', loginUserCtrl);
router.get('/', fetchUserCtrl);
router.delete('/:id', deleteUserCtrl);
router.get('/:id', userDetailsCtrl);
module.exports = router;