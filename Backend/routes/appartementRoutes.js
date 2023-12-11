const express = require('express')
const router = express.Router()
const appartementController = require('../controllers/appartementController');

// router.post('/resetpassword/:token',tokenMeddleware, authController.resetPassword);
router.post('/create-appartement', appartementController.createAppartement);
router.get('/get-appartements', appartementController.getAppartement);



module.exports = router;