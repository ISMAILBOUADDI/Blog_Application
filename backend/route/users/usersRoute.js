const express = require('express');

const {
    userRegisterCtrl,
    loginUserCtrl,
    fetchUserCtrl,
    deleteUserCtrl,
    userDetailsCtrl,
    userProfileCtrl,
    updateUserProfileCtrl,
    updatePasswordCtrl,
} = require('../../controllers/users/usersCtrl');
const authMiddleware = require('../../middlewares/auth/authMiddleware');

const router = express.Router();

router.post('/register', userRegisterCtrl);
router.post('/login', loginUserCtrl);
router.get('/', authMiddleware, fetchUserCtrl);
router.get("/profile/:id", authMiddleware, userProfileCtrl);
router.put("/:id", authMiddleware, updateUserProfileCtrl);
router.put("/password/:id", authMiddleware, updatePasswordCtrl);
router.delete('/:id', deleteUserCtrl);
router.get('/:id', userDetailsCtrl);
module.exports = router;