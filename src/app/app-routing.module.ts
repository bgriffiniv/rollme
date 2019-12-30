import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
      path: '',
      redirectTo: 'login',
      pathMatch: 'full'
  },

  // home page with tabs
  { path:'home', loadChildren:'./pages/home/home.module#HomePageModule' },

  // tab pages, nested for convenience
  { path: 'rolodex', loadChildren: './pages/home/rolodex/rolodex.module#RolodexPageModule' },
  { path: 'exchange', loadChildren: './pages/home/exchange/exchange.module#ExchangePageModule' },
  { path: 'profile', loadChildren: './pages/home/profile/profile.module#ProfilePageModule' },

  // universal edit page
  { path: 'edit', loadChildren: './pages/edit/edit.module#EditPageModule'},

  { path: 'link', loadChildren: './pages/link/link.module#LinkPageModule' },
  { path: 'contact', loadChildren: './pages/contact/contact.module#ContactPageModule' },

  // side menu pages
  { path: 'about', loadChildren: './pages/about/about.module#AboutPageModule' },
  { path: 'faq', loadChildren: './pages/faq/faq.module#FaqPageModule' },
  { path: 'license', loadChildren: './pages/license/license.module#LicensePageModule' },
  { path: 'settings', loadChildren: './pages/settings/settings.module#SettingsPageModule' },
  { path: 'feedback', loadChildren: './pages/feedback/feedback.module#FeedbackPageModule' },
  { path: 'invite', loadChildren: './pages/invite/invite.module#InvitePageModule' },
  { path: 'password', loadChildren: './pages/password/password.module#PasswordPageModule' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },

  // default users page (deprecated)
  { path: 'users', loadChildren: './pages/user-list/user-list.module#UserListPageModule'},
  { path: 'user', loadChildren: './pages/user-details/user-details.module#UserDetailsPageModule' },
  { path: 'user/:id', loadChildren: './pages/user-details/user-details.module#UserDetailsPageModule' },
  { path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule'},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
