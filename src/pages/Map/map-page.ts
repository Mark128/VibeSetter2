import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { LocationService } from '../../providers/location/location';

declare var google;
var markers = [];

const  pins = {
  dead: "32dB64",
  busy: "F5613C",
  packed: "F53D3D"
};

@Component({
  selector: 'map-page',
  templateUrl: 'map-page.html'
})
export class MapPage {

  @ViewChild('map') mapElement: ElementRef;
  map;
  locations : any = [];
    
  showMap = false;

  constructor(
    public navCtrl: NavController, 
    public geolocation: Geolocation, 
    public locationService: LocationService, 
    public platform : Platform) {

  }

  ionViewDidLoad(){

    //When the app loads, get all the locations from the location service and then load the map
    this.locationService.getLocations().subscribe((response) => {
      this.locations = response;
    });   

    this.loadMap();
  } 

  loadMap(){
    //Geolocation options
    var options = {
      timeout: 10000, 
      enableHighAccuracy: true, 
      maximumAge: 3600
    };

    //When the platform is ready, find the user and populate the map with locations
    this.platform.ready().then(() => {
      this.geolocation.getCurrentPosition(options).then((position) => {
  
      //get current position of user
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    
      //let latLng = new google.maps.LatLng(43.648410, -79.376470);
      console.log(`lat: ${position.coords.latitude} / long: ${position.coords.longitude}`);
  
      //Google maps options
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }      
  
      //Set the map
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      
      //For every location in our array
      this.locations.forEach(location => {

        //Set the pin color/icon according to how busy it is
        let locationStatus = location.status; 
        var pinImage = this.setPinColor(locationStatus);

        //Set the marker
        let latLng = new google.maps.LatLng(location.lat, location.long);

        //Create a new info window for each location
        var locationInfowindow = new google.maps.InfoWindow({
          content: location.name
        });

        //Create a new map marker for each location
        let marker = new google.maps.Marker({
          position: latLng,
          animation: google.maps.Animation.DROP,
          icon: pinImage,
          title: location.name,
          map: this.map,
          infowindow: locationInfowindow
        });

        markers.push(marker);

        google.maps.event.addListener(marker, 'click', function() {

          if((this.markers !== undefined) || (this.markers !== null))
            hideAllInfoWindows(this.map);
    
          this.infowindow.open(this.map, this);
        });        
      });  
      }).catch((error) => {
        console.log("Error getting positions - GeoLocation", error);
      });
    }).catch(() => {
      console.log("error getting location -- OnDeviceReady()")
    });
  }

  setPinColor(locationStatus) {
    let pinColor;

    if(locationStatus =="packed")
      pinColor = pins.packed;
    else if(locationStatus == "busy")
        pinColor = pins.busy;
    else if(locationStatus == "dead")
        pinColor = pins.dead;   

    var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
    new google.maps.Size(21, 34),
    new google.maps.Point(0,0),
    new google.maps.Point(10, 34));    

    return pinImage;
  }  
}

function hideAllInfoWindows(map) {     
  markers.forEach(function(marker) {
    marker.infowindow.close(map, marker);
  });       
}
