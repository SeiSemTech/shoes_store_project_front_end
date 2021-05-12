import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {

  images: string[] = [
    'assets/images/banners/Banner-de-constr.png',
    'assets/images/banners/Banner-promocional.png',
    'assets/images/banners/Banner-run.png',
  ];

  constructor() { }

  ngOnInit() {
  }

}
