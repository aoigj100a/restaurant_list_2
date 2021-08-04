const bcrypt = require('bcryptjs')

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
  await new Promise(function (resolve, _reject) {
    SEED_USERS.forEach((seedUser, index) => {
      bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(seedUser.password, salt))
        .then(hash =>
          User.create({
            name: seedUser.name,
            email: seedUser.email,
            password: hash
          })
        )
        .then(user => {
          const userId = user._id
          return Promise.all(
            // Array.from 參數1{物件}：迭代3個
            Array.from({ length: 3 }, (_, i) => {
              // 使用者的 index 可以影響 item 是奇數還是偶數
              const restaurant = restaurantList[i + index * 3]
              restaurant.userId = userId
              return Restaurant.create(restaurant)
            })
          )
        })
        .then(() => {
          console.log(index, SEED_USERS.length, 'done')
          if (index === SEED_USERS.length - 1) resolve()
        }).catch(err => console.log(err))
    })
  })
  process.exit()
})
