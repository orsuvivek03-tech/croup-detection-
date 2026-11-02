#!/usr/bin/env python3
"""
PlantVillage Model Evaluation Script
Computes Test Accuracy, Loss, Confusion Matrix, and Classification Report.
Usage:
    python evaluate_metrics.py --test_dir ./dataset/plantvillage/val --model plant_disease_model.h5
"""

import argparse
import numpy as np
import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from sklearn.metrics import classification_report, confusion_matrix

def evaluate_model(test_dir="./dataset/plantvillage/val", model_path="plant_disease_model.h5"):
    print(f"Loading test dataset from: {test_dir}")
    test_datagen = ImageDataGenerator(rescale=1.0 / 255.0)

    test_generator = test_datagen.flow_from_directory(
        test_dir,
        target_size=(224, 224),
        batch_size=32,
        class_mode="categorical",
        shuffle=False
    )

    print(f"Loading model from: {model_path}...")
    model = tf.keras.models.load_model(model_path)

    # 1. Compute Test Loss & Accuracy
    loss, accuracy = model.evaluate(test_generator)
    print(f"\n==========================================")
    print(f"📈 OVERALL TEST EVALUATION METRICS:")
    print(f"Test Accuracy: {accuracy * 100:.2f}%")
    print(f"Test Loss:     {loss:.4f}")
    print(f"==========================================")

    # 2. Compute Predictions
    preds = model.predict(test_generator)
    y_pred = np.argmax(preds, axis=1)
    y_true = test_generator.classes
    target_names = list(test_generator.class_indices.keys())

    # 3. Print Classification Report (Precision, Recall, F1)
    print("\nDetailed Per-Class Classification Report:")
    print(classification_report(y_true, y_pred, target_names=target_names))

    # 4. Confusion Matrix
    cm = confusion_matrix(y_true, y_pred)
    print("\nConfusion Matrix Shape:", cm.shape)
    print("Diagonal accuracy summary:")
    for idx, name in enumerate(target_names):
        class_acc = cm[idx, idx] / max(1, np.sum(cm[idx, :])) * 100
        print(f"  - {name:<35}: {class_acc:5.1f}% correct")

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--test_dir", type=str, default="./dataset/plantvillage/val")
    parser.add_argument("--model", type=str, default="plant_disease_model.h5")
    args = parser.parse_args()
    try:
        evaluate_model(args.test_dir, args.model)
    except Exception as e:
        print(f"Evaluation error: {e}")
