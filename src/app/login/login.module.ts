import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import { OtpComponent } from '../otp/otp.component';
import { NgOtpInputModule } from 'ng-otp-input';
import { httpInterceptorProviders } from '../Helpers/http.interceptor';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    NgOtpInputModule
  ],
  providers: [httpInterceptorProviders],
  declarations: [LoginPage, OtpComponent]
})
export class LoginPageModule {}
