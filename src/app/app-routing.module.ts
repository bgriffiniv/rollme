import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
      path: '',
      redirectTo: 'home',
      pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './pages/home/home.module#HomePageModule'
  },
  {
    path: 'profile',
    loadChildren: './pages/profile/profile.module#ProfilePageModule'
  },
  {
    path: 'edit',
    loadChildren: './pages/edit/edit.module#EditPageModule'
  },
  {
    path: 'rolodex',
    loadChildren: './pages/rolodex/rolodex.module#RolodexPageModule'
  },
  {
    path: 'contact',
    loadChildren: './pages/contact/contact.module#ContactPageModule'
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
