import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { FlashMessagesModule } from 'angular2-flash-messages';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { EditListingComponent } from './components/edit-listing/edit-listing.component';
import { AddListingComponent } from './components/add-listing/add-listing.component';
import { ListingComponent } from './components/listing/listing.component';
import { ListingsComponent } from './components/listings/listings.component';
import { NavbarComponent } from './components/navbar/navbar.component';


import { FirebaseService } from './services/firebase.service';

const appRoutes: Routes = [
  {path:"", component: HomeComponent},
  {path:"listings", component: ListingsComponent},
  {path:"add-listing", component: AddListingComponent},
  {path:"edit-listing", component: EditListingComponent},
  {path:"listing/:id", component: ListingComponent},
  {path:"edit-listing/:id", component: EditListingComponent},
];

export const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: ""
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EditListingComponent,
    AddListingComponent,
    ListingComponent,
    ListingsComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(firebaseConfig),
    FlashMessagesModule
  ],
  providers: [
    FirebaseService,
    AngularFireDatabase,
    AngularFireAuth,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
