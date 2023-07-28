import time
import os
from flask import Flask, jsonify, request
import requests
import base64
from flask_cors import CORS
from dotenv import load_dotenv
from supabase import create_client, Client

load_dotenv()

database_app = Flask(__name__)
CORS(database_app)

url: str = os.environ.get("NEXT_PUBLIC_SUPABASE_URL")
key: str = os.environ.get("NEXT_PUBLIC_SUPABASE_ANON_KEY")
supabase: Client = create_client(url, key)


# Default route
@database_app.route('/')
def index():
	response = supabase.table('countries').select("*").execute()
	print(response.data[0])
	return jsonify({
		"message": response.data[0]
	})


# API route to get saved recipes based on user_id
@database_app.route('/get_recipes/<user_id>', methods=['GET'])
def get_recipes(user_id):
	# Query saved recipes for the specified user_id
	response = supabase.table('saved_recipes').select('*').eq('user_id', user_id).execute()
	try:
		saved_recipes = response.data

		return jsonify({"data": saved_recipes}), 200

	except:
		# Handle error case
		return jsonify({'error': 'Failed to fetch saved recipes.'}), 500


# API route to save a recipe
@database_app.route('/save_recipe', methods=['POST'])
def save_recipe():
	user_id = request.json['user_id']
	recipe_data = request.json['recipe_data']
	collection = request.json['collection']
	recipe_name = request.json['recipe_name']

	try:
		# Insert the recipe into the "saved_recipes" table with user_id
		response = supabase.table('saved_recipes').insert({
			'user_id': user_id,
			'collection': collection,
			'recipe_data': recipe_data,
			'recipe_name': recipe_name,
		}).execute()

		return jsonify({
			'error': None,
			'message': 'Recipe saved successfully.'}), 201
	except:
		# Handle error case
		return jsonify({'error': 'Failed to save recipe.'}), 500


# Get a single recipe based on recipe_name
@database_app.route('/get_recipe/<recipe_name>', methods=['GET'])
def get_recipe(recipe_name):
	# Decode the recipe name from endpoint

	try:

		response = supabase.table('saved_recipes').select('*').eq('recipe_name', recipe_name).execute()

		recipe = response.data[0]

		return jsonify({"data": recipe}), 200

	except:
		# Handle error case
		return jsonify({'error': 'Failed to fetch saved recipes.'}), 500


if __name__ == '__main__':
	database_app.run(debug=True, host='localhost', port=5004)
