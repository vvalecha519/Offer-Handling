import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { HttpClient } from '@angular/common/http';
import { Property } from '../interfaces/property';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { AddListingModalComponent } from '../add-listing-modal/add-listing-modal.component';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  properties: Property[] = new Array()
  modalRef: MdbModalRef<AddListingModalComponent> | null = null;

  constructor(private auth : AuthenticationService, private  http:HttpClient,private modalService: MdbModalService) { 
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
  ngOnInit(): void {
}

openModal() {
    this.modalRef = this.modalService.open(AddListingModalComponent)
  }

}
