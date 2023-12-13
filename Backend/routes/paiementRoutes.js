const express = require('express')
const router = express.Router()
// const paiementController = require('../controllers/pe');
const paiementController = require('../controllers/paiementController')

router.post('/create-paiement', paiementController.createPaiement);


module.exports = router;