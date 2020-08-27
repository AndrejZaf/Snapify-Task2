import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [UserComponent, LoginComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [],
})
export class UserModule {}
