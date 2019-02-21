import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HockmapPage } from './hockmap.page';

const routes: Routes = [
  {
    path: '',
    component: HockmapPage
  },
  {
    path: ':id',
    component: HockmapPage
  }
];

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HockmapPage]
})
export class HockmapPageModule {}
