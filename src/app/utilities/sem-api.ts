
export function getSearchBody(query: string, preferences: string, page_start: number, page_size: number) {
  // preferences = 'chicken seafood vegetarian'

  const body = new URLSearchParams();
  body.set('api_key', "0CB73ADB3CAC840B94FD7BF16EF7B8C7");
  body.set('page_start', page_start.toString());
  body.set('page_size', page_size.toString());
  body.set('lang', "en-CA");
  body.set('sort_by', "rank");
  body.set('fields', "recipe_id, title, nutrients_legacy, description, comments, cook_time, ready_time, prep_time, wait_time, total_time, calculated_nutrients_per_serving, creation_time, yield, assets");
  body.set('q', (query ? query : preferences)); //either search query if exists or search user preferences
  body.set('fieldset', "all");
  body.set('p_has_asset', "[[\"image\"]]");
  body.set('p_has_rank', "yes");
  body.set('sort_by', "rank");

  return body;
}