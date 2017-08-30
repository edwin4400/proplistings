import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: Observable<firebase.User>

  
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
   this.flashMessageService.show("You are logged in!!", {cssClass: "alert-success", timeout: 3000});
 };
}
