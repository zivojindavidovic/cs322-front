import { Optional } from '@angular/core';

export class User {
  user_id: string;
  username: string;
  email: string;
  password: string;

  constructor(
    @Optional()
    userId: string,
    username: string,
    @Optional()
    email: string,
    password: string
  ) {
    this.user_id = userId;
    this.username = username;
    this.email = email;
    this.password = password;
  }
}
