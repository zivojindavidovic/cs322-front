import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { LoginResponse } from 'src/app/models/loginResponse';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  public user: any;

  constructor(
    private dialog: MatDialogRef<DialogComponent>,
    private _authService: AuthService
  ) {}

  loginForm: FormGroup;

  closeDialog() {
    this.dialog.close();
  }

  submitLogin() {
    let id = this.loginForm.get('id')?.value;
    let username = this.loginForm.get('username')?.value;
    let email = this.loginForm.get('email')?.value;
    let password = this.loginForm.get('password')?.value;

    let user = new User(id, username, email, password);
    this.login(user);
    //this.closeDialog();
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  public login(user: User) {
    this._authService.login(user).subscribe((data) => {
      console.log(data);
      if (data.success) {
        this.closeDialog();
        localStorage.setItem('userId', data.userId);
        localStorage.setItem('username', data.username);
        localStorage.setItem('token', data.token);
      }
    });
  }
}
