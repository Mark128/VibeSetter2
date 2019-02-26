import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { LocationService } from '../../providers/location/location';
import { LocationDetailPage } from '../location-detail/location-detail';

@Component({
  selector: 'map-page',
  templateUrl: 'map-page.html',
})
export class MapPage {

  public locations:  any = []; 
  public myPosition: any = {};
  public nearbyLocations: any = [];
  public mapZoom = 14; 
 
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public platform : Platform,
    public geolocation: Geolocation,
    public locationService: LocationService ) {
  }

  ionViewDidLoad() {  
    //Get user's position as well as other location data
    this.getPositions();   
  }

  async getPositions(){
    await this.platform.ready();
    this.geolocation.getCurrentPosition().then((position) => {

      this.myPosition ={
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };  

      this.locationService.currentUserLocation = this.myPosition;
      this.getLocations();   
    });   
  }

  getLocations() {   
    //receive locations
    this.locationService.getLocations().subscribe((response) => {

      //set distance from user to each location
      this.locations = this.locationService.applyHaversine(response);

      //filter the locations for ones within search radius and place inside nearbyLocations array
      this.nearbyLocations = this.locations.filter((loc)=>{        
        return loc.distance < 20;
      });

      this.nearbyLocations.forEach(location => {
        if(location.status === 'busy'){
          location.icon = "./assets/imgs/bar_busy.png";
        } else if(location.status === 'buzzing'){
          location.icon = "./assets/imgs/bar_buzzing.png";
        } else if(location.status === 'packed'){
          location.icon = "./assets/imgs/bar_packed.png";
        } else {
          location.icon = "./assets/imgs/bar_dead.png";
        }
      });
    }); 
  }

  markerClicked(location){
    this.navCtrl.push(LocationDetailPage, location);
  }

  
}
