var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var accountSchema = new Schema({
  name: String,
  number: String,
  // accountType: {
  //   type: ObjectId,
  //   ref: 'AccountTypeSchema'
  // },
  openingBalance: Number,
  balance: Number,
  openingDate: Date,
  // currency: {
  //   type: ObjectId,
  //   ref: 'CurrencySchema'
  // },
  _user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  // transactions: [{
  //   type: Schema.Types.ObjectId,
  //   ref: 'Transaction'
  // }]
});

// Validate account name is not already taken
accountSchema.path('name').validate(function (value, respond) {
    const self = this;
    return this.constructor.findOne({ name: value }).exec()
      .then(function (account) {
        if (account) {
          if (self.id === account.id) {
            return respond(true);
          }
          return respond(false);
        }
        return respond(true);
      })
      .catch(function (err) {
        throw err;
      });
  },
  'The specified account name is already in use.'
);

module.exports = mongoose.model('Account', accountSchema);

