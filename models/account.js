let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let accountSchema = new Schema({
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
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  transactions: [{
    type: Schema.Types.ObjectId,
    ref: 'Transaction'
  }]
});

module.exports = mongoose.model('Account', accountSchema);

