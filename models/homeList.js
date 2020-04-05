/*
 * @Author: WDD
 * @Date: 2020-04-05 20:45:20
 * @LastEditors: WDD
 * @LastEditTime: 2020-04-05 22:28:17
 * @Description:首页列表模型
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const homeListSchema = new Schema({
  types: {
    type: String,
    required: true
  },
  descripts: {
    type: String,
    required: true
  },
  incomes: {
    type: String,
    required: true
  },
  expends: {
    type: String,
    required: true
  },
  accounts: {
    type: String,
    required: true
  },
  remarks: {
    type: String
  },
  date: {
    type: String,
    default: Date.now
  }
})
module.exports = HomeList = mongoose.model('list', homeListSchema)