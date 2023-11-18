import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AutenticacionGuard } from 'src/app/servicios/autenticacion.guard';



const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule),
    canActivate: [AutenticacionGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
    canActivate: [AutenticacionGuard]
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then(m => m.SignupPageModule),
    canActivate: [AutenticacionGuard]
  },
  {
    path: 'forgotpass',
    loadChildren: () => import('./forgotpass/forgotpass.module').then(m => m.ForgotpassPageModule),
    canActivate: [AutenticacionGuard]
  },
  {
    path: 'qrreader',
    loadChildren: () => import('./qrreader/qrreader.module').then(m => m.QrreaderPageModule),
    canActivate: [AutenticacionGuard]
  },
  {
    path: 'noencontrado',
    loadChildren: () => import('./noencontrado/noencontrado.module').then(m => m.NoencontradoPageModule),
    canActivate: [AutenticacionGuard]
  },
  {
    path: '**',
    redirectTo: 'noencontrado',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
