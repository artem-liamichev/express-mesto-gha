const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 30,
      default: 'Жак-Ив Кусто',
    },
    about: {
      type: String,
      minlength: 2,
      maxlength: 30,
      default: 'Исследователь',
    },
    avatar: {
      type: String,
      // eslint-disable-next-line no-useless-escape
      match: (/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/),
      default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',

    },
    email: {
      type: String,
      unique: true,
      required: true,
      validate: {
        validator(v) {
          return validator.isEmail(v);
        },
        message: 'Вам нужно ввести e-mail',
      },
    },
    password: {
      type: String,
      select: false,
      required: true,
    },
  },
  { versionKey: false },
);

userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

module.exports = mongoose.model('user', userSchema);
