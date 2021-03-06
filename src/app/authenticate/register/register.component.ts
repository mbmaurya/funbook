import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AppRoutingModule } from '../../app-routing.module';

import { environment } from '../../../environments/environment'
import { Observable } from 'rxjs';
import * as firebase from 'firebase';

declare let $:any;

export interface User {
  firstName: string;
  lastName: string;
  emailAddress: string;
  password: string;
  gender: string;
  dob: Date;
}

// let registartionResponse;

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

  constructor(private fb: FormBuilder, private afs: AngularFirestore, public router: Router) {
    this.usersCollection = afs.collection<User>('users');
    this.users = this.usersCollection.valueChanges();
   }

   registerUser(user: User) {
     console.log('Signup Pressed');
    if(this.usersCollection.add(this.registrationForm.value)) {
      firebase.auth().createUserWithEmailAndPassword(this.registrationForm.value.emailAddress, this.registrationForm.value.password)
        .then(function(){
          console.log('User registered successfully');
          alert('Registration successful. Please login with your credentials');          
        })
        .catch(function (error,) {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(`${errorCode}, ${errorMessage}`);
          alert(`${errorMessage}`);          
      });
      this.registrationForm.reset();
    }
   }

  ngOnInit() {
  }

}
