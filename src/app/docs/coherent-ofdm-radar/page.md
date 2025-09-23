---
title: Coherent OFDM Radar Backscatter
nextjs:
  metadata:
    title: Coherent OFDM Radar Backscatter Modelling for Drones
    description: A method for predicting OFDM radar backscatter from uncrewed aerial vehicles (UAVs) using augmented Martin-Mulgrew model and point-scatterer framework.
---

A method for predicting OFDM radar backscatter from uncrewed aerial vehicles (UAVs). It augments the Martin–Mulgrew model and proposes a point-scatterer framework to simulate micro-Doppler and range responses.

---

## Overview

**Title**: Dataset: Baseband simulation data

**Authors**: Daniel Charron, Miodrag Bolic, Iraj Mantegh

**Abstract**: This research presents a method for predicting OFDM radar backscatter from uncrewed aerial vehicles (UAVs). It augments the Martin–Mulgrew model and proposes a point-scatterer framework to simulate micro-Doppler and range responses. The system is tested via full-system simulation with MATLAB Phased Array Toolbox to validate theoretical predictions.

**Keywords**: OFDM, 5G, UAV, micro-Doppler, radar simulation, backscatter modelling

### Research Specifications

```python
# Simulation parameters
simulation_config = {
    "transceiver_frequency": "28-50 GHz OFDM",
    "transmit_power": "3.16-10 W",
    "sampling_frequency": "14.4 MHz",
    "pulse_count": 2000,
    "antenna_config": "Mono-static, single transceiver",
    "target": "4-propeller drone with 4 blades per propeller",
    "propeller_rpm": 20000,
    "range_resolution": "~10.4 m",
    "maximum_range": "~150.8 m"
}
```

---

## Sample & Results Showcase

Theoretical models were validated against MATLAB-based simulations. Micro-Doppler signatures and range-speed plots clearly capture rotational components of drone propellers. Both Martin-Mulgrew and point-scatterer models successfully predict spectral spread and echo responses under OFDM radar pulses.

### Baseline Findings

- **Doppler spread**: Aligned with theoretical bandwidth predictions
- **Rotational frequencies**: 20k RPM, carrier: 28–50 GHz
- **Range resolution**: ~10.4 m
- **Maximum range**: ~150.8 m

