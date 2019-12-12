import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
      path: '',
      redirectTo: 'home',
      pathMatch: 'full'
  },
  {
    path:'',
    loadChildren:'./pages/home/home.module#HomePageModule'
  },
  //{
    //path: 'edit',
    //loadChildren: './pages/edit/edit.module#EditPageModule'
  //},
  //{
    //path: 'contact',
    //loadChildren: './pages/contact/contact.module#ContactPageModule'
  //},

  { path: 'link', loadChildren: './pages/link/link.module#LinkPageModule' },
  { path: 'faq', loadChildren: './pages/faq/faq.module#FaqPageModule' },
  { path: 'about', loadChildren: './pages/about/about.module#AboutPageModule' },
  { path: 'license', loadChildren: './pages/license/license.module#LicensePageModule' },
  { path: 'settings', loadChildren: './pages/settings/settings.module#SettingsPageModule' },
  { path: 'feedback', loadChildren: './pages/feedback/feedback.module#FeedbackPageModule' },
  { path: 'users', loadChildren: './pages/user-list/user-list.module#UserListPageModule' },
  { path: 'user', loadChildren: './pages/user-details/user-details.module#UserDetailsPageModule' },
  { path: 'user/:id', loadChildren: './pages/user-details/user-details.module#UserDetailsPageModule' },
  { path: 'invite', loadChildren: './pages/invite/invite.module#InvitePageModule' },
<<<<<<< HEAD
  { path: 'password', loadChildren: './pages/password/password.module#PasswordPageModule' },
  { path: 'exchange', loadChildren: './pages/home/exchange/exchange.module#ExchangePageModule' }

=======
  { path: 'password', loadChildren: './pages/password/password.module#PasswordPageModule' }
>>>>>>> dev
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
