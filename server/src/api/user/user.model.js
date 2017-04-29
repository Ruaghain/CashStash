var crypto = require('crypto');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const authTypes = ['github', 'twitter', 'facebook', 'google'];

var userSchema = new Schema({
  userName: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: {
    type: String,
    lowercase: true,
    required: function () {
      return authTypes.indexOf(this.provider) === -1;
    }
  },
  password: {
    type: String,
    required: function () {
      return authTypes.indexOf(this.provider) === -1;
    }
  },
  role: {
    type: String,
    default: 'user'
  },
  provider: String,
  salt: String
});

/**
 * Virtuals
 */

// Public profile information
userSchema
  .virtual('profile')
  .get(function () {
    return {
      'name': this.name,
      'role': this.role
    };
  });

// Non-sensitive info we'll be putting in the token
userSchema
  .virtual('token')
  .get(function () {
    return {
      '_id': this._id,
      'role': this.role
    };
  });

// Non-sensitive info we'll be putting in the token
userSchema
  .virtual('fullName')
  .get(function () {
    return this.firstName + ' ' + this.lastName;
  });

/**
 * Validations
 */

// Validate empty email
userSchema
  .path('email')
  .validate(function (email) {
    if (authTypes.indexOf(this.provider) !== -1) {
      return true;
    }
    return email.length;
  }, 'Email cannot be blank');

// Validate empty password
userSchema
  .path('password')
  .validate(function (password) {
    if (authTypes.indexOf(this.provider) !== -1) {
      return true;
    }
    return password.length;
  }, 'Password cannot be blank');

// Validate email is not taken
userSchema
  .path('email')
  .validate(function (value, respond) {
    const self = this;
    return this.constructor.findOne({ email: value }).exec()
      .then(function (user) {
        if (user) {
          if (self.id === user.id) {
            return respond(true);
          }
          return respond(false);
        }
        return respond(true);
      })
      .catch(function (err) {
        throw err;
      });
  }, 'The specified email address is already in use.');

// Validate username is not taken
userSchema
  .path('userName')
  .validate(function (value, respond) {
    const self = this;
    return this.constructor.findOne({ userName: value }).exec()
      .then(function (user) {
        if (user) {
          if (self.id === user.id) {
            return respond(true);
          }
          return respond(false);
        }
        return respond(true);
      })
      .catch(function (err) {
        throw err;
      });
  }, 'The specified username is already in use.');

const validatePresenceOf = function (value) {
  return value && value.length;
};

/**
 * Pre-save hook
 */
userSchema
  .pre('save', function (next) {
    // Handle new/update passwords
    if (!this.isModified('password')) {
      return next();
    }

    if (!validatePresenceOf(this.password)) {
      if (authTypes.indexOf(this.provider) === -1) {
        return next(new Error('Invalid password'));
      } else {
        return next();
      }
    }

    // Make salt with a callback
    this.makeSalt(16, (saltErr, salt) => {
      if (saltErr) {
        return next(saltErr);
      }
      this.salt = salt;
      this.encryptPassword(this.password, (encryptErr, hashedPassword) => {
        if (encryptErr) {
          return next(encryptErr);
        }
        this.password = hashedPassword;
        next();
      });
    });
  });

/**
 * Methods
 */
userSchema.methods = {
  /**
   * Authenticate - check if the passwords are the same
   *
   * @param {String} password
   * @param {Function} callback
   * @return {Boolean}
   * @api public
   */
  authenticate(password, callback) {
    if (!callback) {
      return this.password === this.encryptPassword(password);
    }

    this.encryptPassword(password, (err, pwdGen) => {
      if (err) {
        return callback(err);
      }

      if (this.password === pwdGen) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    });
  },

  /**
   * Make salt
   *
   * @param {Number} byteSize Optional salt byte size, default to 16
   * @param {Function} callback
   * @return {String}
   * @api public
   */
  makeSalt(byteSize, callback) {
    const defaultByteSize = 16;

    if (typeof arguments[0] === 'function') {
      callback = arguments[0];
      byteSize = defaultByteSize;
    } else if (typeof arguments[1] === 'function') {
      callback = arguments[1];
    }

    if (!byteSize) {
      byteSize = defaultByteSize;
    }

    if (!callback) {
      return crypto.randomBytes(byteSize).toString('base64');
    }

    return crypto.randomBytes(byteSize, (err, salt) => {
      if (err) {
        callback(err);
      } else {
        callback(null, salt.toString('base64'));
      }
    });
  },

  /**
   * Encrypt password
   *
   * @param {String} password
   * @param {Function} callback
   * @return {String}
   * @api public
   */
  encryptPassword(password, callback) {
    if (!password || !this.salt) {
      if (!callback) {
        return null;
      } else {
        return callback('Missing password or salt');
      }
    }

    const defaultIterations = 10000;
    const defaultKeyLength = 64;
    const salt = new Buffer(this.salt, 'base64');

    if (!callback) {
      return crypto.pbkdf2Sync(password, salt, defaultIterations, defaultKeyLength)
        .toString('base64');
    }

    return crypto.pbkdf2(password, salt, defaultIterations, defaultKeyLength, (err, key) => {
      if (err) {
        callback(err);
      } else {
        callback(null, key.toString('base64'));
      }
    });
  }
};

module.exports = mongoose.model('User', userSchema);
