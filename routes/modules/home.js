
const express = require('express')
const router = express.Router()

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
// route for search restaurant
router.get('/search', (req, res) => {
  if (!req.query.keywords) {
    res.redirect('/')
  }
  const keyword = req.query.keywords.trim().toLowerCase() // 處理過的輸入的搜尋字眼
  // restaurantsList.results 是restaurant.json的陣列
  const filterRestaurants = restaurantsList.results.filter((data) => {
    return data.name.toLowerCase().trim().includes(keyword) || data.category.trim().includes(keyword)
  })
  res.render('index', { restaurant: filterRestaurants })
})
// 匯出結果
module.exports = router