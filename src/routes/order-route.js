const express = require('express');
const router = express.Router();
const controller = require ('../controllers/order-controller');
const authService = require('../services/auth-service');

// router.get('/', controller.get);

router.post('/', authService.authorize, controller.post);
router.get('/', authService.authorize, scontroller.get);


module.exports = router;