import { Document, Model, model, Schema } from 'mongoose';
import { IAccount } from './account';

export interface IAccountModel extends IAccount, Document {

}

export let AccountSchema: Schema = new Schema({
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

AccountSchema.path('name').validate((value: any) => {
    const self = this;
    return Account.findOne({ name: value }).exec()
      .then((account: any) => {
        if (account) {
          if (self.id === account.id) {
            return true;
          }
          return false;
        }
        return true;
      })
      .catch((err: any) => {
        throw err;
      });
  },
  'The specified account name is already in use.'
);

export const Account: Model<IAccountModel> = model<IAccountModel>('Account', AccountSchema);
