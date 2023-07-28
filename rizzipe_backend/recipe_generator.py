import os

from flask import Flask, jsonify, request
import requests
# import json
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()

app2 = Flask(__name__)
CORS(app2)

EDAMAN_API = os.getenv('EDAMAN_API_KEY')
EDAMAN_URL = "https://api.edamam.com/api/recipes/v2"
IMAGE_CLASSIFICATION_URL = 'http://localhost:5001/classify_image'


# Default route
@app2.route('/')
def index():
	return EDAMAN_API


# Post request to receive ingredients and return recipe
@app2.route('/generate_recipe', methods=['POST'])
def generate_recipe():
	# Get the ingredients from the POST request

	if request.method == 'POST':
		ingredients = request.json['ingredients']
		cuisine = request.json['cuisine']
		diet_type = request.json['diet_type']
		excluded = request.json['excluded']
		predicted_classes = request.json['predicted_classes']

	stringed_ingredients = ','.join(ingredients)

	params = {
		"type": "public",
		"app_id": "4635676b",
		"app_key": EDAMAN_API,
		"q": stringed_ingredients.split(',')[0],
	}

	if cuisine.lower() != "none":
		params['cuisineType'] = cuisine

	if diet_type.lower() != "none":
		params['diet'] = diet_type

	if excluded.lower() != "none":
		params['excluded'] = excluded

	response = requests.get(url=EDAMAN_URL, params=params)

	# Check if the response is valid
	if response.status_code != 200:
		return jsonify({
			"params": params,
			"error": "Error in getting recipe",
			"message": response.text,
			"diet": diet_type,
			"excluded": excluded,
			"cuisine": cuisine,
			"identified_ingredients": ingredients,

		})

	# Check if the response has any recipes
	if len(response.json()['hits']) == 0:
		# If no recipe found, do another call with the ingredients only

		return jsonify({
			"error": "No recipes found",
			"diet": diet_type,
			"excluded": excluded,
			"cuisine": cuisine,
			"identified_ingredients": ingredients,
			"params": params,

		})

	first_recipe = response.json()['hits'][0]['recipe']

	return jsonify({
		'error': "None",
		"diet": diet_type,
		"excluded": excluded,
		"cuisine": cuisine,
		'recipe': first_recipe,
		'ingredients': ingredients,
		'predicted_classes': predicted_classes,
		"params": params,
	})


if __name__ == '__main__':
	app2.run(debug=True, host='localhost', port=5002)
