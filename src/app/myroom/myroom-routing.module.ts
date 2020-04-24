import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyroomPage } from './myroom.page';

const routes: Routes = [
  {
    path: '',
    component: MyroomPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyroomPageRoutingModule {}