![Baseband Frequency Spectrum](https://bnodwlie6g.ufs.sh/f/Uo47cnkptDxChsaA1RS2k4mpN9d5XIxDAb6MtoeuQc07TByO)

The frequency spectrum analysis shows the comparison between simulated and theoretical received signals, demonstrating the effectiveness of our OFDM radar backscatter modeling approach. The plots illustrate:

- **Rx simulation (red)**: Noisy received signal with energy concentrated in the central frequency band
- **Rx theoretical (green)**: Smooth theoretical prediction matching the simulation envelope
- **Transmitted (blue)**: Ideal transmitted signal at center frequency
- **Max ± velocity (gray lines)**: Doppler shift boundaries defining the processing window

```python
# Performance metrics
performance_results = {
    "doppler_spread_alignment": "Theoretical bandwidth predictions",
    "rotational_frequencies": "20k RPM",
    "carrier_frequency": "28-50 GHz",
    "range_resolution": "10.4 m",
    "max_range": "150.8 m",
    "snr_comparison": "Small SNR difference between models"
}
```

In this first simulation, a full system simulation is done in MATLAB's Phased Array package to obtain the backscatter CW radar signal. This noisy signal is compared to the output of the augmented MM model's prediction to show that the same band is occupied though with a small SNR.

---

## Experiment Description

### Simulation Setup

**Simulation Tool**: MATLAB Phased Array Toolbox

**Transceiver Frequency**: 28–50 GHz OFDM

**Transmit Power**: 3.16–10 W

**Sampling Frequency**: 14.4 MHz

**Pulse Count**: 2000 OFDM radar pulses

**Antenna Configuration**: Mono-static, single transceiver

**Target**: 4-propeller drone with 4 blades per propeller

**Propeller RPM**: 20,000

**Backscatter Models**: Martin-Mulgrew (augmented), point-scatterer model

**Simulation Domain**: Static + dynamic (blade) components

### Core Concepts Implemented

- **5G NR-conformant OFDM pulse design**
- **Micro-Doppler signal synthesis for rotating blades**
- **Use of Swerling models for RCS variability**

```matlab
% MATLAB simulation code example
function [backscatter_signal] = simulate_ofdm_radar(params)
    % Generate OFDM subcarriers
    ofdm_signal = generate_ofdm_pulse(params);

    % Apply micro-Doppler effects
    doppler_signal = apply_micro_doppler(ofdm_signal, params.rpm);

    % Simulate backscatter using Martin-Mulgrew model
    backscatter_signal = martin_mulgrew_model(doppler_signal, params);

    % Apply matched filtering
    filtered_signal = matched_filter(backscatter_signal, params);

    return filtered_signal;
end
```

---

## Downloadable Datasets

| Dataset                                | Description                              | Download      |
| -------------------------------------- | ---------------------------------------- | ------------- |
| `DASC_Charron_r_ps.csv`                | Radar point scatterer simulation dataset | [Download](#) |
| `DASC_Charron_r_mm.csv`                | Martin-Mulgrew model dataset             | [Download](#) |
| `DASC_Charron_r_fss.csv`               | Frequency spread signal output           | [Download](#) |
| `DASC_Charron_baseband_TX_fft.csv`     | Baseband transmit FFT spectrum           | [Download](#) |
| `DASC_Charron_baseband_MM_fft.csv`     | MM model FFT response                    | [Download](#) |
| `DASC_Charron_baseband_fss_RX_fft.csv` | Received signal FFT from FSS model       | [Download](#) |

### Dataset Usage

```python
# Load and process radar simulation data
import pandas as pd
import numpy as np

def load_radar_dataset(filename):
    """Load radar simulation dataset"""
    data = pd.read_csv(filename)
    return data

def analyze_micro_doppler(data):
    """Analyze micro-Doppler signatures"""
    # Apply FFT for frequency analysis
    fft_data = np.fft.fft(data['signal'])

    # Apply STFT for time-frequency analysis
    stft_data = apply_stft(data['signal'])

    return fft_data, stft_data

# Example usage
ps_data = load_radar_dataset('DASC_Charron_r_ps.csv')
mm_data = load_radar_dataset('DASC_Charron_r_mm.csv')
```

---

## Code Implementation

Simulation code was written in MATLAB using the Phased Array System Toolbox. Signal models included OFDM subcarrier generation, matched filtering, and micro-Doppler analysis using FFT and Kaiser-window-based STFT. A matched filter was applied with FIR filtering of each radar pulse.

### Key Algorithms

```matlab
% Micro-Doppler analysis with STFT
function [stft_result] = micro_doppler_stft(signal, params)
    % Apply Kaiser window
    window = kaiser(params.window_length, params.beta);

    % Compute STFT
    [S, F, T] = spectrogram(signal, window, params.noverlap, params.nfft, params.fs);

    % Extract micro-Doppler components
    micro_doppler = extract_micro_doppler_components(S, F, T);

    return micro_doppler;
end

% OFDM pulse generation
function [ofdm_pulse] = generate_ofdm_pulse(params)
    % Generate subcarriers
    subcarriers = generate_subcarriers(params.n_subcarriers);

    % Apply 5G NR modulation
    modulated = apply_5g_nr_modulation(subcarriers, params);

    % Add cyclic prefix
    ofdm_pulse = add_cyclic_prefix(modulated, params.cp_length);

    return ofdm_pulse;
end
```

---

## Version History

| Date | Version | Details                                                                                      |
| ---- | ------- | -------------------------------------------------------------------------------------------- |
| 2025 | v1.0    | Initial release of simulation model and theoretical framework for OFDM radar drone detection |

### Future Work

- **v1.1** (Planned): Additional drone models and flight patterns
- **v2.0** (Planned): Real-world validation with hardware-in-the-loop testing

---

## Contact & Support

**Lead Author**: Daniel Charron, University of Ottawa

**Co-authors**: Miodrag Bolic (uOttawa), Iraj Mantegh (NRC Canada)

**Email**: [miodrag.bolic@uottawa.ca](mailto:miodrag.bolic@uottawa.ca)

**Support Timeline**: Usually replies within 72 hours

### Citation

```bibtex
@inproceedings{dasc2025drone,
title={"Coherent OFDM Radar Backscatter Modelling for Drones"},
author={"Daniel Charron and Miodrag Bolic and Iraj Mantegh"},
booktitle={"2025 IEEE Radar Conference (RadarConf)"},
year={2025},
organization={"IEEE"}
}
```

{% callout title="Research Impact" %}
This work provides a comprehensive framework for OFDM radar-based drone detection, enabling improved counter-drone systems and autonomous navigation capabilities through advanced micro-Doppler analysis.
{% /callout %}
