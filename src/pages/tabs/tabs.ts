import { Component } from '@angular/core';
import { LocationListPage } from '../location-list/location-list';
import { ProfilePage } from '../profile/profile';
import { MapPage } from '../Map/map-page';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = MapPage;
  tab2Root = LocationListPage;
  tab3Root = ProfilePage;
 // tab4Root = MapPage;

  constructor() {

  }
}
