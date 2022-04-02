// 這裡是搜尋頁
// 這邊是 url:http:localhost3000//search?keyword=XXX 的route
const express = require('express')
const router = express.Router()
const restaurantsList = require('../../restaurant.json')

// Restaurant model
const RestaurantModel = require('../../models/restaurant-list')

// route for search restaurant
router.get('/', (req, res) => {
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