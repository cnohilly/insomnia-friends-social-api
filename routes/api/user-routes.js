const router = require('express').Router();
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require('../../controllers/user-controller');

//  /api/users
router.route('/')
    .get(getAllUsers)
    .post(createUser);

//  /api/users/:id
router.route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

//  /api/users/:userId/:friendId
router.route('/:userId/:friendId')
    .put(addFriend)
    .delete(removeFriend);

module.exports = router;