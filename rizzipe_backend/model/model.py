from PIL import Image
from torchvision import transforms as T
import torch

from .IngredientsUtility import *
from .IngredientsConfiguration import CFG
from .IngredientsPredictor import IngredientsPredictor

pred_transform = T.Compose([
	T.Resize(size=(CFG.img_size, CFG.img_size)),
	T.ToTensor(),
	T.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
])

# initialise model with custom weights
custom_weights = torch.load("model/IngredientsModel.pt", map_location=torch.device('cpu'))
predictor = IngredientsPredictor(model=CFG.model,
								 device=CFG.device,
								 weights=custom_weights,
								 num_classes=CFG.num_classes)
