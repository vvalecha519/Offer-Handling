import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  email : String =  "";

  constructor(private angularFireAuth: AngularFireAuth) {
 }

isAuthenticated(){
  console.log(this.email);
return (!(this.email == ""));
}

/* Sign up */
SignUp(email: string, password: string) {
  this.angularFireAuth
  .createUserWithEmailAndPassword(email, password)
  .then(res => {
  console.log('You are Successfully signed up!', res);
  this.email = email;
  })
  .catch(error => {
  console.log('Something is wrong:', error.message);
  });
  }
  
  /* Sign in */
  async SignIn(email: string, password: string) {
    console.log(email)
  await this.angularFireAuth.signInWithEmailAndPassword(email, password).then(res => {
  console.log('Youre in!');
  this.email = email;
  })
  .catch(err => {
  console.log('Something went wrong:',err.message);
  this.email = "";
  });
  }

  /* Sign out */
  SignOut() {
  this.angularFireAuth.signOut();
  }
 
}


