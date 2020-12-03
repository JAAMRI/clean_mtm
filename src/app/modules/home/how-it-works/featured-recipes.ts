export const FeaturedRecipes = [

  {
    name: 'mexican',
    link: `/recipes/discover/mexican`,
    image: '/assets/static_images/home-page/featured-recipes/around-the-world/MTM_Mexican.png',
    frImage: '/assets/static_images/home-page/featured-recipes/around-the-world/MTM_Mexican_FR.png',
  },
  {
    name: 'indian',

    link: `/recipes/discover/indian`,
    image: '/assets/static_images/home-page/featured-recipes/around-the-world/MTM_Indian.png',
    frImage: '/assets/static_images/home-page/featured-recipes/around-the-world/MTM_Indian_FR.png',

  },
  {
    name: 'middle_eastern',

    link: `/recipes/discover/middle_eastern`,
    image: '/assets/static_images/home-page/featured-recipes/around-the-world/MTM_Middle_Eastern.png',
    frImage: '/assets/static_images/home-page/featured-recipes/around-the-world/MTM_Middle_Eastern_FR.png',
  },
  {
    name: 'mediterranean',

    link: `/recipes/discover/mediterranean`,
    image: '/assets/static_images/home-page/featured-recipes/around-the-world/MTM_Mediterranean.png',
    frImage: '/assets/static_images/home-page/featured-recipes/around-the-world/MTM_Mediterranean_FR.png',
  },
  {
    name: 'asian',

    link: `/recipes/discover/asian`,
    image: '/assets/static_images/home-page/featured-recipes/around-the-world/MTM_Asian.png',
    frImage: '/assets/static_images/home-page/featured-recipes/around-the-world/MTM_Asian_FR.png',
  },
  {
    name: 'italian',

    link: `/recipes/discover/italian`,
    image: '/assets/static_images/home-page/featured-recipes/around-the-world/MTM_Italian.png',
    frImage: '/assets/static_images/home-page/featured-recipes/around-the-world/MTM_Italian_FR.png',
  },
  {
    name: 'mexican',

    link: `/recipes/discover/mexican`,
    image: '/assets/static_images/home-page/featured-recipes/around-the-world/MTM_Mexican.png',
    frImage: '/assets/static_images/home-page/featured-recipes/around-the-world/MTM_Mexican_FR.png',

  },
  {
    name: 'indian',

    link: `/recipes/discover/indian`,
    image: '/assets/static_images/home-page/featured-recipes/around-the-world/MTM_Indian.png',
    frImage: '/assets/static_images/home-page/featured-recipes/around-the-world/MTM_Indian_FR.png',

  },
  {
    name: 'middle_eastern',

    link: `/recipes/discover/middle_eastern`,
    image: '/assets/static_images/home-page/featured-recipes/around-the-world/MTM_Middle_Eastern.png',
    frImage: '/assets/static_images/home-page/featured-recipes/around-the-world/MTM_Middle_Eastern_FR.png',
  },
  {
    name: 'mediterranean',

    link: `/recipes/discover/mediterranean`,
    image: '/assets/static_images/home-page/featured-recipes/around-the-world/MTM_Mediterranean.png',
    frImage: '/assets/static_images/home-page/featured-recipes/around-the-world/MTM_Mediterranean_FR.png',
  },
  {
    name: 'asian',

    link: `/recipes/discover/asian`,
    image: '/assets/static_images/home-page/featured-recipes/around-the-world/MTM_Asian.png',
    frImage: '/assets/static_images/home-page/featured-recipes/around-the-world/MTM_Asian_FR.png',
  },
  {
    name: 'italian',

    link: `/recipes/discover/italian`,
    image: '/assets/static_images/home-page/featured-recipes/around-the-world/MTM_Italian.png',
    frImage: '/assets/static_images/home-page/featured-recipes/around-the-world/MTM_Italian_FR.png',
  },
];

export function getFeaturedRecipes(localeId: string): any[] {
  if (localeId === 'fr') {
    return FeaturedRecipes.map((recipe:any) => ({name: recipe.name, image: recipe.frImage, link: recipe.link}))
  } else {
    return FeaturedRecipes.map((recipe:any) => ({name: recipe.name, image: recipe.image, link: recipe.link}))
  }
}