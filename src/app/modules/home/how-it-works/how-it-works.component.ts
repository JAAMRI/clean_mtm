import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-how-it-works',
  templateUrl: './how-it-works.component.html',
  styleUrls: ['./how-it-works.component.scss']
})
export class HowItWorksComponent implements OnInit {

  recipes = [
    {
      link: `/recipes/Ancho-Steak-Tacos-169023`,
      image: '/assets/static_images/home-page/featured-recipes/tacos.jpg',
    },
    {
      link: `/recipes/Grilled-Eggplant-Caprese-Salad-95881`,
      image: '/assets/static_images/home-page/featured-recipes/eggplant.jpg',
    },
    {
      link: `/recipes/The-Great-Canadian-Burger-108568`,
      image: '/assets/static_images/home-page/featured-recipes/burger.jpg'
    },
    {
      link: `/recipes/Grilled-Herb-Rubbed-Chicken-99319`,
      image: '/assets/static_images/home-page/featured-recipes/chicken.png'
    },
    {
      link: `/recipes/Spinach-and-Kale-Salad-188777`,
      image: '/assets/static_images/home-page/featured-recipes/spinach.jpg'
    },

  ]; // icons


  constructor(
    
  ) {}

  ngOnInit(): void {
  }

}
