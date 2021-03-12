const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

router.get('/:restaurant_id', (req, res) => {
    const id = req.params.restaurant_id
    Restaurant.findOne({ id: id }).lean()
    .then((restaurant)=>res.render('show',{restaurant}))
    .catch(err => console.log(err))
})

module.exports = router