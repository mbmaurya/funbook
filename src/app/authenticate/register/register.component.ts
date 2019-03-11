import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

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
  

  registerUser() {
    console.log('Sign Up pressed');
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

}
