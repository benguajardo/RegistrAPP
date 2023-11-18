import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormregistrarPage } from './formregistrar.page';

const routes: Routes = [
  {
    path: '',
    component: FormregistrarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormregistrarPageRoutingModule {}
