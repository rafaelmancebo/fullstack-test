const express = require('express');
const router = express.Router();
const {
    getUser,
    getUsers,
    createUser,
    updateUser,
    deleteUser,
} = require('../controllers/userController');

router.get('/:id', getUser);
router.get('/', getUsers);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
