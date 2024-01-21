import { Optional } from '@angular/core';

export class LoginResponse {
  success: boolean;
  errors: string;
  token: string;
  userId: string;
  username: string;

  constructor(
    success: boolean,
    errors: string,
    token: string,
    userId: string,
    username: string
  ) {
    this.success = success;
    this.errors = errors;
    this.token = token;
    this.userId = userId;
    this.username = username;
  }
}
