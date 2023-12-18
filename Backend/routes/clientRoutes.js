const express = require('express')
const router = express.Router()
const clientController = require('../controllers/clientController');
const tokenMeddleware = require("../middlewares/token.meddleware")

router.post('/create-client/:token', tokenMeddleware, clientController.createClient); //done
router.get('/get-client/:token', tokenMeddleware, clientController.getClient); //done


module.exports = router;