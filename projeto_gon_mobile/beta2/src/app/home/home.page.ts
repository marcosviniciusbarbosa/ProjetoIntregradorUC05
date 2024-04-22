import { Component } from '@angular/core';

import { AdressPage } from 'src/app/pages/adress/adress.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  component = AdressPage
  tesouraPente = '../assets/img/tesoura-e-pente.png'  
  constructor() {}

}
