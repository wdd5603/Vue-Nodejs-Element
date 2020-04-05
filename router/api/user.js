const express = require('express')
const bcrypt = require('bcrypt');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const Users = require('../../models/user')
const config = require('../../config/')
// 加密强度
const saltRounds = 10;


const router = express.Router()
router.get('/test', (req, res) => {
  res.json({ msg: 'login success' })
})
// 用户注册
router.post('/register', (req, res) => {
  const body = req.body
  Users.findOne({ email: body.email }, (err, user) => {
    if (user) {
      return res.status(400).json({ msg: '改邮箱已注册' })
    } else {
      // gravatar-Globally Recognized Avatar（全球公认头像）
      const avatar = gravatar.url(body.email, { s: '200', r: 'pg', d: 'mm' })
      const newUser = new Users({
        name: body.name,
        email: body.email,
        avatar,
        password: body.password
      })
      // 对密码进行加密
      bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(newUser.password, salt, function (err, hash) {
          if (err) throw err
          newUser.password = hash
          newUser.save()
            .then(() => {
              return res.status(200).json({ msg: '注册成功' });
            })
        });
      });
    }
  })
})
// 用户登录
router.post('/login', (req, res) => {
  const email = req.body.email

  const password = req.body.password
  Users.findOne({ email }, (err, user) => {
    if (!err && user) {
      bcrypt.compare(password, user.password, function (err, result) {
        const rules = { id: user._id }
        jwt.sign(rules, config.secretKey, { expiresIn: 60 * 60 }, function (err, token) {
          return result ? res.status(200).json({ msg: 'success', token }) : res.status(400).json({ msg: '用户名或密码有误' })
        })
      });
    } else {
      return res.status(400).json({ msg: '用户不存在' })
    }
  })
})

module.exports = router