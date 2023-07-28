from flask import Flask
from flask_script import Manager
from image_classification import app as image_classification_app
from recipe_generator import app as recipe_generator_app

app = Flask(__name__)
manager = Manager(app)

manager.add_command('image_classification', image_classification_app)
manager.add_command('recipe_generator', recipe_generator_app)

@manager.command
def runserver():
	recipe_generator_app.run(debug=True, host='localhost', port=5000)
	image_classification_app.run(debug=True, host='localhost', port=5001)



if __name__ == '__main__':
	manager.run()



