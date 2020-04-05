/*
 * @Author: WDD
 * @Date: 2020-04-04 20:32:58
 * @LastEditors: WDD
 * @LastEditTime: 2020-04-05 20:30:02
 * @Description: 
 */
const mongoose = require('mongoose')

const Schema = mongoose.Schema
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  identity: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now,
  },
})
module.exports = User = mongoose.model('user', userSchema)