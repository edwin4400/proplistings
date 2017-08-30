import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-edit-listing',
  templateUrl: './edit-listing.component.html',
  styleUrls: ['./edit-listing.component.css']
})
export class EditListingComponent implements OnInit {
  id: string;
  title: string;
  type: string;
  image: string;
  city: string;
  owner: string;
  bedrooms: number;
  price: string;
  path: string;
  fileChanged: boolean = false;
  
  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessageService: FlashMessagesService
    ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    
    this.firebaseService.getListingDetails(this.id).subscribe((listing) => {
      this.title = listing.title;
      this.type = listing.type;
      this.city = listing.city;
      this.image = listing.image;
      this.owner = listing.owner;
      this.bedrooms = listing.bedrooms;
      this.price = listing.price;
      this.path = listing.path;
      
    });
  };
  
  onFilePicked(){
    var input = <HTMLInputElement>document.getElementById('image'); //<HTMLInputElement> is to cast from HTMLElement into HTMLInputElement, so files[0].name can be accessed
    this.image = input.files[0].name;
    this.fileChanged = true; //new image has been picked/changed
    this.flashMessageService.show("Image filed changed!", {cssClass: "alert-success", timeout: 3000});
  };
  
  
  onEditSubmit(){
    
    let listing = {
    title: this.title,
    type: this.type,
    city: this.city,
    owner: this.owner,
    bedrooms: this.bedrooms,
    price: this.price,
    path: this.path,
    image: this.image
    };
    
    if (!this.fileChanged){
        this.firebaseService.updateListing(this.id, listing);
      } else {
        console.log(listing);
        this.firebaseService.updateImage(this.id, listing);
      };
        this.router.navigate(['/listings']);
        this.flashMessageService.show("Edited success", {cssClass: "alert-success", timeout: 3000});
  };
  
 
}
