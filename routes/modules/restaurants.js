//這裡是 個別餐廳的CRUD
//這邊是 url:localhost:3000/restaurant/XXXX 的route
const express = require('express')
const router = express.Router()
const RestaurantModel = require('../../models/restaurant-list')

// route for create new restaurant
router.get('/new', (req, res) => {
  res.render('new')
})
// route for show page (specific restaurant)
router.get('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return RestaurantModel.findOne({ _id, userId })
    .lean()
    .then((restaurant) => {
      res.render('show', { restaurant: restaurant })
    })
    .catch(error => console.log(error))
})
// route for catch new restaurant data
router.post('/', (req, res) => {
  const userId = req.user._id
  const {name, nameEn, category, image, location, phone, googleMap, rating, description} = req.body
  return RestaurantModel.create({ userId, name, nameEn, category, image, location, phone, googleMap, rating, description })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})
// route for Edit
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return RestaurantModel.findOne({ _id, userId})
    .lean()
    .then((restaurant) => {
      res.render('edit', { restaurant: restaurant })
    })
    .catch(error => console.log(error))
})
// route for Catch Edit restaurant data
router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return RestaurantModel.findOne({ _id, userId})
    .then(restaurantEdit => {
      return restaurantEdit.update(req.body)
    })
    .then(() => res.redirect(`/restaurants/${_id}`))
    .catch(error => console.log(error))
})

// route for delete
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return RestaurantModel.findOne({ _id, userId})
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router
