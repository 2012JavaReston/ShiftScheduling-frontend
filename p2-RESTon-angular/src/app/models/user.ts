import { UserInterface } from './../interfaces/user-interface';
export class User implements UserInterface {
  id = 0;
  username = '';
  email = '';
  password = '';
  isManager = null;
  phone = 0;
  constructor() {}
}
