const mongoose = require('mongoose')
const crypto = require('crypto');
const { Schema } = mongoose

function hash(password) {
  return crypto.createHmac('sha256', process.env.SECRET_KEY).update(password).digest('hex');
}

const Account = new Schema({
  profile: {
    username: String,
    thumbnail: { type: String, default: '/static/images/default_thumbnail.png' }
  },
  email: { type: String },
  // 소셜 계정으로 회원가입을 할 경우에는 각 서비스에서 제공되는 id 와 accessToken 을 저장합니다
  social: {
    facebook: {
      id: String,
      accessToken: String
    },
    google: {
      id: String,
      accessToken: String
    }
  },
  password: String, // 로컬계정의 경우엔 비밀번호를 해싱해서 저장합니다
  thoughtCount: { type: Number, default: 0 }, // 서비스에서 포스트를 작성 할 때마다 1씩 올라갑니다
  createdAt: { type: Date, default: Date.now }
})

Account.statics.findByUsername = function(name) {
  return this.findOne({'profile.username': username}).exec()
}

Account.statics.findByEmail = function(email) {
  return this.findOne({email}).exec()
}

Account.statics.findByEmailOrUsername = function({username, email}) {
  return this.findOne({
    $or: [
      { 'profile.username': username },
      { email }
    ]
  }).exec()
}

Account.statics.localRegister = function ({ username, email, password }) {
  const account = new this({
    profile: {
      username
    },
    email,
    password: hash(password)
  });

  return account.save();
};

Account.methods.validatePassword = function (password) {
  const hashed = hash(password);
  return this.password === hashed;
};

module.exports = mongoose.model('Account', Account)