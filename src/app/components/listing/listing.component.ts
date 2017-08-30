import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Listing } from '../../models/listing';
import * as firebase from 'firebase';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {
  id:string;
  listing: Listing;
  imageUrl: string;
  
  constructor(
    private firebaseService: FirebaseService,
    private flashMessageService: FlashMessagesService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit() {
    //Get id
    this.id = this.route.snapshot.params['id'];
    
    this.firebaseService.getListingDetails(this.id).subscribe(listing =>{
      this.listing = listing;
      
      let storageRef = firebase.storage().ref();
      let spaceRef = storageRef.child(listing.path);
      spaceRef.getDownloadURL().then((url) => {
        //set imageUrl
        this.imageUrl = url;
      }).catch((err) => {
        console.log(err);
      })
    });
  };
  
   onDelete(){
    this.firebaseService.deleteListing(this.id);
    this.flashMessageService.show("Listing deleted", {cssClass: "alert-danger", timeout: 3000});
    this.router.navigate(['/listings']);
  }

}
