import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Events, LocalStorage, Storage} from 'ionic-angular'

/*
  Generated class for the UserData provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UserData {

  //data: any;
  HAS_LOGGED_IN='hasLoggedIn';
  storage=new Storage(LocalStorage);

  posts: any;
  succ_code: any;
  err_code: any;

  USER_NANE="adel";
  PASSWORD="adel";

  loginState:boolean;

  constructor(private http: Http) {
    //this.data = null;
    //this.posts=null;
  }

  loadData() {
    this.http.get('http://104.197.42.140/cc/api/Voter?LastNameLastName=ALI')
    .map(res => res.json())
    .subscribe(data => {
      this.posts=data;
      this.succ_code="Success";
    },
    error =>{
      this.err_code=error;
    }
    )
  }
  

/*
  load() {
    if (this.data) {
      // already loaded data
      return Promise.resolve(this.data);
    }

    // don't have the data yet
    return new Promise(resolve => {
      // We're using Angular Http provider to request the data,
      // then on the response it'll map the JSON data to a parsed JS object.
      // Next we process the data and resolve the promise with the new data.
      this.http.get('path/to/data.json')
        .map(res => res.json())
        .subscribe(data => {
          // we've got back the raw data, now generate the core schedule data
          // and save the data for later reference
          this.data = data;
          resolve(this.data);
        });
    });
  }
  */

  
/*
  login(username) {
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.storage.set('username', username);
  }

  */

  login(loginData) {

    //this.storage.remove(this.HAS_LOGGED_IN);
    //this.storage.clear();

    /*

    if(loginData.username.trim().toLowerCase()==this.USER_NANE && loginData.password.trim().toLowerCase()==this.PASSWORD){
      //this.storage.set(this.HAS_LOGGED_IN, true);  
      this.loginState=true;  
    }else{
      this.loginState=false;
    }
    */
    this.loginState=true; 

  }

}

