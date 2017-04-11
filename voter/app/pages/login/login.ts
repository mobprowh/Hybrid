import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {UserData} from '../../providers/user-data/user-data';
import {SearchPage} from '../search/search';

import {Alert} from 'ionic-angular';

/*
  Generated class for the LoginPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/login/login.html'
})
export class LoginPage {

  loginData: { username?: string, password?: string } = {};
  submitted = false;

  

  constructor(private nav: NavController, private userData: UserData) { 
    //this.docHeight=document.body.clientHeight;
  }

  
/*
  onLogin(form) {
    this.submitted = true;

    if (form.valid) {
      this.userData.login(this.loginData.username);
      this.nav.push(SearchPage);
      this.nav.setRoot(SearchPage);
    }
  }*/
  

  onLogin(form) {
    this.submitted=true;
    
    if(form.valid){
      
      this.userData.login(this.loginData);
      if(this.userData.loginState==true){             //
        this.nav.push(SearchPage);
        this.nav.setRoot(SearchPage);
        //this.userData.storage.remove(this.userData.HAS_LOGGED_IN);
        //this.userData.storage.clear();
      }else{
        this.loginErrorAlert();                
      }

    }
    //this.loginData={};
  }


  loginErrorAlert() {
    let alert=Alert.create({
      title: 'Try again!',
      subTitle: 'Username and Password Incorrect.',
      buttons: [{
        text: 'OK',
        handler: ()=>{
          this.loginData={};
        }
      }]
    });
    this.nav.present(alert);
  }

}
