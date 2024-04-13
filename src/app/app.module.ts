import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomelayoutComponent } from './homelayout/homelayout.component';
import { FooterComponent } from './footer/footer.component';
import { HomepageComponent } from './homepage/homepage.component';
import { PackageComponent } from './package/package.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertComponent } from './alert/alert.component';
import { HttpClientModule } from '@angular/common/http';
import { OtpComponent } from './otp/otp.component';
import { NgOtpInputModule } from 'ng-otp-input';
import { DatePipe } from '@angular/common';
import { HttpService } from './services/http.service';
import { HelperService } from './services/helperservice.service';
import { AlertService } from './services/alert.service';
import { AdminModule } from './admin/admin.module';
import { GoogleMapsModule } from '@angular/google-maps';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomelayoutComponent,
    FooterComponent,
    HomepageComponent,
    PackageComponent,
    LoginComponent,
    RegistrationComponent,
    AlertComponent,
    OtpComponent,
  ],
  imports: [
    BrowserModule, 
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgOtpInputModule,
    AdminModule,
    GoogleMapsModule
  ],
  providers: [HttpService
    ,DatePipe
    ,HelperService
    ,AlertService, provideAnimationsAsync()],
  bootstrap: [AppComponent]
})
export class AppModule { }
