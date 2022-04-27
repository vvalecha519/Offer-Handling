import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { AuthenticationService } from '../authentication.service';
import { Subscriber } from '../interfaces/subscriber';
import {saveAs} from 'file-saver';

@Component({
  selector: 'app-listing-details',
  templateUrl: './listing-details.component.html',
  styleUrls: ['./listing-details.component.css']
})
export class ListingDetailsComponent implements OnInit {

m_subscriber: Subscriber[] = new Array();
m_listingId: string | null = null;

  constructor(public modalRef: MdbModalRef<ListingDetailsComponent>, private auth : AuthenticationService, private  http:HttpClient) { 
    console.log(this.m_listingId);
  }

  ngOnInit(): void {
    console.log(this.m_listingId);
    this.http.get<Subscriber[]>(`/api/properties/users/${this.auth.email}/${this.m_listingId}`).subscribe((res) => {
      console.log(res);
      this.m_subscriber = res; 
  })
    //make request to backend for the listing
  }

  downloadPdf(fileName: string): void {
    console.log(fileName);
    this.http.get(`/api/offer/${fileName}`, {responseType:'blob'}).subscribe((res) => {
      console.log('worked!');
      let downloadURL = window.URL.createObjectURL(res);
    saveAs(downloadURL);
  })
  }

  downloadAll(){
    if(confirm("Are you sure to delete ")) {
      console.log("Implement delete functionality here");

    this.http.get(`/api/downloadAll/${this.auth.email}/${this.m_listingId}`, {responseType:'blob'}).subscribe((res) => {
      console.log('worked!');
      let downloadURL = window.URL.createObjectURL(res);
    saveAs(downloadURL);
  })
    }
  }

}
