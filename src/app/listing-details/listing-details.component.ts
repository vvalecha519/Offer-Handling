import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-listing-details',
  templateUrl: './listing-details.component.html',
  styleUrls: ['./listing-details.component.css']
})
export class ListingDetailsComponent implements OnInit {

  constructor(public modalRef: MdbModalRef<ListingDetailsComponent>) { }

  ngOnInit(): void {
    //make request to backend for the listing
  }

}
