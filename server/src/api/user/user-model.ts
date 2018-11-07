import * as crypto from 'crypto'
import { Document, Model, model, Schema } from 'mongoose';
import { IUser } from './user';

export interface IUserModel extends IUser, Document {
}

const authTypes = ['github', 'twitter', 'facebook', 'google'];

export let UserSchema: Schema = new Schema({
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

UserSchema.virtual('profile').get(() => {
  return {
    'name': this.name,
    'role': this.role
  };
});

// Non-sensitive info we'll be putting in the token
UserSchema.virtual('token').get(() => {
  return {
    '_id': this._id,
    'role': this.role
  };
});

// Non-sensitive info we'll be putting in the token
UserSchema.virtual('fullName').get(() => {
  return this.firstName.trim() + ' ' + this.lastName.trim();
});

// Validate empty email
UserSchema.path('email').validate((email: string) => {
  if (authTypes.indexOf(this.provider) !== -1) {
    return true;
  }
  return email.length;
}, 'Email cannot be blank');

// Validate empty password
UserSchema.path('password').validate((password: string) => {
  if (authTypes.indexOf(this.provider) !== -1) {
    return true;
  }
  return password.length;
}, 'Password cannot be blank');

// Validate email is not taken
UserSchema.path('email').validate((value: any, respond: any) => {
  const self = this;
  return User.findOne({ email: value }).exec()
    .then((user: any) => {
      if (user) {
        if (self.id === user.id) {
          return respond(true);
        }
        return respond(false);
      }
      return respond(true);
    })
    .catch((err: any) => {
      throw err;
    });
}, 'The specified email address is already in use.');

// Validate username is not taken
UserSchema.path('userName').validate((value: any, respond: any) => {
  const self = this;
  return User.findOne({ userName: value }).exec()
    .then((user: any) => {
      if (user) {
        if (self.id === user.id) {
          return respond(true);
        }
        return respond(false);
      }
      return respond(true);
    })
    .catch((err: any) => {
      throw err;
    });
}, 'The specified username is already in use.');

const validatePresenceOf = (value: any) => {
  return value && value.length;
};

/**
 * Pre-save hook
 * NOTE: Can't use fat-arrow syntax as it changes the scope and causes an error on 'this.isModified'
 */
UserSchema.pre<IUserModel>('save', function (next: any) {
  const user = this;
  // Handle new/update passwords
  if (!user.isModified('password')) {
    return next();
  }

  if (!validatePresenceOf(user.password)) {
    if (authTypes.indexOf(user.provider) === -1) {
      return next(new Error('Invalid password'));
    } else {
      return next();
    }
  }

  // Make salt with a callback
  UserSchema.methods.makeSalt(16, (saltErr: any, salt: any) => {
    if (saltErr) {
      return next(saltErr);
    }
    this.salt = salt;
    UserSchema.methods.encryptPassword(this.password, (encryptErr: any, hashedPassword: any) => {
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
UserSchema.methods = {
  /**
   * Authenticate - check if the passwords are the same
   *
   * @param {String} password
   * @param {Function} callback
   * @return {Boolean}
   * @api public
   */
  authenticate(password: string, callback: any) {
    if (!callback) {
      return this.password === this.encryptPassword(password);
    }

    this.encryptPassword(password, (err: any, pwdGen: any) => {
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
  makeSalt(byteSize: any, callback: any) {
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

    return crypto.randomBytes(byteSize, (err: any, salt: any) => {
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
  encryptPassword(password: string, callback: any) {
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
      return crypto.pbkdf2Sync(password, salt, defaultIterations, defaultKeyLength, 'sha1').toString('base64');
    }

    return crypto.pbkdf2(password, salt, defaultIterations, defaultKeyLength, 'sha1', (err: any, key: any) => {
      if (err) {
        callback(err);
      } else {
        callback(null, key.toString('base64'));
      }
    });
  }
};

export const User: Model<IUserModel> = model<IUserModel>('User', UserSchema);

