import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavigationComponent } from './navigation/navigation.component';
import { TableComponent } from './table/table.component';
import { AuthGuard } from './core/auth/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'home',
    component: NavigationComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dash', pathMatch: 'full' },
      { path: 'dash', component: DashboardComponent },
      { path: 'table', component: TableComponent }
    ]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
