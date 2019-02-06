import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HockdetailPage } from './hockdetail.page';

const routes: Routes = [
  {
    path: '',
    component: HockdetailPage
  },
  {
    path: ':id',
    component: HockdetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HockdetailPage]
})
export class HockdetailPageModule {}
