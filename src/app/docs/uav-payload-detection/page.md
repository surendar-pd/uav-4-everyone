---
title: UAV Payload Detection DataSet
nextjs:
  metadata:
    title: UAV Payload Detection DataSet
    description: A synthetic dataset created using AirSim simulation to detect whether drones carry payloads with domain adaptation using CycleGAN.
---

A synthetic dataset created using AirSim simulation to detect whether drones carry payloads. Domain adaptation using CycleGAN enables real-to-synthetic transformation, improving classifier performance.

---

## Overview

**Dataset Name**: UAV Payload Detection Dataset

**Abstract**: A synthetic dataset created using AirSim simulation to detect whether drones carry payloads. Domain adaptation using CycleGAN enables real-to-synthetic transformation, improving classifier performance.

**Stats**: 4538 total images, 2269 per class (Loaded/Unloaded), 4 drone models, 30 FPS simulated capture

**Sensors**: AirSim-generated EO camera, simulated physics engine

**Date Created**: 2023

**DOI**: (To be added)

### Dataset Specifications

```python
# Dataset configuration
dataset_config = {
    "total_images": 4538,
    "loaded_class": 2269,
    "unloaded_class": 2269,
    "drone_models": 4,
    "fps": 30,
    "format": "JPEG",
    "resolution": "1080p",
    "sampling_rate": "1 image every 2 seconds"
}
```

---

## Sample & Results Showcase

Downstream tasks include binary classification (Loaded vs Unloaded UAV). Using ResNet34 + CycleGAN yielded 82% accuracy, EfficientNet-B2 achieved 80% on adapted real-world images.

### Performance Metrics

- **ResNet34 + CycleGAN**: 82% accuracy
- **EfficientNet-B2**: 80% accuracy on adapted real-world images
- **Domain Adaptation**: Significant improvement in real-world performance

```python
# Model performance comparison
performance_metrics = {
    "resnet34_cyclegan": {
        "accuracy": 0.82,
        "precision": 0.84,
        "recall": 0.81,
        "f1_score": 0.82
    },
    "efficientnet_b2": {
        "accuracy": 0.80,
        "precision": 0.79,
        "recall": 0.82,
        "f1_score": 0.80
    }
}
```

---

## Experiment Description

### Simulation Setup

**Simulation Tool**: Microsoft AirSim

**Drone Models**: DJI Mavic, FPV, Inspire, and generic quadrotor

**Scenario**: Synthetic UAVs captured under varying lighting/backgrounds

**Real-world Test**: UAV filmed from observer drone (1080p, 30FPS) with orange box payload

**Format**: JPEG images

**Sampling Rate**: 1 image every 2 seconds in simulation

### Data Collection Process

```python
# AirSim data collection script
import airsim
import cv2
import numpy as np

def collect_uav_data(client, num_images=4538):
    """Collect UAV payload detection data using AirSim"""
    images = []
    labels = []

    for i in range(num_images):
        # Randomize drone configuration
        drone_model = random.choice(['mavic', 'fpv', 'inspire', 'quadrotor'])
        payload_status = random.choice([True, False])  # Loaded/Unloaded

        # Set up drone with/without payload
        setup_drone(client, drone_model, payload_status)

        # Capture image
        response = client.simGetImage("0", airsim.ImageType.Scene)
        img = cv2.imdecode(np.frombuffer(response, np.uint8), cv2.IMREAD_COLOR)

        images.append(img)
        labels.append(1 if payload_status else 0)

    return images, labels
```

---

## Code Example

### Basic Usage

```python
# Load an image using OpenCV
import cv2
img = cv2.imread('path/to/image.jpg')
cv2.imshow("UAV", img)
cv2.waitKey(0)

# Inference using trained model
def predict(model, img):
    transformed = transform_image(img)
    with torch.no_grad():
        output = model(transformed)
    return output.argmax().item()
```

### Domain Adaptation with CycleGAN

```python
# CycleGAN domain adaptation
import torch
from cyclegan import CycleGAN

def adapt_real_to_synthetic(real_image, cyclegan_model):
    """Convert real-world image to synthetic style"""
    with torch.no_grad():
        synthetic_style = cyclegan_model.G_A2B(real_image)
    return synthetic_style

# Training pipeline
def train_with_domain_adaptation(real_data, synthetic_data, model):
    """Train classifier with domain adaptation"""
    # Convert real data to synthetic style
    adapted_real = [adapt_real_to_synthetic(img, cyclegan) for img in real_data]

    # Combine adapted real data with synthetic data
    combined_data = adapted_real + synthetic_data

    # Train classifier
    model.fit(combined_data)
    return model
```

---

## Version History

| Date       | Version | Notes                             |
| ---------- | ------- | --------------------------------- |
| 2023-10-31 | v1.0    | Initial synthetic dataset release |

### Future Releases

- **v1.1** (Planned): Additional drone models and environmental conditions
- **v2.0** (Planned): Multi-class payload classification (different payload types)

---

## Contact & Support

**Maintainer**: UAV4Everyone Research Team

**Email**: [support@uav4everyone.org](mailto:support@uav4everyone.org)

**Typical Response Time**: 48 hours

### Getting Help

For questions about dataset usage, model training, or domain adaptation techniques, please reach out to our research team. We're committed to supporting researchers and developers working on UAV payload detection applications.

{% callout title="Dataset Access" %}
This dataset is available for research and educational purposes. Please contact our team to request access and receive download instructions.
{% /callout %}
