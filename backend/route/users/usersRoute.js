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
    followingUserCtrl,
    unfollowUserCtrl,
    blockUserCtrl,
} = require('../../controllers/users/usersCtrl');
const authMiddleware = require('../../middlewares/auth/authMiddleware');

const router = express.Router();

router.post('/register', userRegisterCtrl);
router.post('/login', loginUserCtrl);
router.get('/', authMiddleware, fetchUserCtrl);
router.put("/password", authMiddleware, updatePasswordCtrl);
router.put("/follow",authMiddleware,followingUserCtrl);
router.put("/unfollow",authMiddleware,unfollowUserCtrl);
router.get("/profile/:id", authMiddleware, userProfileCtrl);
router.put("/:id", authMiddleware, updateUserProfileCtrl);
router.delete('/:id', deleteUserCtrl);
router.get('/:id', userDetailsCtrl);
module.exports = router;