import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClasesPageRoutingModule } from './clases-routing.module';

import { ClasesPage } from './clases.page';
import { ClasecardComponent } from 'src/app/components/clasecard/clasecard.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClasesPageRoutingModule
  ],
  declarations: [ClasesPage, ClasecardComponent]
})
export class ClasesPageModule {}
