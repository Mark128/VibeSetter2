import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-location-detail',
  templateUrl: 'location-detail.html',
})
export class LocationDetailPage {

  public location: any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.location = this.navParams.data;
    console.log(this.location)
  }

  toggleFavourite(){
    
  }

}
