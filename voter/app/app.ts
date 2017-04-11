import {Component} from '@angular/core';
import {Platform, ionicBootstrap} from 'ionic-angular';
import {Splashscreen, StatusBar} from 'ionic-native';
import {HomePage} from './pages/home/home';
import {LoginPage} from './pages/login/login';
import {SearchPage} from './pages/search/search';
import {SignupPage} from './pages/signup/signup';
import {DetailPage} from './pages/detail/detail';

import {UserData} from './providers/user-data/user-data';

import {Keyboard} from 'ionic-native';

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class MyApp {
  //rootPage: any = HomePage;
  rootPage: any = LoginPage;
  //rootPage: any = SearchPage;
  //rootPage: any = SignupPage;
  //rootPage: any= DetailPage;
  //rootPage:any;


  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      /*
      setTimeout(function() {
        Splashscreen.hide();
      }, 3000);
      */
      //Splashscreen.hide();
      this.hideSplashScreen();    

    });

    /*

    if (user_data.HAS_LOGGED_IN) {
      this.rootPage=SearchPage;
    }else{
      this.rootPage=LoginPage;
    }

    */
  }

  hideSplashScreen() {
    if(Splashscreen) {
      setTimeout( ()=>{
        Splashscreen.hide();
      } , 100);
    }
  }
}

ionicBootstrap(MyApp, [UserData]);
