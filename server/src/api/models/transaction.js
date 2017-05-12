var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Transaction', transactionSchema);

var transactionSchema = new Schema({
  id: Number,
  amount: Number
});
