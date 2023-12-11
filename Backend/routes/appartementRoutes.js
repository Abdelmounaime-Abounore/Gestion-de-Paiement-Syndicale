const express = require('express')
const router = express.Router()
const appartementController = require('../controllers/appartementController');

// router.post('/resetpassword/:token',tokenMeddleware, authController.resetPassword);
router.post('/create-appartement', appartementController.createAppartement);


module.exports = router;