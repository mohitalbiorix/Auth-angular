export interface User {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirm_password?: string;
}

export interface Auth {
  email: string;
  password: string;
}
