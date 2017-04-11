import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import {Keyboard} from 'ionic-native';
import {Content, Alert} from 'ionic-angular';
import { ViewChild } from '@angular/core';

import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the DetailPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/



@Component({
  templateUrl: 'build/pages/detail/detail.html',
})
export class DetailPage {

  info:string="votingRecord";

  voter: any;

  old: any;
  icon: any;

  connections: string = 'Connections';
  //socialInput:string;
  hideTwitter: boolean;
  hideInstagram: boolean;
  hideFacebook: boolean;

  //voterDetails = [];

  voterDetails = [{
    PhoneNo: "",
    Email: "",
    Twitter: "",
    Facebook: "",
    Ig: "",
    PreferedWay: "",
    ExternalId: "",
    VoterId: 0,
    Photo: null
  }]



  /*

  phoneno:any='';
  mail:any='';
  fb:any='';
  ig:any='';
  tw:any='';
  pw:any='';*/


  @ViewChild(Content) content: Content;

  constructor(private nav: NavController, params: NavParams, private http: Http) {

    this.voter = params.data.voter;
    this.getOld(this.voter.YOB);
    this.getIcon(this.voter.Gender);
    //this.socialInput='';
    this.hideTwitter = true;
    this.hideInstagram = true;
    this.hideFacebook = true;



    this.http.get('http://104.197.42.140/cc/api/Voter?VoterId=' + this.voter.VoterId)
    //this.http.get('Voter?VoterId=' + this.voter.VoterId)
      .map(res => res.json())
      .subscribe(data => {
        this.voterDetails = data;
        if (data == "") {

          this.voterDetails = [{
            PhoneNo: "",
            Email: "",
            Twitter: "",
            Facebook: "",
            Ig: "",
            PreferedWay: "",
            ExternalId: "",
            VoterId: 0,
            Photo: null
          }]

        }
      },
      error => {

      }
      );



  }


  getOld(birthday) {
    this.old = (Date.now() / 31556926000 + 1970 - birthday).toString().substring(0, 2);
  }

  getIcon(gender) {
    if (gender == "M") {
      //this.icon="https://cdn4.iconfinder.com/data/icons/free-social-media-icons/256/User.png";
      this.icon = "img/male.png";
    }
    else {
      //this.icon="http://www.freeiconspng.com/uploads/female-icon-23.png";
      this.icon = "img/female.png";
    }
  }

  scrollTo() {
    this.content.scrollTo(0, 700, 200);
  }

  twitter() {
    this.hideTwitter = false;
    //Keyboard.show();
    this.content.scrollTo(0, 700, 200);
    this.hideInstagram = true;
    this.hideFacebook = true;
    this.connections = 'Twitter';
  }

  instagram() {
    this.hideInstagram = false;
    //Keyboard.show();
    this.content.scrollTo(0, 700, 200);
    this.hideTwitter = true;
    this.hideFacebook = true;
    this.connections = 'Instagram';

  }

  facebook() {
    this.hideFacebook = false;
    //Keyboard.show();
    this.content.scrollTo(0, 700, 200);
    this.hideTwitter = true;
    this.hideInstagram = true;
    this.connections = 'Facebook';
  }

  formPost() {
    var creds = "email=" + this.voterDetails[0].Email + "&phoneno=" + this.voterDetails[0].PhoneNo + "&tw=" + this.voterDetails[0].Twitter + "&fb=" + this.voterDetails[0].Facebook + "&ig=" + this.voterDetails[0].Ig + "&pw=" + this.voterDetails[0].PreferedWay;
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    //var url="http://104.197.42.140/cc/api/Voter?VoterId=38539";
    var url = "http://104.197.42.140/cc/api/Voter?VoterId=" + this.voter.VoterId;
    //var url = "Voter?VoterId=" + this.voter.VoterId;

    this.http.post(url, creds, { headers: headers })
      .map(res => res.json())
      .subscribe(data => {
        //this.posts=data;
        //this.succ_code="Success";
      },
      error => {
        //this.err_code=error;
        //console.log("Oops!");      
      }
      );

    this.saveAlert();

  }

  saveAlert() {
    let alert = Alert.create({
      title: 'Congratulations',
      subTitle: 'Your Information Saved Successfully!',
      buttons: [{
        text: 'OK',
        handler: () => {

        }
      }]
    });
    this.nav.present(alert);
  }

  selectedRecord() {

  }

  selectedInfo() {

  }

}
