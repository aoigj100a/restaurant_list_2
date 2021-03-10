const express = require('express')
const router = express.Router()

const restaurants = require('../../restaurant.json').results

router.get('/:restaurant_id', (req, res) => {
    const restaurant = restaurants.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
    res.render('show', { restaurant })
})

module.exports = router