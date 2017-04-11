import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {UserData} from '../../providers/user-data/user-data';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {DetailPage} from '../detail/detail'

/*
  Generated class for the SearchPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/search/search.html',
})
export class SearchPage {
    //items;
    voters;
    err_code;
    succ_code;
    searchText;
  constructor(private nav: NavController, private userData: UserData, private http: Http) {
    //this.initializeItems();
    this.searchText='';
  }

  getVoters(ev) {

    this.voters=null;
    this.err_code='';
    this.succ_code='';

    //this.http.get('http://104.197.42.140/cc/api/Voter?LastName='+ev.target.value.trim())
    this.http.get('http://104.197.42.140/cc/api/Voter?LastName='+this.searchText.trim())
    //this.http.get('Voter?LastName='+this.searchText.trim())
    .map(res =>res.json())
    .subscribe(data => {
      this.voters=data;
      if(this.voters==''){
        this.succ_code="No Results";
      }  
    },
    error => {
      //this.err_code=error;
      this.err_code="Cannot Connet to Server!";
    } 
    )
  }

  onCancel(ev) {
    this.voters=null;
    this.err_code='';
    this.succ_code='';
    this.searchText='';
  }


  
  openNavDetailsPage(voter) {
    this.nav.push(DetailPage, {voter: voter});
  }

  /*getVoters(ev) {
    this.userData.loadData();
    this.voters=this.userData.posts;
    this.err_code=this.userData.err_code;
    this.succ_code=this.userData.succ_code;
  }*/


  /*  
  initializeItems(){
    this.items=[
        'Tim Kanie',
        'Hillary Clinton',
        'Earl Warren',
        'Mike Pence',
        'Salmon P.Chase',
        'Newt Gingrich',
        'Alexander Hamilton',
        'Ulysses S. Granit',
        'Elise Stefanik',
        'Elizabeth Warren',
        'Sonia Sotomayor',
        'Dianne Feinstein',
        'Marco Rubio',
        'Chelsea Clinton',
        'Calvin Coolidge',
        'Grover Cleveland',
        'Frances Cleveland',
        'Edward Brooke',
        'John Lewis',
        'Cathy McMorris'
    ];
  }
  
  getItems(ev) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the ev target
    var val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }*/

}
