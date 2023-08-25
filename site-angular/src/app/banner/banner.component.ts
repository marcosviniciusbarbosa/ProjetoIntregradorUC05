import { Component } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
})
export class BannerComponent {
  images = [
    'assets/img/banner/banner-1.jpg',
    'assets/img/banner/banner-2.jpg',
    'assets/img/banner/banner-3.jpg',
  ];


}
