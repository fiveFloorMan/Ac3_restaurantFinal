// 這裡是 user 資料庫綱要
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userSchema = new Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

// 匯出'User', 讓其他檔案使用
module.exports = mongoose.model('User', userSchema)
