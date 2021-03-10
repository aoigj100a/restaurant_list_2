const express = require('express')
const router = express.Router()

router.get('/',(req,res)=>{
    res.render('index')
})

router.get('/show/1',(req,res)=>{
    res.render('show')
})

module.exports = router