import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerfilComponent } from './perfil/perfil.component';
import { HomeComponent } from './home/home.component';
import { ContatoComponent } from './contato/contato.component';
import { ServicosComponent } from './servicos/servicos.component';
import { SobreComponent } from './sobre/sobre.component';

const routes: Routes = [
  { path: "", component: HomeComponent},
  { path: "perfil", component: PerfilComponent},
  { path: "contato", component: ContatoComponent},
  { path: "servicos", component: ServicosComponent},
  { path: "sobre", component: SobreComponent}
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
