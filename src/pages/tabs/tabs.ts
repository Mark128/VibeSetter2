import { Component } from '@angular/core';
import { MapPage } from '../Map/map-page';
import { AgmPage } from '../agm/agm';
import { LocationListPage } from '../location-list/location-list';
import { ProfilePage } from '../profile/profile';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = AgmPage;
  tab2Root = LocationListPage;
  tab3Root = ProfilePage;
  tab4Root = MapPage;

  constructor() {

  }
}
