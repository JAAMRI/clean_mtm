from dicttoxml import dicttoxml

import requests
import json

def recipe_to_url():
    count = 0
    mapped_recipes = []
    dups = []


    while count <= 586:
        contents = requests.post("https://na-synd-scm.constant.co/api/v4/recipes", data = {"api_key": "927079A6A3D6E521F2173C49D76F9600", "lang": "en-CA", "page_start": str(count), "page_size": '50'})
        a = json.loads(contents._content)
        recipes = a['data']
        for r in recipes:
            recipe_title = r['title'].replace(',','').replace('(','').replace(')','').replace(' ','-').replace('&','and')
            if r["recipe_id"] not in dups:
                dups.append(r['recipe_id'])
            mapped_recipes.append({
                "url": f"https://mealsthatmatter.com/recipes/discover/{recipe_title + '-' + str(r['recipe_id'])}",
                "lastmod": "2020-08-31"
            })
        count +=50

    s = dicttoxml(mapped_recipes, custom_root='urlset', attr_type=False)
    text_file = open("Output.xml", "w")
    text_file.write(s.decode('utf-8'))
    text_file.close()





recipe_to_url()



