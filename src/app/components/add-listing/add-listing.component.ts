import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-add-listing',
  templateUrl: './add-listing.component.html',
  styleUrls: ['./add-listing.component.css']
})
export class AddListingComponent implements OnInit {
  title: string;
  type: string;
  image: string;
  city: string;
  owner: string;
  bedrooms: number;
  price: string;
  
  constructor(
    private firebaseService: FirebaseService,
    private flashMessageService: FlashMessagesService,
    private router: Router
    ) { }

  ngOnInit() {
  }
  
  onAddSubmit(){
    let listing = {
    title: this.title,
    type: this.type,
    image: this.image,
    city: this.city,
    owner: this.owner,
    bedrooms: this.bedrooms,
    price: this.price
    };
    
    this.firebaseService.addListing(listing);
    this.flashMessageService.show("New listing added!!", {cssClass: "alert-success", timeout: 3000});
    this.router.navigate(['/listings']);
  }

}
