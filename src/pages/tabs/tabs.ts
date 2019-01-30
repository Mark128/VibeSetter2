import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { MapPage } from '../Map/map-page';
import { AgmPage } from '../agm/agm';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = MapPage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;
  tab4Root = AgmPage;

  constructor() {

  }
}
