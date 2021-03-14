const bcrypt = require('bcryptjs')

// 環境變數
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const db = require('../../config/mongodb')
const Restaurant = require('../restaurant')
const User = require('../user')
const restaurantList = require('../restaurant.json').results

const SEED_USERS = [{
    name: 'user1',
    email: 'user1@example.com',
    password: '12345678'
}, {
    name: 'user2',
    email: 'user2@example.com',
    password: '12345678'
}]

db.once('open', async () => {
    // 每一個 Promise 都有 resolve(實現) 與 reject(失敗)
    await new Promise(function (resolve, _reject) {
        // forEach run過每一個使用者
        SEED_USERS.forEach((seedUser, index) => {
            bcrypt
                .genSalt(10)
                .then(salt => bcrypt.hash(seedUser.password, salt))
                .then(hash =>
                    User.create({
                        name: seedUser.name,
                        email: seedUser.email,
                        password: hash,
                    })
                )
                .then(user => {
                    const userId = user._id
                    return Promise.all(
                        // Array.from 參數1{物件}：迭代3個
                        Array.from({ length: 3 }, (_, i) => {
                            // 使用者的 index 可以影響 item 是奇數還是偶數
                            const restaurant = restaurantList[i + index * 3]
                            restaurant['userId'] = userId
                            return Restaurant.create(restaurant)
                        })
                    )
                })
                .then(() => {
                    console.log(index, SEED_USERS.length, 'done')
                    // index 是從0開始數
                    // Promise resolve 之後便會接下一行
                    if (index === SEED_USERS.length - 1) resolve()
                }).catch(err => console.log(err))
        })
    })
    process.exit()
})


