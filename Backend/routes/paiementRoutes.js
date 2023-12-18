const express = require('express')
const router = express.Router()
const paiementController = require('../controllers/paiementController')
const tokenMeddleware = require("../middlewares/token.meddleware")

router.post('/create-paiement/:token', tokenMeddleware, paiementController.createPaiement); //done
router.get('/get-paiement/:appartementId/:token', tokenMeddleware, paiementController.getPaiement); //done


module.exports = router;