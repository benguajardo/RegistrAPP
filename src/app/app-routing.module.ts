import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'loading',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'loading',
    loadChildren: () => import('./pages/loading/loading.module').then( m => m.LoadingPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'recuperar',
    loadChildren: () => import('./pages/recuperar/recuperar.module').then( m => m.RecuperarPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'listado',
    loadChildren: () => import('./pages/listado/listado.module').then( m => m.ListadoPageModule)
  },
  {
    path: 'clases',
    children: [
      {
        path: "",
        loadChildren: () => import('./pages/clases/clases.module').then( m => m.ClasesPageModule)
      },
      {
        path: ":id",
        loadChildren: () => import('./pages/clases/scanner/scanner.module').then( m => m.ScannerPageModule)
      }
    ]
  },
  {
    path: 'apiHome',
    loadChildren: () => import('./pages/api/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'apiList',
    loadChildren: () => import('./pages/api/list/list.module').then( m => m.ListPageModule)
  },
  {
    path: 'apiAdd',
    loadChildren: () => import('./pages/api/add/add.module').then( m => m.AddPageModule)
  },
  {
    path: 'apiUpdate/:id',
    loadChildren: () => import('./pages/api/update/update.module').then( m => m.UpdatePageModule)
  },
  {
    path: 'apiDelete/:id',
    loadChildren: () => import('./pages/api/delete/delete.module').then( m => m.DeletePageModule)
  },
  {
    path: 'apiDetail/:id',
    loadChildren: () => import('./pages/api/detail/detail.module').then( m => m.DetailPageModule)
  },
  {
    path: 'terms',
    loadChildren: () => import('./pages/terms/terms.module').then( m => m.TermsPageModule)
  },  {
    path: 'config',
    loadChildren: () => import('./pages/config/config.module').then( m => m.ConfigPageModule)
  },
  {
    path: 'formregistrar',
    loadChildren: () => import('./pages/formregistrar/formregistrar.module').then( m => m.FormregistrarPageModule)
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
