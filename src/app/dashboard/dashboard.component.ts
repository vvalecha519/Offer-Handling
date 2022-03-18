import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { HttpClient } from '@angular/common/http';
import { Property } from '../interfaces/property';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private auth : AuthenticationService, private  http:HttpClient,) { }
  properties: Property[] = new Array()
  ngOnInit(): void {
    console.log(this.auth.email);

this.http.post('/api/upload', "asd").subscribe((res) => {
    console.log(res);
    alert('Uploaded Successfully.');
  })

      this.http.get<Property[]>(`/api/properties/users/${this.auth.email}`).subscribe((res) => {
    console.log(res);
    this.properties = res;
    console.log(this.properties)

    //figure out how to put into properties
    alert('Uploaded Successfully.');
  })


}

}
