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
  { path: 'about', loadChildren: './pages/about/about.module#AboutPageModule' },
  { path: 'faq', loadChildren: './pages/faq/faq.module#FaqPageModule' },
  { path: 'license', loadChildren: './pages/license/license.module#LicensePageModule' },
  { path: 'settings', loadChildren: './pages/settings/settings.module#SettingsPageModule' },
  { path: 'feedback', loadChildren: './pages/feedback/feedback.module#FeedbackPageModule' },
  { path: 'invite', loadChildren: './pages/invite/invite.module#InvitePageModule' },
  { path: 'password', loadChildren: './pages/password/password.module#PasswordPageModule' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'signup', loadChildren: './pages/signup/signup.module#SignupPageModule' },


  { path: 'rolodex', loadChildren: './pages/home/rolodex/rolodex.module#RolodexPageModule' },
  { path: 'exchange', loadChildren: './pages/home/exchange/exchange.module#ExchangePageModule' },
  { path: 'profile', loadChildren: './pages/home/profile/profile.module#ProfilePageModule' },
  { path: 'edit', loadChildren: './pages/edit/edit.module#EditPageModule'},

  { path: 'users', loadChildren: './pages/user-list/user-list.module#UserListPageModule'},
  { path: 'user', loadChildren: './pages/user-details/user-details.module#UserDetailsPageModule' },
  { path: 'user/:id', loadChildren: './pages/user-details/user-details.module#UserDetailsPageModule' },

  { path: 'link', loadChildren: './pages/link/link.module#LinkPageModule' },
  { path: 'contact', loadChildren: './pages/contact/contact.module#ContactPageModule' },
  { path: 'create-account', loadChildren: './pages/create-account/create-account.module#CreateAccountPageModule' },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
