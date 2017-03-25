export class Account {
  constructor(public name: string,
              public number: string,
              public openingBalance: number,
              public balance: number,
              public _id?: string) {
  }

  clone() {
    return new Account(this.name, this.number, this.openingBalance, this.balance, this._id);
  }
}
