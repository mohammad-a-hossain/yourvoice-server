const express = require('express')
const router = express.Router()
const {time} =require('../controllers/entry')

router.get('/',time)

module.exports = router