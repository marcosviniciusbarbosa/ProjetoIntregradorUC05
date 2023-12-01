import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ClientesComponent } from './clientes/clientes.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '', component: LoginComponent
  },
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'clientes', component: ClientesComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
