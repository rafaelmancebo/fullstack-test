const express = require('express');
const router = express.Router();
const {
    getAddresses,
    createAddress,
    updateAddress,
    deleteAddress,
} = require('../controllers/addressController');

router.get('/:userId', getAddresses);
router.post('/:userId', createAddress);
router.put('/:userId', updateAddress);
router.delete('/:userId', deleteAddress);

module.exports = router;
