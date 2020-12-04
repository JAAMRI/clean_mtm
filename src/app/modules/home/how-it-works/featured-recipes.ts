export const FeaturedRecipes = [

  {
    name: 'mexican',
    link: `/recipes/discover/mexican`,
    image: '/assets/static_images/home-page/featured-recipes/MTM_Mexican.png',
    frImage: '/assets/static_images/home-page/fr/featured-recipes/MTM_Mexican.jpg',
  },
  {
    name: 'indian',

    link: `/recipes/discover/indian`,
    image: '/assets/static_images/home-page/featured-recipes/MTM_Indian.png',
    frImage: '/assets/static_images/home-page/fr/featured-recipes/MTM_Indian.jpg',

  },
  {
    name: 'middle_eastern',

    link: `/recipes/discover/middle_eastern`,
    image: '/assets/static_images/home-page/featured-recipes/MTM_Middle_Eastern.png',
    frImage: '/assets/static_images/home-page/fr/featured-recipes/MTM_Middle_Eastern.jpg',
  },
  {
    name: 'mediterranean',

    link: `/recipes/discover/mediterranean`,
    image: '/assets/static_images/home-page/featured-recipes/MTM_Mediterranean.png',
    frImage: '/assets/static_images/home-page/fr/featured-recipes/MTM_Mediterranean.jpg',
  },
  {
    name: 'asian',

    link: `/recipes/discover/asian`,
    image: '/assets/static_images/home-page/featured-recipes/MTM_Asian.png',
    frImage: '/assets/static_images/home-page/fr/featured-recipes/MTM_Asian.jpg',
  },
  {
    name: 'italian',

    link: `/recipes/discover/italian`,
    image: '/assets/static_images/home-page/featured-recipes/MTM_Italian.png',
    frImage: '/assets/static_images/home-page/fr/featured-recipes/MTM_Italian.jpg',
  },
  {
    name: 'mexican',

    link: `/recipes/discover/mexican`,
    image: '/assets/static_images/home-page/featured-recipes/MTM_Mexican.png',
    frImage: '/assets/static_images/home-page/fr/featured-recipes/MTM_Mexican.jpg',

  },
  {
    name: 'indian',

    link: `/recipes/discover/indian`,
    image: '/assets/static_images/home-page/featured-recipes/MTM_Indian.png',
    frImage: '/assets/static_images/home-page/fr/featured-recipes/MTM_Indian.jpg',

  },
  {
    name: 'middle_eastern',

    link: `/recipes/discover/middle_eastern`,
    image: '/assets/static_images/home-page/featured-recipes/MTM_Middle_Eastern.png',
    frImage: '/assets/static_images/home-page/fr/featured-recipes/MTM_Middle_Eastern.jpg',
  },
  {
    name: 'mediterranean',

    link: `/recipes/discover/mediterranean`,
    image: '/assets/static_images/home-page/featured-recipes/MTM_Mediterranean.png',
    frImage: '/assets/static_images/home-page/fr/featured-recipes/MTM_Mediterranean.jpg',
  },
  {
    name: 'asian',

    link: `/recipes/discover/asian`,
    image: '/assets/static_images/home-page/featured-recipes/MTM_Asian.png',
    frImage: '/assets/static_images/home-page/fr/featured-recipes/MTM_Asian.jpg',
  },
  {
    name: 'italian',

    link: `/recipes/discover/italian`,
    image: '/assets/static_images/home-page/featured-recipes/MTM_Italian.png',
    frImage: '/assets/static_images/home-page/fr/featured-recipes/MTM_Italian.jpg',
  },
];

export function getFeaturedRecipes(localeId: string): any[] {
  if (localeId === 'fr') {
    return FeaturedRecipes.map((recipe:any) => ({name: recipe.name, image: recipe.frImage, link: recipe.link}))
  } else {
    return FeaturedRecipes.map((recipe:any) => ({name: recipe.name, image: recipe.image, link: recipe.link}))
  }
}