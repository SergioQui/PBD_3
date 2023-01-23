import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabGeneralPage } from './tab-general';

@NgModule({
  declarations: [
    TabGeneralPage,
  ],
  imports: [
    IonicPageModule.forChild(TabGeneralPage),
  ]
})
export class TabGeneralPageModule {}
