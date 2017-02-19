export class User {

  //putting public or private makes the parameter a property as well (and assigns it).
  // The ? makes specified parameters optional.
  constructor(public userName: string,
              public password: string,
              public firstName?: string,
              public lastName?: string,
              public email?: string,
              public role?: string,
              public provider?: string) {
  }
}
