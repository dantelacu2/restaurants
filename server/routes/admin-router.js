const express = require('express')

const AdminCtrl = require('../controllers/admin-ctrl')

const router = express.Router()

// restaurant methods

router.get('/profile', AdminCtrl.massAdd)
router.get('/statusUpdate', AdminCtrl.massStatusUpdate)

// main page router still packed in restaurant router should change

module.exports = router