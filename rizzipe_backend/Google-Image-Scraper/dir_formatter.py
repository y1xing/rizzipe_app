import os
import shutil
import math


def format(dir):
    # define the paths for the train, test, and val directories
    train_dir = f'{dir}\\train'
    test_dir = f'{dir}\\test'
    val_dir = f'{dir}\\val'

    # get the list of classes
    classes = os.listdir(train_dir)

    for class_name in classes:
        class_dir = os.path.join(train_dir, class_name)
        if os.path.isdir(class_dir):
            # create the class dirs
            test_class_dir = os.path.join(test_dir, class_name)
            val_class_dir = os.path.join(val_dir, class_name)
            os.makedirs(test_class_dir, exist_ok=True)
            os.makedirs(val_class_dir, exist_ok=True)
            images = os.listdir(class_dir)
            # set splits to determine no. of images dynamically
            test_split = 0.20
            val_split = 0.05
            num_test = math.ceil(len(images) * test_split)
            num_val = math.ceil(len(images)*val_split)
            print(num_test)
            print(num_val)
            for i in range(num_test):
                src = os.path.join(class_dir, images[i])
                dst = os.path.join(test_class_dir, images[i])
                shutil.move(src, dst)
            for i in range(num_test,num_test+num_val):
                src = os.path.join(class_dir, images[i])
                dst = os.path.join(val_class_dir, images[i])
                shutil.move(src, dst)

format(os.getcwd())