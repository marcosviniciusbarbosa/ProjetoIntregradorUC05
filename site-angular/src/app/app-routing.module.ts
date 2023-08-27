import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerfilComponent } from './perfil/perfil.component';
import { HomeComponent } from './home/home.component';
import { ItemComponent } from './item/item.component';
import { ProdutosComponent} from './produtos/produtos.component';

const routes: Routes = [
  { path: "", component: HomeComponent},
  { path: "perfil", component: PerfilComponent},
  { path: "item", component: ItemComponent},
  { path: "produtos", component: ProdutosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
