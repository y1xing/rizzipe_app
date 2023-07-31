import requests
API_KEY = "077ebe6cfbf7fe5d021c11f7ec931e06"
app_id = "4635676b"
url = "https://api.edamam.com/api/recipes/v2"

endpoint = f"https://api.edamam.com/search?q=YOUR_QUERY&app_id={app_id}&app_key={API_KEY}"
params = {
    "type" :"public",
    "app_id" : "4635676b",
    "app_key": API_KEY,
    "q": "chicken"
}
response = requests.get(url,params=params)


# Process API response
if response.status_code == 200:
    data = response.json()
    recipes = data['hits']
    for recipe in recipes:
        ingredients = recipe['recipe']['ingredients']
        for ingredient in ingredients:
            ingredient_label = ingredient['text']
            print(ingredient_label)
else:
    print("Error:", response.status_code)
