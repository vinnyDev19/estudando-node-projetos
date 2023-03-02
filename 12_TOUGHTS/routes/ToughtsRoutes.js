const express = require('express');
const Tought = require('../models/Toughts');
const router = express.Router();
const ToughtController = require('../controllers/ToughtController');

//CONTROLLERS

router.get('/', ToughtController.showToughts);

module.exports = router;