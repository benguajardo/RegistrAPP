import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrodocentePageRoutingModule } from './registrodocente-routing.module';

import { RegistrodocentePage } from './registrodocente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrodocentePageRoutingModule
  ],
  declarations: [RegistrodocentePage]
})
export class RegistrodocentePageModule {}
