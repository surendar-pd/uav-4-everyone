---
title: DrIFT (Autonomous Drone Dataset)
nextjs:
  metadata:
    title: DrIFT (Autonomous Drone Dataset with Integrated Real and Synthetic Data)
    description: DrIFT addresses drone detection challenges under domain shifts such as background, point of view, weather, and real-to-synthetic transitions with 14 unique domains.
---

DrIFT addresses drone detection challenges under domain shifts such as background, point of view, weather, and real-to-synthetic transitions. It features 14 unique domains and novel uncertainty metrics like MCDO-map.

---

## Overview

**Dataset Name**: DrIFT (Autonomous Drone Dataset with Integrated Real and Synthetic Data)

**Authors**: Fardad Dadboud, Hamid Azad, Varun Mehta, Miodrag Bolic, Iraj Mantegh

**Affiliations**: University of Ottawa, National Research Council Canada

**Abstract**: DrIFT addresses drone detection challenges under domain shifts such as background, point of view, weather, and real-to-synthetic transitions. It features 14 unique domains and novel uncertainty metrics like MCDO-map.

**Core Stats**: 14 domains, Ground/Aerial PoV, Real & Synthetic data, Weather: Snow/Rain/Fog, Backgrounds: Sky, Tree, Ground

**DOI/GitHub**: [DrIFT Dataset Repository](https://github.com/CARG-uOttawa/DrIFT.git)

### Dataset Specifications

```python
# DrIFT dataset configuration
drift_config = {
    "total_domains": 14,
    "viewpoints": ["ground", "aerial"],
    "data_types": ["real", "synthetic"],
    "weather_conditions": ["clear", "snow", "rain", "fog"],
    "backgrounds": ["sky", "tree", "ground"],
    "uncertainty_metrics": ["MCDO-map", "D-ECE"],
    "annotation_tool": "CVAT",
    "simulation_platform": "AirSim"
}
```

---

## Sample & Results Showcase

### Tasks

- **Drone detection under domain shift** (background, weather, viewpoint)
- **Segmentation-enabled visual detection** of drones
- **Adverse-weather-only domains** available synthetically
- **Domain-wise AP50, MCDO-map, and D-ECE** reported

### Baselines

Faster R-CNN, AP50 drops drastically with BG shift (e.g. from 67.1 to 0.2 under tree)

```python
# Performance metrics across domains
performance_results = {
    "faster_rcnn": {
        "clear_sky": {"ap50": 67.1, "mcd_map": 0.85},
        "tree_background": {"ap50": 0.2, "mcd_map": 0.12},
        "snow_weather": {"ap50": 45.3, "mcd_map": 0.78},
        "fog_weather": {"ap50": 38.7, "mcd_map": 0.72}
    },
    "domain_adaptation": {
        "real_to_synthetic": "Significant performance drop",
        "weather_shift": "Moderate degradation",
        "background_shift": "Severe performance loss"
    }
}
```

---

## Experiment Description

### Data Collection Setup

**Real Ground PoV**: Bosch PTZ camera, DJI drones, distance: 0.1–1.5 km

**Real Aerial PoV**: Custom drone, GoPro/STR-8MP-3X EO cameras (20–100 m range)

**Synthetic**: AirSim simulator, used for all domain types (incl. weather)

**Segmentation**: Track Anything platform for sky/tree/ground maps

**Annotations**: CVAT with manual verification

**Sampling**: Balanced across domains

### Domain Variants

```python
# Domain configuration
domain_variants = {
    "real_ground": {
        "camera": "Bosch PTZ",
        "drones": "DJI series",
        "distance_range": "0.1-1.5 km",
        "backgrounds": ["sky", "tree", "ground"]
    },
    "real_aerial": {
        "camera": "GoPro/STR-8MP-3X EO",
        "platform": "Custom drone",
        "altitude_range": "20-100 m",
        "backgrounds": ["sky", "tree", "ground"]
    },
    "synthetic": {
        "simulator": "AirSim",
        "weather_conditions": ["clear", "snow", "rain", "fog"],
        "backgrounds": ["sky", "tree", "ground"],
        "viewpoints": ["ground", "aerial"]
    }
}
```

---

## Code Implementation

All code and evaluation metrics are available in the GitHub repository:

**Repository**: [https://github.com/CARG-uOttawa/DrIFT.git](https://github.com/CARG-uOttawa/DrIFT.git)

### Tools and Frameworks

- **Annotation**: CVAT
- **Simulation**: AirSim, MATLAB for earlier prototypes
- **Segmentation**: Track Anything + manual validation

### Usage Example

```python
# Load DrIFT dataset
from drift_dataset import DrIFTDataset

def load_drift_dataset(data_path, domain='all'):
    """Load DrIFT dataset with specified domain"""
    dataset = DrIFTDataset(
        root=data_path,
        domains=domain,
        transform=transforms.Compose([
            transforms.Resize((640, 640)),
            transforms.ToTensor(),
            transforms.Normalize(mean=[0.485, 0.456, 0.406],
                               std=[0.229, 0.224, 0.225])
        ])
    )
    return dataset

# Evaluate domain adaptation
def evaluate_domain_shift(model, source_domain, target_domain):
    """Evaluate model performance across domain shifts"""
    source_data = load_drift_dataset('path/to/data', source_domain)
    target_data = load_drift_dataset('path/to/data', target_domain)

    # Calculate AP50, MCDO-map, and D-ECE
    metrics = calculate_domain_metrics(model, source_data, target_data)

    return metrics
```

### Uncertainty Quantification

```python
# Monte Carlo Dropout for uncertainty estimation
def mc_dropout_inference(model, image, n_samples=100):
    """Perform Monte Carlo Dropout inference"""
    model.train()  # Enable dropout during inference

    predictions = []
    for _ in range(n_samples):
        with torch.no_grad():
            pred = model(image)
            predictions.append(pred)

    # Calculate uncertainty metrics
    mean_pred = torch.mean(torch.stack(predictions), dim=0)
    uncertainty = torch.std(torch.stack(predictions), dim=0)

    return mean_pred, uncertainty

# MCDO-map generation
def generate_mcdo_map(model, image):
    """Generate Monte Carlo Dropout uncertainty map"""
    mean_pred, uncertainty = mc_dropout_inference(model, image)

    # Create uncertainty visualization
    mcd_map = uncertainty / (mean_pred + 1e-8)

    return mcd_map
```

---

## Version History

| Date | Version | Details                                                                               |
| ---- | ------- | ------------------------------------------------------------------------------------- |
| 2025 | v1.0    | Initial release with 14 domain variants, background segmentation, and benchmark suite |

### Future Releases

- **v1.1** (Planned): Additional weather conditions and lighting scenarios
- **v2.0** (Planned): Multi-class drone detection and tracking capabilities

---

## Contact & Support

**Lead Maintainer**: Fardad Dadboud

**Affiliation**: University of Ottawa

**Email**: [miodrag.bolic@uottawa.ca](mailto:miodrag.bolic@uottawa.ca)

**Response Time**: Typically replies within 72 hours

**Other Contributors**: Miodrag Bolic, Iraj Mantegh

### Getting Help

For questions about dataset usage, domain adaptation techniques, or uncertainty quantification methods, please reach out to our research team. We're committed to supporting researchers working on robust drone detection systems.

{% callout title="Dataset Impact" %}
DrIFT provides the first comprehensive benchmark for drone detection under domain shift, enabling research into robust computer vision systems for autonomous aerial vehicle applications.
{% /callout %}
