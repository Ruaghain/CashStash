let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let transactionSchema = new Schema({
  id: Number,
  amount: Number
});

module.exports = mongoose.model('Transaction', transactionSchema);
