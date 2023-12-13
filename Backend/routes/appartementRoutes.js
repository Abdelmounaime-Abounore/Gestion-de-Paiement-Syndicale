const express = require('express')
const router = express.Router()
const appartementController = require('../controllers/appartementController');

// router.post('/resetpassword/:token',tokenMeddleware, authController.resetPassword);
router.post('/create-appartement', appartementController.createAppartement);
router.get('/get-appartements', appartementController.getAppartement);
router.delete('/delete-appartement/:id', appartementController.deleteAppartement);
router.put('/edit-appartement/:id', appartementController.updateAppartement);



module.exports = router;