import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: Observable<firebase.User>;


  
  
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private flashMessageService: FlashMessagesService
    ) {
      this.user = afAuth.authState;
    }

  ngOnInit() {
    
  }
 
 login(){
   this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
   console.log(this.afAuth.authState);
   this.flashMessageService.show("You are logged in!!", {cssClass: "alert-success", timeout: 3000});
 };
 
 logout(){
   this.afAuth.auth.signOut();
   this.flashMessageService.show("You have logged out!!", {cssClass: "alert-success", timeout: 3000});
   this.router.navigate(['/']);
 };
  
}
