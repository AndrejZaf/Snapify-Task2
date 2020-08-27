import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { IUser } from './../../shared/interfaces';
import { AuthService } from './../../shared/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  user: IUser;
  title: string = 'Sign In | Snapify';
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle(this.title);

    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  login(): void {
    const u = { ...this.user, ...this.loginForm.value };
    // console.log(u);
    if (!this.loginForm.valid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.authService.login(u);
    this.onLoginComplete();
  }

  onLoginComplete() {
    this.router.navigate(['/images']);
  }
}
