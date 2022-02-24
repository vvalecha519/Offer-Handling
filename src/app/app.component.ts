import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'drop-off';
    formData = new FormData();
  doesSignIn = true;
  doesSignUp = false;
  doesSubmitGuest = false;
  sucredentials = {username: '', password: ''};
  sicredentials = {username: '', password: ''};
  sgListEmail = "";
  sgCode = "";
  sgBuyEmail = "";


constructor(private auth: AuthenticationService, private  http:HttpClient){

}

  ngOnInit(): void {
  }

  submitGuest(){
  this.doesSignIn = false;
  this.doesSignUp = false;
  this.doesSubmitGuest = true;
  
  }
  signIn(){
  this.doesSignIn = true;
  this.doesSignUp = false;
  this.doesSubmitGuest = false;
  }

  signUp(){
  this.doesSignIn = false;
  this.doesSignUp = true;
  this.doesSubmitGuest = false;
  }

  onFileChange(event:any) {
    console.log("FILE UPLOADED");
    this.formData.delete("file");
    this.formData.append("file", event.target.files[0]);
    console.log(this.formData);
  }

  submitGuestButton(){
    console.log("submit Guest Button");
    this.formData.append("code", this.sgCode);
    this.formData.append("listEmail", this.sgListEmail);
    this.formData.append("buyEmail", this.sgBuyEmail);
    this.http.post('/api/upload', this.formData).subscribe((res) => {
      console.log(res);
      alert('Uploaded Successfully.');
    })

    this.formData.delete("code");
    this.formData.delete("buyEmail");
    this.formData.delete("listEmail");
  }

  logInButton(){
    console.log(this.sicredentials.username)
    console.log(this.sicredentials.password)
    this.auth.SignIn(this.sicredentials.username, this.sicredentials.password)
  }

  createAccountButton(){
    console.log(this.sucredentials.username);  
    console.log(this.sucredentials.password);
    console.log("sign up button")
    this.auth.SignUp(this.sucredentials.username, this.sucredentials.password)
    //send sign to backend to add to database and send email notification that added

  }

}

