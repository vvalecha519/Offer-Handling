import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../authentication.service';
import { Time } from '@angular/common';

@Component({
  selector: 'app-add-listing-modal',
  templateUrl: './add-listing-modal.component.html',
  styleUrls: ['./add-listing-modal.component.css']
})
export class AddListingModalComponent implements OnInit {

  m_address : String = ''; 
  m_offerDate : String = '';
  m_offerTime : Time = {hours:0, minutes:0};

  constructor(public modalRef: MdbModalRef<AddListingModalComponent>,private auth : AuthenticationService, private  http:HttpClient, ) { }

  ngOnInit(): void {
  }

  addListing(): void {
    console.log("add listing");
    console.log(this.m_offerDate);
    console.log(this.m_offerTime);

    this.http.post(`/api/addproperty/${this.auth.email}`, {address: this.m_address, offerDate: this.m_offerDate, offerTime: this.m_offerTime}).subscribe((res) => {
      console.log("vaibhav");
      //add property to dashboard and close modal
    })
  }

}
