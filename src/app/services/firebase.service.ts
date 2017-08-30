import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Listing } from '../models/listing';
import * as firebase from 'firebase';

@Injectable()
export class FirebaseService {
    listings: FirebaseListObservable<any[]>;
    listing: FirebaseObjectObservable<any>;
    folder: string;
    image: string;
    path: string;

      
    constructor(private af: AngularFireDatabase) {
        this.listings = this.af.list('/listings') as FirebaseListObservable<Listing[]>;
        this.folder = "listingimages";
    };
      
    getListings(){
        return this.listings;
    };
    
    getListingDetails(id:string){
        return this.listing = this.af.object('/listings/' + id) as FirebaseObjectObservable<Listing>;
    };
    
    addListing(listing){
        //Create Root Ref
        let storageRef = firebase.storage().ref();
     
        for(let selectedFile of [(<HTMLInputElement>document.getElementById('image')).files[0]]){
            let path = `/${this.folder}/${selectedFile.name}`;
            let imageRef = storageRef.child(path);
            imageRef.put(selectedFile).then((snapshot) => {
                listing.image = selectedFile.name;
                listing.path = path;
                return this.listings.push(listing);
            });
        }
    };
    
    updateImage(id, listing){
        //Create Root Ref
        let storageRef = firebase.storage().ref();
     
        for(let selectedFile of [(<HTMLInputElement>document.getElementById('image')).files[0]]){
            let path = `/${this.folder}/${selectedFile.name}`;
            let imageRef = storageRef.child(path);
            imageRef.put(selectedFile).then((snapshot) => {
                listing.image = selectedFile.name;
                listing.path = path;
                return this.listings.update(id, listing);
            });
        }
    }
    
    updateListing(id, listing){
        return this.listings.update(id, listing);
    };
    
    deleteListing(id){
        return this.listings.remove(id);
    };
    
}
