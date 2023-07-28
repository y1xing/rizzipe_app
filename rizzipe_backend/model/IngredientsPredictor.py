import numpy as np
import torch
from tqdm.notebook import tqdm


# predictor class to load and predict on test dataset
class IngredientsPredictor:
	# variables to evaluate inference time etc
	timings = []
	total_time = 0

	# starter, ender = torch.cuda.Event(enable_timing=True), torch.cuda.Event(enable_timing=True)

	def __init__(self, model, device, weights, num_classes):
		self.model = model
		self.device = device
		self.weights = weights
		self.num_classes = num_classes

		self.load_model()

	# load model with custom number of classes
	def load_model(self):
		# change last layer of NN
		out_classes = self.num_classes
		in_feats = self.model.classifier[1].in_features
		self.model.classifier[1] = torch.nn.Linear(in_feats, out_classes)
		self.model.to(self.device)

		# load saved weights onto model
		self.model.load_state_dict(self.weights)
		self.model.eval()

	# predict on image
	def predict(self, imgs, threshold=0.5):
		with torch.no_grad():
			inputs = imgs.to(self.device)
			# self.starter.record()
			outputs = self.model(inputs)
		# self.ender.record()

		# sync GPU to ensure recorded time is after process running on GPU is completed
		# torch.cuda.synchronize()

		# calculate inference time and throughput
		# curr_time = self.starter.elapsed_time(self.ender) / 1000
		# self.timings.append(curr_time)
		# self.total_time += curr_time

		# activate logits to get probabilities (default threshold = 0.5)
		outputs = outputs.to("cpu")
		probs = outputs.sigmoid()
		preds = (probs > threshold).float()

		return outputs, probs, preds

	# predict on image batches with single label
	def predict_batches(self, data_loader, threshold=0.5):
		self.timings = []
		self.total_time = 0

		# warm-up GPU for inference speed/throughput testing with dummy input
		dummy_input = torch.randn(1, 3, 224, 224, dtype=torch.float).to(self.device)
		for _ in range(20):
			_ = self.model(dummy_input)

		all_logits = None
		all_probs = None
		all_preds = None
		all_lbls = None

		for imgs, lbls in tqdm(data_loader):
			logits, probs, preds = self.predict(imgs)

			# convert label_indices to one hot
			targets = lbls.numpy().reshape(-1)
			lbls_onehot = torch.tensor(np.eye(self.num_classes)[targets]).to(torch.float32)

			# concat batchs results
			if all_logits is None:
				all_logits = logits
				all_probs = probs
				all_preds = preds
				all_lbls = lbls_onehot
			else:
				all_logits = torch.cat((all_logits, logits), dim=0)
				all_probs = torch.cat((all_probs, probs), dim=0)
				all_preds = torch.cat((all_preds, preds), dim=0)
				all_lbls = torch.cat((all_lbls, lbls_onehot), dim=0)

		return all_logits, all_probs, all_preds, all_lbls

	# predict on image batches with multi-label
	def predict_batches_multilabel(self, data_loader, threshold=0.5):
		all_logits = None
		all_probs = None
		all_preds = None
		all_lbls = None

		for imgs, lbls in tqdm(data_loader):
			logits, probs, preds = self.predict(imgs)

			# concat batchs results
			if all_logits is None:
				all_logits = logits
				all_probs = probs
				all_preds = preds
				all_lbls = lbls
			else:
				all_logits = torch.cat((all_logits, logits), dim=0)
				all_probs = torch.cat((all_probs, probs), dim=0)
				all_preds = torch.cat((all_preds, preds), dim=0)
				all_lbls = torch.cat((all_lbls, lbls), dim=0)

		return all_logits, all_probs, all_preds, all_lbls
