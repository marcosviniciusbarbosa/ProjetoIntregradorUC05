import { Component } from '@angular/core';
// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';
// register Swiper custom elements
register();

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  tesouraPente: string = '../assets/img/tesoura-e-pente.png';
  nomeBarbearia: string = 'Nome da Barberria';
  nota: string = '4,7';
  km: string = '2,3 km';
  constructor() {}
}
