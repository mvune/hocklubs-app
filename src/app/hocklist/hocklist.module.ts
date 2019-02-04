import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HocklistPage } from './hocklist.page';
import { HockdetailComponent } from './hockdetail/hockdetail.component';

const routes: Routes = [
  {
    path: '',
    component: HocklistPage
  },
  {
    path: ':id',
    component: HockdetailComponent
  }
];

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HocklistPage, HockdetailComponent]
})
export class HocklistPageModule {}
