// 這裡是搜尋頁
// 這邊是 url:http:localhost3000/search?keyword=XXX 的route
const express = require('express')
const router = express.Router()

// Restaurant model
const RestaurantModel = require('../../models/restaurant-list')

// route for search restaurant
router.get('/', (req, res) => {
  // localhost3000/search
  if (!req.query.keywords) {
    res.redirect('/')
  }
  const userId = req.user._id
  RestaurantModel.find({ userId: userId })
    .lean()
    .then(restaurant => {
      console.log('restaurant:', restaurant)
      const keyword = req.query.keywords.trim().toLowerCase() // 處理過的輸入的搜尋字眼
      const restaurantSearch = []
      for (let i = 0; i < restaurant.length; i++) {
        if (restaurant[i].name.toLowerCase().trim().includes(keyword) || restaurant[i].category.trim().includes(keyword)) {
          restaurantSearch.push(restaurant[i])
        }
      }
      res.render('index', { restaurant: restaurantSearch })
    })
    .catch(error => console.log(error))
})

// 匯出結果
module.exports = router
