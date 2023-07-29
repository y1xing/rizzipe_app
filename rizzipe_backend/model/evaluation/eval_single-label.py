import warnings

import numpy as np
import torch
from torchvision import transforms as T, datasets
from torch.utils.data import DataLoader

from model.IngredientsConfiguration import CFG
from model.IngredientsPredictor import IngredientsPredictor
from model.IngredientsEvaluator import IngredientsEvaluator
from model.ResourceMonitor import Monitor


def run():
    warnings.filterwarnings("ignore")

    # custom transforms for test datasets
    test_transform = T.Compose([
        T.Resize(size=(CFG.img_size, CFG.img_size)),
        T.ToTensor(),
        T.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
    ])

    # load and transform test dataset
    test_data = datasets.ImageFolder(CFG.test_path, transform=test_transform)
    print(f"No. of test samples loaded: {len(test_data)}")

    # load test dataset into batches
    test_loader = DataLoader(test_data, batch_size=CFG.batch_size, shuffle=True)
    print(f"No. of test batches loaded: {len(test_loader)}")

    # initialise model and custom weights
    custom_weights = torch.load("../IngredientsModel.pt", map_location=CFG.device)
    predictor = IngredientsPredictor(model=CFG.model,
                                     device=CFG.device,
                                     weights=custom_weights,
                                     num_classes=CFG.num_classes)

    # clear GPU cache before prediction
    torch.cuda.empty_cache()

    # start thread for monitoring of system resources
    monitor = Monitor(0.5)

    # predict on test dataset batches
    all_logits, all_probs, all_preds, all_lbls = predictor.predict_batches(test_loader)

    # end thread for monitoring of system resources
    max_cpu, max_mem, max_gpu = monitor.stop()

    # print model resources
    print("\n[Model Resource Usage Summary]")
    print(f"Max CPU usage: {max_cpu}%\nMax memory usage: {max_mem}%\nMax GPU usage: {max_gpu}%")

    # print model efficiency testing results
    print("\n[Model Efficiency Testing]")
    print(f"No. of samples: {len(test_data)}\nBatch size: {CFG.batch_size}\nNo. of batches: {len(test_loader)}")
    print(f"Inference time:\n\tMean: {np.sum(predictor.timings) / len(test_loader)}s Std: {np.std(predictor.timings)}s")
    print(f"Throughput: {(len(test_loader) * CFG.batch_size) / predictor.total_time}\n")

    # evaluate model on test data
    evaluator = IngredientsEvaluator(CFG.idx_to_classes)
    accuracy = evaluator.accuracy_multilabel(all_lbls, all_preds)
    balanced_accuracy = evaluator.balanced_accuracy_multilabel(all_lbls, all_preds)
    uncertainty_entropy = evaluator.uncertainty_entropy(all_probs.numpy())
    classification_report = evaluator.classification_report_multilabel(all_lbls, all_preds)
    evaluator.confusion_matrix_multilabel(all_lbls, all_preds, "./conf_matrix/conf-matrix_single-label.pdf")
    evaluator.auroc(all_lbls, all_probs, "./auroc/auroc_single-label.pdf")

    # print accuracy score
    print(f"Accuracy score: {accuracy}\n")

    # print classes balanced accuracy score and mean
    print("[Balanced accuracy scores]")
    for i, cls in enumerate(CFG.idx_to_classes):
        print(f"{cls:<25} {balanced_accuracy[i]:>5.2f}")
    print(f"Classes mean balanced accuracy score: {np.mean(balanced_accuracy)}\n")

    # print uncertainty score
    print(f"Uncertainty score: {uncertainty_entropy}\n")

    # print classification report (precision, recall, f1-score)
    print("[Classification Report]")
    print(classification_report)


if __name__ == "__main__":
    run()
