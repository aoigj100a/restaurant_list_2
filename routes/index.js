const express = require('express')
const router = express.Router()

const user = require('./modules/user')
const search = require('./modules/search')
const show = require('./modules/show')
const restaurant = require('./modules/restaurant')
const index = require('./modules/index')
const auth = require('./modules/auth')

const { authenticator } = require('../middleware/auth') // 掛載 middleware

router.use('/user', user)
router.use('/search', search)
router.use('/show', show)
router.use('/auth', auth)
router.use('/restaurant', authenticator, restaurant)
router.use('/', authenticator, index)
module.exports = router
