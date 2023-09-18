import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClasesPage } from './clases.page';

const routes: Routes = [
  {
    path: '',
    component: ClasesPage
  },
  {
    path: 'crearclase',
    loadChildren: () => import('./crearclase/crearclase.module').then( m => m.CrearclasePageModule)
  },
  {
    path: 'asistencia/:id',
    loadChildren: () => import('./asistencia/asistencia.module').then( m => m.AsistenciaPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClasesPageRoutingModule {}
