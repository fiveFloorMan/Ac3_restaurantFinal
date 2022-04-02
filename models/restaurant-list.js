// 這裡是restaurant的資料庫綱要
const mongoose = require('mongoose')
const Schema = mongoose.Schema // 資料庫綱要

const restaurantSchema = new Schema({
  id: { type: Number },
  name: { type: String, required: true },
  nameEn: { type: String },
  category: { type: String },
  image: { type: String },
  location: { type: String, required: true },
  phone: { type: String },
  googleMap: { type: String },
  rating: { type: String },
  description: { type: String },
  // 和user連接
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: true
  }
})

module.exports = mongoose.model('RestaurantModel', restaurantSchema)
