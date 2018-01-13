import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RestApiProvider } from '../../providers/rest-api/rest-api';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
data: any;
users: string[];
errorMessage: string;
page = 1;
perPage = 0;
totalData = 0;
totalPage = 0;
  constructor(public navCtrl: NavController, public restApi: RestApiProvider) {
  	this.getCampaigns();
  }

getCampaigns() {
  this.restApi.getCampaigns(this.page)
     .subscribe(
       res => {
         this.data = res;
         this.users = this.data.data;
         this.perPage = 3;
         this.totalData = this.data.total;
         this.totalPage = this.data.total/3;
       },
       error =>  this.errorMessage = <any>error);
}

doInfinite(infiniteScroll) {
	console.log("here");
  this.page = this.page+1;
  setTimeout(() => {
    this.restApi.getCampaigns(this.page)
       .subscribe(
         res => {
           this.data = res;
           this.perPage = this.data.per_page;
           this.totalData = this.data.total;
           this.totalPage = this.data.total/3;
           for(let i=0; i<this.data.data.length; i++) {
             this.users.push(this.data.data[i]);
           }
         },
         error =>  this.errorMessage = <any>error);

    console.log('Async operation has ended');
    infiniteScroll.complete();
  }, 1000);
}
}
