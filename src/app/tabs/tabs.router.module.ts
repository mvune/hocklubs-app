import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'hocklist',
        loadChildren: '../hocklist/hocklist.module#HocklistPageModule'
      },
      {
        path: 'hockmap',
        loadChildren: '../hockmap/hockmap.module#HockmapPageModule'
      },
      {
        path: '',
        redirectTo: '/tabs/hocklist',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/hocklist',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
