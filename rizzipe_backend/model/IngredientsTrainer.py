import numpy as np
import torch
from tqdm import tqdm


# trainer class to train and evaluate model
class IngredientsTrainer:
    def __init__(self, model, criterion, device, num_classes, epochs, lr):
        self.model = model
        self.criterion = criterion
        self.device = device
        self.num_classes = num_classes
        self.epochs = epochs
        self.lr = lr

        self.load_model()
        self.optimizer = torch.optim.Adam(self.model.parameters(), lr=self.lr)

    # load model with custom number of classes
    def load_model(self):
        out_classes = self.num_classes
        in_feats = self.model.classifier[1].in_features
        self.model.classifier[1] = torch.nn.Linear(in_feats, out_classes)
        self.model.to(self.device)

    # train using each sample and return average loss
    def train(self, data_loader):
        total_loss = 0.0
        total_acc = 0.0

        for imgs, lbls in tqdm(data_loader):
            imgs = imgs.to(self.device)

            # convert class_idx to one hot
            targets = lbls.numpy().reshape(-1)
            lbls_onehot = torch.tensor(np.eye(self.num_classes)[targets]).to(torch.float32)
            lbls_onehot = lbls_onehot.to(self.device)

            # predict and calculate loss
            logits = self.model(imgs)
            loss = self.criterion(logits, lbls_onehot)

            # calculate gradient and backwards propagation
            self.optimizer.zero_grad()
            loss.backward()
            self.optimizer.step()

            total_loss += loss.item()

        return total_loss / len(data_loader)

    # validate through each sample and return average loss
    def valid(self, data_loader):
        total_loss = 0.0
        total_acc = 0.0

        for imgs, lbls in tqdm(data_loader):
            imgs = imgs.to(self.device)

            # convert class_idx to one hot
            targets = lbls.numpy().reshape(-1)
            lbls_onehot = torch.tensor(np.eye(self.num_classes)[targets]).to(torch.float32)
            lbls_onehot = lbls_onehot.to(self.device)

            # predict and calculate loss
            logits = self.model(imgs)
            loss = self.criterion(logits, lbls_onehot)

            total_loss += loss.item()

        return total_loss / len(data_loader)

    # runs train and valid for epochs number of times
    def fit(self, train_loader, valid_loader):
        valid_min_loss = np.Inf

        for i in range(self.epochs):
            self.model.train()
            avg_train_loss = self.train(train_loader)

            self.model.eval()
            avg_valid_loss = self.valid(valid_loader)

            # save model if current model loss is better than minimum loss
            if avg_valid_loss <= valid_min_loss:
                print(f"Valid loss decrease: {valid_min_loss} -> {avg_valid_loss}")
                torch.save(self.model.state_dict(), "IngredientsModel.pt")
                valid_min_loss = avg_valid_loss

            print(f"Epoch: {i} Train Loss: {avg_train_loss}")
            print(f"Epoch: {i} Valid Loss: {avg_valid_loss}")