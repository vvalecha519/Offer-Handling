import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private angularFireAuth: AngularFireAuth) {
 }

/* Sign up */
SignUp(email: string, password: string) {
  this.angularFireAuth
  .createUserWithEmailAndPassword(email, password)
  .then(res => {
  console.log('You are Successfully signed up!', res);
  })
  .catch(error => {
  console.log('Something is wrong:', error.message);
  });
  }
  
  /* Sign in */
  SignIn(email: string, password: string) {
  this.angularFireAuth.signInWithEmailAndPassword(email, password).then(res => {
  console.log('Youre in!');
  })
  .catch(err => {
  console.log('Something went wrong:',err.message);
  });
  }
  
  /* Sign out */
  SignOut() {
  this.angularFireAuth.signOut();
  }
 
}


