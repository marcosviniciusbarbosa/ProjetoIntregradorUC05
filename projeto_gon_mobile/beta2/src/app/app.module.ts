import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { HeaderComponent } from './componentes/header/header.component';

import { AppRoutingModule } from './app-routing.module';

import { AdressPage } from './pages/adress/adress.page';


@NgModule({
  declarations: [AppComponent,AdressPage,HeaderComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
