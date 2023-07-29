import sys

import numpy as np
from matplotlib import pyplot as plt
from matplotlib.backends.backend_pdf import PdfPages
from sklearn.metrics import auc, roc_curve, classification_report, balanced_accuracy_score, accuracy_score, \
    ConfusionMatrixDisplay, confusion_matrix


# evaluator class to evaluate test datasets
class IngredientsEvaluator:
    def __init__(self, idx_to_classes):
        self.idx_to_classes = idx_to_classes
        self.num_classes = len(idx_to_classes)
        self.epsilon = sys.float_info.min

    # plot confusion matrix for all classes
    def confusion_matrix_multilabel(self, lbls, preds, file_path):
        f, axes = plt.subplots(int(self.num_classes / 5) + 1, 5, figsize=(25, self.num_classes))
        axes = axes.ravel()

        # loop through each classes
        for i in range(self.num_classes):
            # get confusion matrix and plot
            disp = ConfusionMatrixDisplay(confusion_matrix(lbls[:, i], preds[:, i], labels=[0, 1]),
                                          display_labels=[0, 1])
            disp.plot(ax=axes[i], values_format='.4g')

            # set title
            disp.ax_.set_title(f'class {i}: {self.idx_to_classes[i]}')
            disp.im_.colorbar.remove()

        plt.subplots_adjust(wspace=0.10, hspace=0.1)
        f.colorbar(disp.im_, ax=axes)
        pdf = PdfPages(file_path)
        pdf.savefig()
        pdf.close()

    # calculate total accuracy score (1 if all labels are right, 0 if any labels are wrong)
    def accuracy_multilabel(self, lbls, preds):
        return accuracy_score(lbls, preds)

    # calculate balanced accuracy score for each class
    def balanced_accuracy_multilabel(self, lbls, preds):
        balanced_accuracy = None

        # loop through each class
        for i in range(self.num_classes):
            # calculate score
            cls_acc = balanced_accuracy_score(lbls[:, i], preds[:, i])

            # append to array
            if balanced_accuracy is None:
                balanced_accuracy = np.array(cls_acc)
            else:
                balanced_accuracy = np.append(balanced_accuracy, cls_acc)

        return balanced_accuracy

    # calculate classification report (precision, recall, f1-score)
    def classification_report_multilabel(self, lbls, preds):
        return classification_report(lbls, preds, target_names=self.idx_to_classes)

    # calculate auroc and plot roc graph
    def auroc(self, lbls, probs, file_path):
        roc = None

        # loop through each class
        for i in range(self.num_classes):
            # get fpr, tpr and thresholds
            fpr, tpr, thresholds = roc_curve(lbls[:, i], probs[:, i])

            # append results to list
            if roc is None:
                roc = [[fpr, tpr, thresholds]]
                auroc = [auc(fpr, tpr)]
            else:
                roc.append([fpr, tpr, thresholds])
                auroc.append(auc(fpr, tpr))

        # create plots
        f, axes = plt.subplots(self.num_classes // 10, 1, figsize=(15, self.num_classes))

        # plot roc curve for each class
        for i, cls in enumerate(self.idx_to_classes):
            ax_i = int(i / 10) - 1
            axes[ax_i].plot(roc[i][0], roc[i][1], label=f"{cls}: {auroc[i]}")

        # set titles, labels and legends for each plot
        for ax in axes:
            ax.set_title('Receiver operating characteristic')
            ax.set_xlabel('false positive rate')
            ax.set_ylabel('true positive rate')
            ax.legend(loc="lower right")

        pdf = PdfPages(file_path)
        pdf.savefig()
        pdf.close()

        return auroc

    # calculates uncertainty using the probability of predicted y being class c given x sample for all samples
    def uncertainty_entropy(self, probs):
        # log base = number of classes
        entropy = np.mean(-(np.sum(probs * np.log(probs + self.epsilon), axis=1)))

        return entropy
