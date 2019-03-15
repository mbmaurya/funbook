import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
    emailAddress: ['', [Validators.required, Validators.email]],
    password: ['', Validators.minLength(8)]
  })

  get emailAddress() { return this.loginForm.get('emailAddress')}
  get password() { return this.loginForm.get('password')}

  constructor(private fb: FormBuilder, private router: Router, private afs: AngularFirestore) { }

  loginUser() {
    console.log(this.loginForm.value);
    firebase.auth().signInWithEmailAndPassword(this.loginForm.value.emailAddress, this.loginForm.value.password)
    .then(() => {
      console.log('Logged in successfully');
      this.router.navigate(['/profile'])
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(`${errorCode}, ${errorMessage}`);
    });
  }

  ngOnInit() {
  }

}
