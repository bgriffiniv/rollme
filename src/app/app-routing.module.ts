import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
      path: '',
      redirectTo: 'login',
      pathMatch: 'full'
  },

  // authentication pages
  { path: 'login', loadChildren: './pages/authentication/login/login.module#LoginPageModule' },
  { path: 'signup', loadChildren: './pages/authentication/signup/signup.module#SignupPageModule' },
  { path: 'create-account', loadChildren: './pages/authentication/create-account/create-account.module#CreateAccountPageModule' },
  { path: 'successful-signup', loadChildren: './pages/authentication/successful-signup/successful-signup.module#SuccessfulSignupPageModule' },

  // menu pages
  { path: 'about', loadChildren: './pages/menu/about/about.module#AboutPageModule' },
  { path: 'faq', loadChildren: './pages/menu/faq/faq.module#FaqPageModule' },
  { path: 'license', loadChildren: './pages/menu/license/license.module#LicensePageModule' },
  { path: 'settings', loadChildren: './pages/menu/settings/settings.module#SettingsPageModule' },
  { path: 'feedback', loadChildren: './pages/menu/feedback/feedback.module#FeedbackPageModule' },
  { path: 'invite', loadChildren: './pages/menu/invite/invite.module#InvitePageModule' },
  { path: 'password', loadChildren: './pages/menu/password/password.module#PasswordPageModule' },
  { path: 'link', loadChildren: './pages/menu/link/link.module#LinkPageModule' },
  { path: 'contact', loadChildren: './pages/menu/contact/contact.module#ContactPageModule' },

  // user management test features
  { path: 'users', loadChildren: './pages/menu/users/user-list/user-list.module#UserListPageModule'},
  { path: 'user', loadChildren: './pages/menu/users/user-details/user-details.module#UserDetailsPageModule' },
  { path: 'user/:id', loadChildren: './pages/menu/users/user-details/user-details.module#UserDetailsPageModule' },

  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' },
  { path: 'rolodex', loadChildren: './pages/home/rolodex/rolodex.module#RolodexPageModule' },
  { path: 'exchange', loadChildren: './pages/home/exchange/exchange.module#ExchangePageModule' },
  { path: 'profile', loadChildren: './pages/home/profile/profile.module#ProfilePageModule' },
  { path: 'edit', loadChildren: './pages/edit/edit.module#EditPageModule'},

  { path: 'card-import', loadChildren: './pages/card-import/card-import.module#CardImportPageModule' },

  { path: 'cards', loadChildren: './pages/home/profile/profile.module#ProfilePageModule'},
  { path: 'card', loadChildren: './pages/card-import/card-import.module#CardImportPageModule' },
  { path: 'card/:id', loadChildren: './pages/card-import/card-import.module#CardImportPageModule' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
