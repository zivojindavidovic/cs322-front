import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isLoggedIn: boolean;

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.isLoggedIn = localStorage.getItem('userId') !== null;
  }

  openDialog() {
    this.dialog.open(DialogComponent);
  }
  logout() {
    localStorage.clear();
    this.isLoggedIn = false;
  }
}
