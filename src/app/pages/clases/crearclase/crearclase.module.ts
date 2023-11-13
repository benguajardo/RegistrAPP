import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearclasePageRoutingModule } from './crearclase-routing.module';

import { CrearclasePage } from './crearclase.page';

import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearclasePageRoutingModule,
    TranslateModule
  ],
  declarations: [CrearclasePage]
})
export class CrearclasePageModule {}
