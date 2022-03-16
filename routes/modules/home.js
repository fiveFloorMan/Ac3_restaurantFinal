
const express = require('express')
const router = express.Router()
const restaurantsList = require('../../restaurant.json')

// Restaurant model
const RestaurantModel = require('../../models/restaurant-list')


// route 首頁
router.get('/', (req, res) => {
  // Controller
  RestaurantModel.find()
    .lean()
    .then(restaurant => {
      res.render('index', { restaurant: restaurant })
    })
    .catch(error => console.log(error))
})


// 匯出結果
module.exports = router