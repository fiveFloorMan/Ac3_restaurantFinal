// 這裡是Npm run seed之後會跑的code

const bcrypt = require('bcryptjs')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const db = require('../../config/mongoose')
// restaurant的Schema
const RestaurantModel = require('../restaurant-list')
// restaurant.json的資料
const restaurantData = require('../../restaurant.json').results
// user 的 Schema
const User = require('../user')

// 使用者資料
const SEED_USER = [{
  email: 'user1@example.com',
  password: '12345678'
}, {
  email: 'user2@example.com',
  password: '12345678'
}
]

db.once('open', () => {
  for (let i = 0; i < SEED_USER.length; i++) {
    bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(SEED_USER[i].password, salt))
      .then(hash => User.create({
        email: SEED_USER[i].email,
        password: hash
      }))
      .then(user => {
        const userId = user._id
        return Promise.all(Array.from(
          { length: 3 },
          (_, j) =>
            RestaurantModel.create({
              name: restaurantData[(i * 3) + j].name,
              nameEn: restaurantData[(i * 3) + j].nameEn,
              category: restaurantData[(i * 3) + j].category,
              image: restaurantData[(i * 3) + j].image,
              location: restaurantData[(i * 3) + j].location,
              phone: restaurantData[(i * 3) + j].phone,
              googleMap: restaurantData[(i * 3) + j].googleMap,
              rating: restaurantData[(i * 3) + j].rating,
              description: restaurantData[(i * 3) + j].description,
              userId: userId
            })
        ))
      })
      .then(() => {
        console.log('done')
        process.exit()
      })
  }
})
