import { Title } from '@angular/platform-browser';
import { IUser } from './../shared/interfaces';
import { AuthService } from './../shared/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  currentUser: IUser;
  title: string = 'My Profile | Snapify';
  constructor(private authService: AuthService, private titleService: Title) {}

  ngOnInit(): void {
    this.currentUser = this.authService.currentUser;
    this.titleService.setTitle(this.title);
  }
}
