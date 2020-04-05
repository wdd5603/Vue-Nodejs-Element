/*
 * @Author: WDD
 * @Date: 2020-04-05 17:24:57
 * @LastEditors: WDD
 * @LastEditTime: 2020-04-05 18:19:09
 * @Description:token验证
 */
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require("mongoose");
const User = mongoose.model("user");
const config = require("./index.js");

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();  //通过配置信息来生成jwt的请求，验证这个token
opts.secretOrKey = config.secretKey

module.exports = passport => {
  passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
    User.findById(jwt_payload.id)
      .then(user => {
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      })
      .catch(err => console.log(err));

  }));

}