import { Component } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
})
export class BannerComponent {
  images = [
    'assets/img/banner/banner01.jpg',
    'assets/img/banner/banner02.jpg',
    'assets/img/banner/banner03.jpg'
  ];


}
