const express = require('express')
const router = express.Router()

const index = require('./modules/index')
router.use('/', index)

const search = require('./modules/restaurant')
router.use('/', search)

const show = require('./modules/show')
router.use('/', show)

module.exports = router