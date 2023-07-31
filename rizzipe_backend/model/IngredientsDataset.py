import os

import pandas as pd
from PIL import Image
from torch.utils.data import Dataset

from IngredientsUtility import encode_label


# ingredients dataset to load images with multi-labels
class IngredientsDataset(Dataset):
    def __init__(self, csv, root, idx_to_classes, transform=None):
        self.annot_df = pd.read_csv(os.path.join(root, csv))
        self.root = root
        self.transform = transform
        self.idx_to_classes = idx_to_classes

    def __len__(self):
        return len(self.annot_df)

    def __getitem__(self, idx):
        img_path = os.path.join(self.root, self.annot_df.iloc[idx, 0])
        img = Image.open(img_path)

        # index and one hot encode class label
        lbls = encode_label(self.annot_df.iloc[idx, 1].split(","), self.idx_to_classes)

        # transform image
        if self.transform:
            img = self.transform(img)

        sample = (img, lbls)

        return sample
