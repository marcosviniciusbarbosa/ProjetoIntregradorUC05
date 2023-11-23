import { Component } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  items: NbMenuItem[] = [
    {
      title: 'home',
      link: '/'
    },
    {
      title: 'dashboard',
      link: 'dashboard'
    }
   ];

}
