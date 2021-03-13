const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {
    const { sort ,keyword} = req.query
    return Restaurant.find({
        "$or": [
            { "name": { $regex: `${keyword}`, $options: '$i' } },
            { "name_en": { $regex: `${keyword}`, $options: '$i' } },
            { "category": { $regex: `${keyword}`, $options: '$i' } },
            { "location": { $regex: `${keyword}`, $options: '$i' } }
        ]
    }).lean()
        .sort({ "name_en": [sort] })
        .then( restaurants => res.render('index', { restaurants , keyword,}))
})

module.exports = router