import {Component, ViewChild} from '@angular/core';
import {Platform, ionicBootstrap, Nav} from 'ionic-angular';
import {StatusBar} from 'ionic-native';

import {SearchPage} from './pages/search/search';
import {SettingsPage} from './pages/setting/setting';
import {ContactusPage} from './pages/contactus/contactus';
import {PhotoPage} from './pages/photo/photo';
import {BmapPage} from './pages/bmap/bmap';
import {GmapPage} from './pages/gmap/gmap';
import {GlocationPage} from './pages/glocation/glocation';
import {BglocationPage} from './pages/bglocation/bglocation';
import {BleprinterPage} from './pages/bleprinter/bleprinter';
import {BtprinterPage} from './pages/btprinter/btprinter';
import {BtscalePage} from './pages/btscale/btscale';

@Component({
  templateUrl: 'build/app.html',
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = BtscalePage;
  pages: Array<{ title: string, component: any }>;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();

    });

    this.pages = [
      { title: 'Search', component: SearchPage },
      { title: 'Settings', component: SettingsPage },
      { title: 'Contact Us', component: ContactusPage },
      { title: 'Take Picture', component: PhotoPage },
      { title: 'BaiduMap', component: BmapPage },
      { title: 'GoogleMap', component: GmapPage },
      { title: 'Google Location', component: GlocationPage },
      { title: 'BLE Printer', component: BleprinterPage },
      { title: 'BT Printer', component: BtprinterPage },
      { title: 'BT Scale', component: BtscalePage }
    ];
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}

ionicBootstrap(MyApp);
