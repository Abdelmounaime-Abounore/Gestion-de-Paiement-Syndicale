const express = require('express')
const router = express.Router()
const clientController = require('../controllers/clientController');

// router.post('/resetpassword/:token',tokenMeddleware, authController.resetPassword);
router.post('/create-client', clientController.createClient);


module.exports = router;