import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { AuthGuard } from './_auth/auth.guard';
import { AllusersComponent } from './allusers/allusers.component';
import { RegisterComponent } from './register/register.component';
import { BooksComponent } from './books/books.component';

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
  // {
  //   path: 'allProducts',
  //   component: ProductListComponent,
  // },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: 'forbidden', component: ForbiddenComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
