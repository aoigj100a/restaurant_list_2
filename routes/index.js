const express = require('express')
const router = express.Router()

const { authenticator } = require('../middleware/auth')  // 掛載 middleware

const user = require('./modules/user')
router.use('/user', user)

const search = require('./modules/search')
router.use('/search', search)

const restaurant = require('./modules/restaurant')
router.use('/restaurant',authenticator, restaurant)

const show = require('./modules/show')
router.use('/show', show)

const index = require('./modules/index')
router.use('/', index)

module.exports = router