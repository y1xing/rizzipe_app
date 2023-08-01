from flask import Flask, request, jsonify
from flask import jsonify
import base64
from PIL import Image
from flask_cors import CORS
from model.model import *
from io import BytesIO
import io

app = Flask(__name__)
CORS(app)


def convert_base64_to_image(base64_string):
	base64_string = base64_string.replace(" ", "").replace("\n", "")
	decoded_data = base64.b64decode(base64_string)
	return decoded_data


def fix_base64_encoding(image):
	while len(image) % 4 != 0:
		image += '='
	return image


# Default route
@app.route('/')
def index():
	return "Hello World! This is image classification app"


# Post route to receive the image in the form of base64 string and return the recipe to the frontend
@app.route('/classify_image', methods=['POST'])
def classify_image_post():
	try:
		# Get the image from the request
		image_base64 = request.json.get('image')
		if not image_base64:
			return jsonify({"error": "Image not found in the request."}), 400

		image_base64 = image_base64.split(",", 1)[1].strip()

		# Decode the base64 string to bytes
		image_bytes = base64.b64decode(image_base64)

		# Open the image using PIL's Image.open() method with io.BytesIO as a context manager
		with Image.open(io.BytesIO(image_bytes)) as img:
			# transform image
			batch = pred_transform(img).unsqueeze(0)

			# # predict on image
			img_logits, img_probs, img_preds = predictor.predict(batch, threshold=0.015)

			print("img_preds: ", img_preds)
			print("img_probs: ", img_probs)

			# translate one hot indexed predictions to class labels
			predicted_classes = decode_target(img_preds.squeeze(0), CFG.idx_to_classes)

			# Save the image to a file
			with open("image2.jpg", "wb") as f:
				f.write(image_bytes)

			# Put the image in the model and get the ingredients
			ingredients_list = ['tomato', 'spaghetti', 'garlic', 'parmesan']

		return jsonify({
			'ingredients': predicted_classes,
			'predicted_classes': predicted_classes,
			'error': 'None'
		})

	except Exception as e:
		# Handle any exceptions that might occur during image processing
		return jsonify({
			"error": str(e),
			"message": "An error occurred while processing the image.",
			"ingredients": [],
			"predicted_classes": [],

		})


if __name__ == '__main__':
	app.run(debug=True, host='localhost', port=5001)
