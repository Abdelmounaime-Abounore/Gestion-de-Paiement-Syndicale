const express = require('express')
const router = express.Router()
const paiementController = require('../controllers/paiementController')

router.post('/create-paiement', paiementController.createPaiement);
router.get('/get-paiement/:appartementId', paiementController.getPaiement);


module.exports = router;