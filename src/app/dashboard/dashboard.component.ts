import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private auth : AuthenticationService, private  http:HttpClient,) { }
  properties:any;
  ngOnInit(): void {
    console.log(this.auth.email);

this.http.post('/api/upload', "asd").subscribe((res) => {
    console.log(res);
    alert('Uploaded Successfully.');
  })

      this.http.get(`/api/properties/users/${this.auth.email}`).subscribe((res) => {
    console.log(res);
    //figure out how to put into properties
    alert('Uploaded Successfully.');
  })


}

}
