import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { HeaderComponent } from '../../componentes/header/header.component';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), HeaderComponent],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
