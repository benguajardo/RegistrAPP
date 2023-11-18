import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormregistrarPageRoutingModule } from './formregistrar-routing.module';

import { FormregistrarPage } from './formregistrar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormregistrarPageRoutingModule
  ],
  declarations: [FormregistrarPage]
})
export class FormregistrarPageModule {}
