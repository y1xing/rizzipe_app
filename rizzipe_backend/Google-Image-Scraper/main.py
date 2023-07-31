# -*- coding: utf-8 -*-
"""
Created on Sun Jul 12 11:02:06 2020

@author: OHyic

"""
#Import libraries
import os
import concurrent.futures
from GoogleImageScraper import GoogleImageScraper
from patch import webdriver_executable
import shutil
import math
from types import FunctionType

def worker_thread(search_key):
    image_scraper = GoogleImageScraper(
        webdriver_path, 
        image_path, 
        search_key, 
        number_of_images, 
        headless, 
        min_resolution, 
        max_resolution, 
        max_missed)
    image_urls = image_scraper.find_image_urls()
    image_scraper.save_images(image_urls, keep_filenames)

    #Release resources
    del image_scraper



# ingredients = [
#     "Chicken_ingredient", "Beef_ingredient", "Pork_ingredient", "Fish_ingredient", "Shrimp_ingredient", "Tofu_ingredient", "Rice_ingredient", "Pasta_ingredient", "Potatoes_ingredient",
#     "Quinoa_ingredient", "Lentils_ingredient", "Beans_ingredient", "Tomatoes_ingredient", "Onions_ingredient", "Garlic_ingredient", "Carrots_ingredient", "Bell peppers_ingredient",
#     "Spinach_ingredient", "Broccoli_ingredient", "Mushrooms_ingredient", "Eggs_ingredient", "Milk_ingredient", "Cheese_ingredient", "Butter_ingredient", "Olive oil_ingredient",
#     "Salt_ingredient", "Pepper_ingredient", "Basil_ingredient", "Thyme_ingredient", "Oregano_ingredient", "Cumin_ingredient", "Paprika_ingredient", "Curry powder_ingredient",
#     "Lemon juice_ingredient", "Cilantro_ingredient", "Ginger_ingredient", "Honey_ingredient", "Soy sauce_ingredient", "Vinegar_ingredient", "Brown sugar_ingredient",
#     "Cinnamon_ingredient", "Nutmeg_ingredient", "Vanilla extract_ingredient", "Coconut milk_ingredient", "Sesame oil_ingredient", "Sesame seeds_ingredient",
#     "Cayenne pepper_ingredient", "Chili powder_ingredient", "Coriander_ingredient", "Dill_ingredient", "Mustard_ingredient", "Mayonnaise_ingredient",
#     "Sour cream_ingredient", "Yogurt_ingredient", "Maple syrup_ingredient", "Worcestershire sauce_ingredient", "Tabasco sauce_ingredient",
#     "Peanut butter_ingredient", "Cashews_ingredient", "Almonds_ingredient", "Walnuts_ingredient", "Pine nuts_ingredient", "Sunflower seeds_ingredient",
#     "Chia seeds_ingredient", "Flaxseeds_ingredient", "Breadcrumbs_ingredient", "Baking powder_ingredient", "Baking soda_ingredient", "Flour_ingredient",
#     "Cornstarch_ingredient", "Cocoa powder_ingredient", "Dark chocolate_ingredient", "White chocolate_ingredient", "Sugar_ingredient",
#     "Powdered sugar_ingredient", "Brown rice_ingredient", "Whole wheat bread_ingredient", "Tortillas_ingredient", "Salsa_ingredient",
#     "Avocado_ingredient", "Lime juice_ingredient", "Capers_ingredient", "Olives_ingredient", "Artichokes_ingredient", "Canned tomatoes_ingredient",
#     "Tomato paste_ingredient", "Tomato sauce_ingredient", "Chicken broth_ingredient", "Beef broth_ingredient", "Vegetable broth_ingredient",
#     "Red wine_ingredient", "White wine_ingredient", "Coconut flakes_ingredient", "Pineapple_ingredient", "Bananas_ingredient", "Strawberries_ingredient",
#     "Blueberries_ingredient", "Raspberries_ingredient", "Apples_ingredient", "Oranges_ingredient", "Lemon zest_ingredient", "Lime zest_ingredient",
#     "Mint leaves_ingredient", "Parsley_ingredient", "Rosemary_ingredient", "Sage_ingredient", "Bread crumbs_ingredient", "Green onions_ingredient",
#     "Cabbage_ingredient", "Cauliflower_ingredient", "Radishes_ingredient", "Asparagus_ingredient", "Zucchini_ingredient", "Eggplant_ingredient",
#     "Pomegranate_ingredient", "Dates_ingredient", "Hummus_ingredient", "Yogurt sauce_ingredient", "Tahini_ingredient", "Quinoa_ingredient", "Couscous_ingredient",
#     "Pesto_ingredient", "Garam masala_ingredient", "Turmeric_ingredient", "Cardamom_ingredient", "Saffron_ingredient", "Raisins_ingredient",
#     "Croutons_ingredient", "Dijon mustard_ingredient", "Miso paste_ingredient", "Balsamic vinegar_ingredient", "Apple cider vinegar_ingredient",
#     "Chickpeas_ingredient", "Baking chocolate_ingredient", "Condensed milk_ingredient", "Evaporated milk_ingredient", "Sweetened condensed milk_ingredient"
# ]

#for testing purpose
ingredients = ["chicken"]


if __name__ == "__main__":
    #Define file path
    webdriver_path = os.path.normpath(os.path.join(os.getcwd(), 'webdriver', webdriver_executable()))
    image_path = os.path.normpath(os.path.join(os.getcwd(), 'train'))

    #Add new search key into array ["cat","t-shirt","apple","orange","pear","fish"]
    search_keys = list(set(ingredients))

    #Parameters
    number_of_images = 10               # Desired number of images
    headless = True                     # True = No Chrome GUI
    min_resolution = (0, 0)             # Minimum desired image resolution
    max_resolution = (9999, 9999)       # Maximum desired image resolution
    max_missed = 10                     # Max number of failed images before exit
    number_of_workers = 4               # Number of "workers" used
    keep_filenames = False              # Keep original URL image filenames

    #Run each search_key in a separate thread
    #Automatically waits for all threads to finish
    #Removes duplicate strings from search_keys
    with concurrent.futures.ThreadPoolExecutor(max_workers=number_of_workers) as executor:
        executor.map(worker_thread, search_keys)
    format(os.getcwd())