import { IUser } from './interfaces';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  currentUser: IUser;
  constructor() {}

  get isLoggedIn(): boolean {
    return !!this.currentUser;
  }

  login(user: IUser) {
    const username = user.username;
    const password = user.password;
    if (!username || !password) {
      // Please enter user and password
      return;
    }
    if (username === 'admin') {
      this.currentUser = {
        id: 1,
        name: 'admin',
        username: 'admin',
        email: 'admin@admin.com',
        password: 'admin',
        address: {
          street: 'admin str',
          city: 'admin city',
          zipcode: '1000',
        },
        role: 'admin',
        phone: '123456789',
        images: [],
      };
      return;
    }
    this.currentUser = {
      id: 1,
      name: 'user',
      username: 'user',
      email: 'user@user.com',
      password: 'test123',
      address: {
        street: 'user address',
        city: 'user',
        zipcode: 'user',
      },
      role: 'user',
      phone: '072-206-354',
      images: [],
    };
  }

  logout(): void {
    this.currentUser = null;
  }
}
