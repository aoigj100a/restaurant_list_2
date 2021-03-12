const db = require('../../config/mongodb')
const Restaurant = require('../restaurant')
const restaurantList = require('../restaurant.json').results

db.once('open', () => {
    console.log('mongodb 連線了')
    Restaurant.insertMany(restaurantList, (err, docs) => {
        if (err) {
            console.log(err);
        } else {
            console.log('儲存成功:', docs)
        }
        db.close() // 使用過後關閉db
    })
})

