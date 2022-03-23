import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-add-listing-modal',
  templateUrl: './add-listing-modal.component.html',
  styleUrls: ['./add-listing-modal.component.css']
})
export class AddListingModalComponent implements OnInit {

  m_address : String = ''; 
  m_offerDate : String = '';

  constructor(public modalRef: MdbModalRef<AddListingModalComponent>) { }

  ngOnInit(): void {
  }

}