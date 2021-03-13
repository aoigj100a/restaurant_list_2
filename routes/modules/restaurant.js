const express = require('express')
const router = express.Router()
// const Restaurant = require('../../models/restaurant')

router.get('/',(req,res)=>{
    res.render('index')
})

router.get('/new',(req,res)=>{
    res.render('new')
})

//upload.single('image')
router.post('/',(req,res)=>{

})

router.get('/delete/:restaurant_id',(req,res)=>{
    res.render('delete')
})
router.delete('/delete/:restaurant_id',(req,res)=>{

})

//路線edit
router.get('/:restaurant_id',(req, res)=>{
    res.render('edit')
})

router.put('/:restaurant_id',(req, res)=>{

})

module.exports = router