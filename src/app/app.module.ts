import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import * as $ from 'jquery';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticateComponent } from './authenticate/authenticate.component';
import { LoginComponent } from './authenticate/login/login.component';
import { RegisterComponent } from './authenticate/register/register.component';
import { ForgotpasswordComponent } from './authenticate/forgotpassword/forgotpassword.component';
import { environment } from '../environments/environment';
import { ProfileComponent } from './profile/profile.component';



@NgModule({
  declarations: [
    AppComponent,
    AuthenticateComponent,
    LoginComponent,
    RegisterComponent,
    ForgotpasswordComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }
