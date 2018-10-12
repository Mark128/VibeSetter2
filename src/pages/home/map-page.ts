import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { BarProvider } from '../../providers/bar/bar';

declare var google;
let marker;

@Component({
  selector: 'map-page',
  templateUrl: 'map-page.html'
})
export class MapPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  bars: any; 
 
  pins = {
    dead: "32dB64",
    busy: "F5613C",
    packed: "F53D3D"
  }

  constructor(public navCtrl: NavController, public geolocation: Geolocation, public barService: BarProvider) {

  }

  ionViewDidLoad(){
    this.bars = this.barService.getBars();
    console.log(`Received ${this.bars.length} bars `)
    this.loadMap();
  }
 
  loadMap(){

    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
    console.log('inside load map')
    this.geolocation.getCurrentPosition(options).then((position) => {
 
    let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
   
    //let latLng = new google.maps.LatLng(43.648410, -79.376470);
    console.log(`lat: ${position.coords.latitude} / long: ${position.coords.longitude}`);
 
    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
 
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    
    this.bars.forEach(bar => {

      let barStatus = bar.status; 
      var pinColor;

      if(barStatus =="packed")
        pinColor = this.pins.packed;
      else if(barStatus == "busy")
        pinColor = this.pins.busy;
      else if(barStatus == "dead")
        pinColor = this.pins.dead;   
     
      var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
      new google.maps.Size(21, 34),
      new google.maps.Point(0,0),
      new google.maps.Point(10, 34));

      var pinShadow = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_shadow",
      new google.maps.Size(40, 37),
      new google.maps.Point(0, 0),
      new google.maps.Point(12, 35));
  
      let latLng = new google.maps.LatLng(bar.lat, bar.long);
      marker = new google.maps.Marker({
        position: latLng,
        animation: google.maps.Animation.DROP,
        icon: pinImage,
        shadow: pinShadow,
        title: bar.name
      });
  
      marker.setMap(this.map);
      
    });  
    }).catch((error) => {
      console.log("Error getting positions", error);
    });
  }
}
