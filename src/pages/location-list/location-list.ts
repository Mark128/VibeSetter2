import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { LocationService } from '../../providers/location/location';
import { LocationDetailPage } from '../location-detail/location-detail';
import * as _ from 'lodash';


@Component({
  selector: 'page-location-list',
  templateUrl: 'location-list.html',
})
export class LocationListPage {

  public locations: any  = [];
  public searchTerm: string = '';

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private locationService: LocationService,
    private loadingController: LoadingController) {
  }

  ionViewDidLoad() {
     let loader = this.loadingController.create({
       content: 'Getting Bars',
       dismissOnPageChange: true
     });

     loader.present();
     this.locationService.getLocations().subscribe((response) => {
       
      this.locations = this.locationService.applyHaversine(response);

      this.locations.sort((locationA, locationB) => {
        return locationA.distance - locationB.distance;
      });      
   }); 
  }

  goToDetailPage(location){
    this.navCtrl.push(LocationDetailPage, location);
  }

}
