/*
 * @Author: WDD
 * @Date: 2020-04-05 21:00:18
 * @LastEditors: WDD
 * @LastEditTime: 2020-04-05 22:31:43
 * @Description:
 */
const express = require('express')
const passport = require('passport');
const HomeList = require('../../models/homeList')
const router = express.Router()

router.get('/list', function (req, res) {
  res.json('home')

})
/**
 * @description: 
 * @param1: {
 *      types: 类型,
 *      descript: 描述,
 *      income: 收入,
 *      expend: 支出 ,
 *      remarks: 备注 ,
 *      }
 * @return: 
 * @detail: 
 */
router.post('/add', passport.authenticate('jwt', { session: false }), function (req, res) {
  const body = req.body
  const reqObj = {}
  body.type && (reqObj.types = body.type)
  body.descript && (reqObj.descripts = body.descript)
  body.income && (reqObj.incomes = body.income)
  body.expend && (reqObj.expends = body.expend)
  body.remark && (reqObj.remarks = body.remark)
  const listObj = new HomeList(reqObj)
  listObj.save().then(() => res.status(200).json({ msg: 'success' }))
})
module.exports = router