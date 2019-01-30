import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LocationService } from '../../providers/location/location';
import { LocationDetailPage } from '../location-detail/location-detail';


@Component({
  selector: 'page-location-list',
  templateUrl: 'location-list.html',
})
export class LocationListPage {

  public locations: any  = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private locationService: LocationService) {
  }

  ionViewDidLoad() {
     //When the app loads, get all the locations from the location service and then load the map
     this.locationService.getLocations().subscribe((response) => {
      this.locations = response;
   }); 
  }

  goToDetailPage(location){
    this.navCtrl.push(LocationDetailPage, location);
  }

}
