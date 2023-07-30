import pandas as pd
import torch
from torchvision.models import efficientnet_b0, EfficientNet_B0_Weights


# configuration class to store setup values for training and testing
class CFG:
	# select processor
	device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

	# load pretrained model
	model = efficientnet_b0(weights=EfficientNet_B0_Weights.DEFAULT)
	model.to(device)

	# define training parameters
	epochs = 10
	lr = 0.001
	batch_size = 32
	img_size = 224

	# load class encoding and decoding csv (for prediction)
	df = pd.read_csv("model/idx_to_classes.csv")
	idx_to_classes = [cls for cls in df["class"]]
	num_classes = len(idx_to_classes)

	# dataset filepaths
	root_path = "../datasets/ingredients-136_dataset"
	train_path = f"{root_path}/train/"
	valid_path = f"{root_path}/val/"
	test_path = f"{root_path}/test/"

	print(f"Device in use: {device}")
