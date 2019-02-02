import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { LocationService } from '../../providers/location/location';
import { LocationDetailPage } from '../location-detail/location-detail';

@Component({
  selector: 'page-agm',
  templateUrl: 'agm.html',
})
export class AgmPage {

  public myPosition: any = {};
  public locations:  any = []; 
  public mapZoom = 14; 
 
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public platform : Platform,
    public geolocation: Geolocation,
    public locationService: LocationService ) {
  }

  ionViewDidLoad() {  
    //When the app loads, get all the locations from the location service and then load the map
    this.locationService.getLocations().subscribe((response) => {
       this.locations = response;
    }); 

    this.getMyPosition();
    this.getLocations();
  }

  async getMyPosition(){
    await this.platform.ready();
    this.geolocation.getCurrentPosition().then((position) => {
      this.myPosition ={
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
    });
  }

  getLocations() {
  
  }

  markerClicked($event, location){
    this.navCtrl.push(LocationDetailPage, location);
  }

}
