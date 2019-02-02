import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';


@Component({
  selector: 'page-location-detail',
  templateUrl: 'location-detail.html',
})
export class LocationDetailPage {

  public location: any = {};
  private isFav : boolean;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private toastController: ToastController) {
  }

  ionViewDidLoad() {
    this.location = this.navParams.data;
    console.log(this.location.images.length)
  }

  toggleFavourite(location){
    if(!this.isFav){
      let toast = this.toastController.create({
        message: `Added ${location.name} to favourites`,
        duration: 2000,
        dismissOnPageChange: true,
        cssClass: 'toast'
      });
      
      toast.present();
    }
    this.isFav = !this.isFav;
  }

}
