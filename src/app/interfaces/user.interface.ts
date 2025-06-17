export interface IAddress {
  street: string;
  city: string;
  zip: number;
}

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  password: string;
  role: "USER" | "ADMIN";
  createdAt?: Date;
  updatedAt?: Date;
  address: IAddress;
}
