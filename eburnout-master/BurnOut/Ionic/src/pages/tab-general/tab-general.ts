import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Tabs, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-tab-general',
  templateUrl: 'tab-general.html'
})
export class TabGeneralPage {

  @ViewChild('tab') tabRef: Tabs;
  primeraVez: boolean;

  dashboardRoot = 'DashboardPage';
  encuestaRoot = 'EncuestaPage';
  camaraRoot = 'CamaraPage';
  recomendacionRoot = 'RecomendacionPage';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.primeraVez = this.navParams.get('primeraVez');
  }

  ionViewDidEnter() {
    this.primeraVez ? this.tabRef.select(1) : this.tabRef.select(0);
  }

}
