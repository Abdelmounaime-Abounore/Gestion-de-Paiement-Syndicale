const express = require('express')
const router = express.Router()
const appartementController = require('../controllers/appartementController');
const tokenMeddleware = require("../middlewares/token.meddleware")

router.post('/create-appartement/:token', tokenMeddleware, appartementController.createAppartement); //done
router.get('/get-appartements/:token', tokenMeddleware, appartementController.getAppartement); //done
router.delete('/delete-appartement/:id/:token', tokenMeddleware, appartementController.deleteAppartement); //done
router.put('/edit-appartement/:id/:token', tokenMeddleware, appartementController.updateAppartement); //done



module.exports = router;