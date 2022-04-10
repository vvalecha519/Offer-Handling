import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { HttpClient } from '@angular/common/http';
import { Property } from '../interfaces/property';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { AddListingModalComponent } from '../add-listing-modal/add-listing-modal.component';
import { ListingDetailsComponent } from '../listing-details/listing-details.component';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  properties: Property[] = new Array()
  modalRef: MdbModalRef<AddListingModalComponent> | null = null;
  listingModalRef: MdbModalRef<ListingDetailsComponent> | null = null;


  constructor(private auth : AuthenticationService, private  http:HttpClient,private modalService: MdbModalService) { 
    console.log(this.auth.email);


      this.http.get<Property[]>(`/api/properties/users/${this.auth.email}`).subscribe((res) => {
    this.properties = res;
    console.log(this.properties)
    console.log(this.properties[0].date.toDateString)
  })
  }
  ngOnInit(): void {
}

openModal() {
    this.modalRef = this.modalService.open(AddListingModalComponent)
  }

  openPropertyDetails(p: Property){
  this.listingModalRef = this.modalService.open(ListingDetailsComponent, {
      data: { m_listingId: p.id },
    });
  }
}
