import torch
# from matplotlib import pyplot as plt
from torchvision import transforms as T


# def display_img(img):
#     if type(img) is not torch.Tensor:
#         transform = T.ToTensor()
#         img = transform(img)
#
#     plt.imshow(img.permute(1, 2, 0))
#     plt.show()


def encode_label(lbls, idx_to_classes):
    target = torch.zeros(len(idx_to_classes))
    for x in lbls:
        if x in idx_to_classes:
            idx = idx_to_classes.index(x)
            target[idx] = 1

    return target


def decode_target(preds, idx_to_classes):
    indices = [i for i, x in enumerate(preds) if x == 1]
    classes = [idx_to_classes[i] for i in indices]

    return classes
