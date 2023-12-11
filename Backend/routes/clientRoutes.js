const express = require('express')
const router = express.Router()
const clientController = require('../controllers/clientController');

router.post('/create-client', clientController.createClient);
router.get('/get-client', clientController.getClient);


module.exports = router;