import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerfilComponent } from './perfil/perfil.component';
import { HomeComponent } from './home/home.component';
import { ContatoComponent } from './contato/contato.component';
import { ServicosComponent } from './servicos/servicos.component';
import { SobreComponent } from './sobre/sobre.component';
import { ItemComponent } from './item/item.component';
import { ProdutosComponent} from './produtos/produtos.component';
import { CadastreSeComponent } from './cadastre-se/cadastre-se.component';
import { LoginComponent } from './login/login.component';
import { ContaComponent } from './conta/conta.component';
import { HistoricoComponent } from './historico/historico.component';
import { MetodoPagamentoComponent } from './metodo-pagamento/metodo-pagamento.component';
import { PrivacidadeComponent } from './privacidade/privacidade.component';
import { SegurancaComponent } from './seguranca/seguranca.component';

const routes: Routes = [
  { path: "", component: HomeComponent},
  { path: "perfil", component: PerfilComponent},
  { path: "contato", component: ContatoComponent},
  { path: "servicos", component: ServicosComponent},
  { path: "sobre", component: SobreComponent},
  { path: "item", component: ItemComponent},
  { path: "produtos", component: ProdutosComponent},
  { path: "cadastre-se", component: CadastreSeComponent},
  { path: "conta", component: ContaComponent},
  { path: "historico", component: HistoricoComponent},
  { path: "metodo-pagamento", component: MetodoPagamentoComponent},
  { path: "privacidade", component: PrivacidadeComponent},
  { path: "seguranca", component: SegurancaComponent},
  { path: "login", component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
