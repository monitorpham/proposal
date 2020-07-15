// export class User {
//     id: any;
//     login: String;
//     email: String;
//     activated: boolean;
//     profiles: String;
//     createdDate: String;
//     lastModifiedBy: String;
//     lastModifiedDate: String

//     public convertDate(dateString: String) {
//         if (dateString) {
//             let arr = dateString.split('T')
//             return arr[0]
//         }
//         return ' '
//     }
// }

export interface IUser {
  id?: any;
  login?: String;
  firstName?: String;
  lastName?: String;
  email?: String;
  activated?: boolean;
  langKey?: String;
  authorities?: String[];
  createdBy?: String;
  createdDate?: Date;
  lastModifiedBy?: String;
  lastModifiedDate?: Date;
  password?: String;
  group?: any;
  key?: any;
  assign?: String;
  assignId?: any
}

export class User implements IUser {
  constructor(
    public id?: any,
    public login?: String,
    public firstName?: String,
    public lastName?: String,
    public email?: String,
    public activated?: boolean,
    public langKey?: String,
    public authorities?: String[],
    public createdBy?: String,
    public createdDate?: Date,
    public lastModifiedBy?: String,
    public lastModifiedDate?: Date,
    public password?: String,
    public group?: any,
    public key?: any,
    public assign?: String,
    public assignId?: any
  ) { }

  // public convertDate(dateString: String) {
  //     if (dateString) {
  //         let arr = dateString.split('T')
  //         return arr[0]
  //     }
  //     return ' '
  // }
}
