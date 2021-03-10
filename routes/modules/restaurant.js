const express = require('express')
const router = express.Router()

const restaurants = require('../../restaurant.json')

router.get('/',(req,res)=>{
    res.render('index')
})

router.get('/restaurants/1',(req,res)=>{
    res.render('show')
})

module.exports = router