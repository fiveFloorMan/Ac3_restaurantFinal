const express = require('express')
const router = express.Router()
const RestaurantModel = require('../../models/restaurant-list')

// route for create new restaurant
router.get('/restaurants/new', (req, res) => {
  res.render('new')
})
// route for show page (specific restaurant)
router.get('/:restaurant_id', (req, res) => {
  const id = req.params.restaurant_id
  return RestaurantModel.findById(id)
    .lean()
    .then((restaurant) => {
      res.render('show', { restaurant: restaurant })
    })
    .catch(error => console.log(error))
})
// route for catch new restaurant data
router.post('/restaurants', (req, res) => {
  const name = req.body.name
  const nameEn = req.body.name_en
  const category = req.body.category
  const image = req.body.image
  const location = req.body.location
  const phone = req.body.phone
  const googleMap = req.body.google_map
  const rating = req.body.rating
  const description = req.body.description
  return RestaurantModel.create({ name, nameEn, category, image, location, phone, googleMap, rating, description })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})
// route for Edit
router.get('/restaurants/:_id/edit', (req, res) => {
  const id = req.params._id
  return RestaurantModel.findById(id)
    .lean()
    .then((restaurant) => {
      res.render('edit', { restaurant: restaurant })
    })
    .catch(error => console.log(error))
})
// route for Catch Edit restaurant data (可能會有問題的地方)
router.put('/restaurants/:_id', (req, res) => {
  const id = req.params._id
  return RestaurantModel.findById(id)
    .then(restaurantEdit => {
      return restaurantEdit.update(req.body)
    })
    .then(() => res.redirect('/')) // 還有疑問的地方
    .catch(error => console.log(error))
})
// route for delete
router.delete('/restaurants/:_id', (req, res) => {
  const id = req.params._id
  return RestaurantModel.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router
