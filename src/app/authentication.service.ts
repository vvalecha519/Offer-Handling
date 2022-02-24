import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  userData: (Observable<firebase.User> | null);

  constructor(private angularFireAuth: AngularFireAuth) {
 this.userData = angularFireAuth.authState;
 }

/* Sign up */
SignUp(email: string, password: string) {
  this.angularFireAuth
  .auth
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
  this.angularFireAuth.auth.signInWithEmailAndPassword(email, password).then(res => {
  console.log('Youre in!');
  })
  .catch(err => {
  console.log('Something went wrong:',err.message);
  });
  }
  
  /* Sign out */
  SignOut() {
  this.angularFireAuth
  .auth
  .signOut();
  }
 
}


