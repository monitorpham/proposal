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
  login?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  activated?: boolean;
  langKey?: string;
  authorities?: string[];
  createdBy?: string;
  createdDate?: Date;
  lastModifiedBy?: string;
  lastModifiedDate?: Date;
  password?: string;
  group?: any;
  key?: any
}

export class User implements IUser {
  constructor(
    public id?: any,
    public login?: string,
    public firstName?: string,
    public lastName?: string,
    public email?: string,
    public activated?: boolean,
    public langKey?: string,
    public authorities?: string[],
    public createdBy?: string,
    public createdDate?: Date,
    public lastModifiedBy?: string,
    public lastModifiedDate?: Date,
    public password?: string,
    public group?: any,
    public key?: any
  ) { }

  // public convertDate(dateString: String) {
  //     if (dateString) {
  //         let arr = dateString.split('T')
  //         return arr[0]
  //     }
  //     return ' '
  // }
}
