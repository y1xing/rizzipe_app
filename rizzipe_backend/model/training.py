import warnings

import pandas as pd
import torch
from torchvision import transforms as T, datasets
from torch.utils.data import DataLoader

from IngredientsConfiguration import CFG
from IngredientsTrainer import IngredientsTrainer


def run():
    warnings.filterwarnings("ignore")

    # define custom transforms for train and validation datasets
    train_transform = T.Compose([
        T.Resize(size=(CFG.img_size, CFG.img_size)),
        T.RandomRotation(degrees=(-20, +20)),
        # randomly rotate images by +/- 20 degrees, Image argumentation for each epoch
        T.ToTensor(),
        T.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
    ])
    valid_transform = T.Compose([
        T.Resize(size=(CFG.img_size, CFG.img_size)),
        T.ToTensor(),
        T.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
    ])

    # load and transform train and validation datasets
    train_data = datasets.ImageFolder(CFG.train_path, transform=train_transform)
    valid_data = datasets.ImageFolder(CFG.valid_path, transform=valid_transform)
    print(f"No. of train samples: {len(train_data)}")
    print(f"No. of validation samples: {len(valid_data)}\n")

    # load train and validation datasets into batches
    train_loader = DataLoader(train_data, batch_size=CFG.batch_size, shuffle=True)
    valid_loader = DataLoader(valid_data, batch_size=CFG.batch_size, shuffle=True)
    print(f"No. of train batches: {len(train_loader)}")
    print(f"No. of validation batches: {len(valid_loader)}\n")

    # save index and class translation as csv
    df = pd.DataFrame(zip(list(train_data.class_to_idx.values()), list(train_data.class_to_idx.keys())),
                      columns=["idx", "class"])
    df.to_csv("idx_to_classes.csv", index=False, header=True)

    # initialise model with custom parameters
    trainer = IngredientsTrainer(model=CFG.model,
                                 criterion=torch.nn.BCEWithLogitsLoss(),
                                 device=CFG.device,
                                 num_classes=CFG.num_classes,
                                 epochs=CFG.epochs,
                                 lr=CFG.lr)

    # clear GPU cache before prediction
    torch.cuda.empty_cache()

    # train model
    trainer.fit(train_loader, valid_loader)


if __name__ == "__main__":
    run()
