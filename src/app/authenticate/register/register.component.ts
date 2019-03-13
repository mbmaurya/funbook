import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';

import { environment } from '../../../environments/environment'
import { Observable } from 'rxjs';
import * as firebase from 'firebase';

export interface User {
  firstName: string;
  lastName: string;
  emailAddress: string;
  password: string;
  gender: string;
  dob: Date;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  

  registrationForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    emailAddress: ['', [Validators.required, Validators.email]],
    password: ['', Validators.minLength(8)],
    gender: ['', Validators.required],
    dob: ['', Validators.required]
  })

  get firstName() { return this.registrationForm.get('firstName')}
  get lastName() { return this.registrationForm.get('lastName')}
  get emailAddress() { return this.registrationForm.get('emailAddress')}
  get password() { return this.registrationForm.get('password')}
  get dob() { return this.registrationForm.get('dob')}
  
  private usersCollection: AngularFirestoreCollection<User>;
  users: Observable<User[]>;

  constructor(private fb: FormBuilder, private afs: AngularFirestore) {
    this.usersCollection = afs.collection<User>('users');
    this.users = this.usersCollection.valueChanges();
   }

   registerUser(user: User) {
     console.log('Signup Pressed');
     console.log(user);
    //  console.log(this.registrationForm.value);
    if(this.usersCollection.add(this.registrationForm.value)) {
      firebase.auth().createUserWithEmailAndPassword(this.registrationForm.value.emailAddress, this.registrationForm.value.password)
        .then(function(){
          window.location.href = '../../profile/profile.component.html';
        })
        .catch(function (error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(`${errorCode}, ${errorMessage}`);
      });

      // firebase.auth().currentUser.sendEmailVerification().then(function(){
      //   console.log('Email has been sent for verification');
      // }).catch(function(error){
      //   var errorCode = error.code;
      //   var errorMessage = error.message;
      //   console.log(`{{errorCode}}, {{errorMessage}}`);
      // });
    }
     
   }

  ngOnInit() {
  }

}
