import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { environment } from "src/environments/environment";
import { AngularFireModule } from "@angular/fire/compat";
 import { AngularFirestoreModule } from "@angular/fire/compat/firestore";
 import {HttpClientModule} from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { AddListingModalComponent } from './add-listing-modal/add-listing-modal.component';
import { ListingDetailsComponent } from './listing-details/listing-details.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HomeComponent,
    AddListingModalComponent,
    ListingDetailsComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MdbModalModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
