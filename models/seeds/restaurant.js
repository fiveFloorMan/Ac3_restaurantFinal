const db = require('../../config/mongoose')
// restaurant的格式
const RestaurantModel = require('../restaurant-list')
// restaurant.json的資料
const restaurantData = require('../../restaurant.json').results

db.once('open', () => {
  console.log('running seeds of restaurant.json')

  RestaurantModel.create(restaurantData)
    .then(() => {
      console.log('run seed of restaurant.json is done')
      db.close()
    })
    .catch(error => console.log(error))
})
