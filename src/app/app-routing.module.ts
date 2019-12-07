import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
      path: '',
      redirectTo: 'login',
      pathMatch: 'full'
  },
  {
    path:'',
    loadChildren:'./pages/home/home.module#HomePageModule'
  },

  { path: 'link', loadChildren: './pages/link/link.module#LinkPageModule' },
  { path: 'faq', loadChildren: './pages/faq/faq.module#FaqPageModule' },
  { path: 'about', loadChildren: './pages/about/about.module#AboutPageModule' },
  { path: 'license', loadChildren: './pages/license/license.module#LicensePageModule' },
  { path: 'settings', loadChildren: './pages/settings/settings.module#SettingsPageModule' },
  { path: 'feedback', loadChildren: './pages/feedback/feedback.module#FeedbackPageModule' },
  { path: 'invite', loadChildren: './pages/invite/invite.module#InvitePageModule' },
  { path: 'password', loadChildren: './pages/password/password.module#PasswordPageModule' },
  { path: 'exchange', loadChildren: './pages/home/exchange/exchange.module#ExchangePageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'edit', loadChildren: './pages/edit/edit.module#EditPageModule'},
  { path: 'profile', loadChildren: './pages/home/profile/profile.module#ProfilePageModule'},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
