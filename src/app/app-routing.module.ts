import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './_auth/auth.guard';
import { AdminComponent } from './admin/admin.component';
import { AllusersComponent } from './allusers/allusers.component';
import { CartDetailsComponent } from './cart-details/cart-details.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin'] },
  },
  {
    path: 'user',
    component: UserComponent,
    canActivate: [AuthGuard],
    data: { roles: ['User'] },
  },
  // {
  //   path: 'allOrders',
  //   component: OrdersComponent,
  //   canActivate: [AuthGuard],
  //   data: { roles: ['Admin'] },
  // },
  // {
  //   path: 'myOrders',
  //   component: OrdersComponent,
  //   canActivate: [AuthGuard],
  //   data: { roles: ['User'] },
  // },
  {
    path: 'allUsers',
    component: AllusersComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin'] },
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: 'forbidden', component: ForbiddenComponent },
  { path: 'cart-details', component: CartDetailsComponent },

  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: '**', redirectTo: '/products', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
