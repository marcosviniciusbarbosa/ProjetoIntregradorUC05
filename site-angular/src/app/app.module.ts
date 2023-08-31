import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TopoComponent } from './topo/topo.component';
import { RodapeComponent } from './rodape/rodape.component';
import { BannerComponent } from './banner/banner.component';
import { SobreComponent } from './sobre/sobre.component';
import { ContatoComponent } from './contato/contato.component';
import { ProdutosComponent } from './produtos/produtos.component';
import { ServicosComponent } from './servicos/servicos.component';
import { PerfilComponent } from './perfil/perfil.component';
import { HomeComponent } from './home/home.component';
import { ItemComponent } from './item/item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { ServicosService } from './servicos.service';
import { LoginComponent } from './login/login.component';
import { CadastreSeComponent } from './cadastre-se/cadastre-se.component';

@NgModule({
  declarations: [
    AppComponent,
    TopoComponent,
    RodapeComponent,
    BannerComponent,
    SobreComponent,
    ContatoComponent,
    ProdutosComponent,
    ServicosComponent,
    PerfilComponent,
    HomeComponent,
    ItemComponent,
    LoginComponent,
    CadastreSeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxMaskPipe,
    NgxMaskDirective,
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [
    provideNgxMask(),
    ServicosService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
