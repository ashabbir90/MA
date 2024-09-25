import { Component, OnInit } from '@angular/core';
import {  login } from '../data';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  showLogin:boolean=true

  constructor(private user: UserService) {}

  ngOnInit(): void {}

  login(data: login) {
    this.user.getuserLogin(data) }

}
