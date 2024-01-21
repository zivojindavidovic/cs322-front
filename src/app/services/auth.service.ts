import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { User } from '../models/user';
import { LoginResponse } from '../models/loginResponse';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:5077/users/login';
  constructor(private _httpClient: HttpClient) {}

  public login(user: User) {
    return this._httpClient
      .post(this.baseUrl, user)
      .pipe(map((user: any) => this._createUserFromObject(user)));
  }

  private _createUserFromObject(user: any): any {
    return new LoginResponse(
      user.success,
      user.errors,
      user.token,
      user.userId,
      user.username
    );
  }
}
