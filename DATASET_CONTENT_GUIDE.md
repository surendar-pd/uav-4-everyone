# Dataset Content Guide - UAV 4 Everyone

This guide will help you add new dataset pages to the UAV 4 Everyone platform using Sanity Studio.

## Table of Contents
- [Getting Started](#getting-started)
- [Creating a New Dataset Page](#creating-a-new-dataset-page)
- [Required Fields](#required-fields)
- [Content Formatting](#content-formatting)
- [Available Content Blocks](#available-content-blocks)
- [Best Practices](#best-practices)
- [Examples](#examples)

---

## Getting Started

### Accessing Sanity Studio

1. Navigate to the Studio at: `http://localhost:3000/studio` (development) or `https://your-domain.com/studio` (production)
2. Log in with your Sanity account credentials
3. Click on **"Page"** in the sidebar to see all pages

---

## Creating a New Dataset Page

### Step 1: Create New Page

1. Click the **"+" button** or **"Create new"** in Sanity Studio
2. Select **"Page"** from the document types

### Step 2: Fill Required Fields

#### **Title** (Required)
- The main title of your dataset
- **Format:** Use title case
- **Example:** `"UAV Flight Dynamics Dataset"` or `"Thermal Imaging for Drones"`
- **Best Practice:** Keep it descriptive but concise (max 60 characters)

#### **Slug** (Required)
- URL-friendly identifier for your dataset page
- **Format:** lowercase, use hyphens instead of spaces
- **Example:** `uav-flight-dynamics` or `thermal-imaging-drones`
- **Important:** Once published, avoid changing the slug as it will break existing links
- Click **"Generate"** button to auto-generate from title

#### **Page Type** (Required)
- Select **"Dataset"** from the dropdown
- This ensures your page appears in the Datasets section of the navigation

#### **Meta Description** (Optional but Recommended)
- Brief description for SEO and search results
- **Character Limit:** 160 characters maximum
- **Example:** `"A comprehensive dataset of UAV flight dynamics including IMU data, GPS coordinates, and flight telemetry from 200+ flight hours."`
- **Best Practice:** Include key information: what, scope, and unique features

---

## Content Formatting

### Content Structure

Organize your content using headings to create a clear hierarchy:

```
# Main Title (automatically added from Title field)

## Overview
Brief introduction to the dataset

## Dataset Description
Detailed information about what the dataset contains

## Data Collection
How the data was collected

## Data Format
Structure and format of the dataset files

## Download
Links and instructions for downloading

## Citation
How to cite this dataset

## License
Usage terms and conditions
```

### Heading Guidelines

- **H2 (`##`)**: Main sections (Overview, Dataset Description, etc.)
- **H3 (`###`)**: Subsections within main sections
- **Do not use H1 (`#`)** - The page title is automatically H1

**Example:**
```markdown
## Dataset Description

### Sensor Configuration
Details about sensors used...

### Flight Conditions
Environmental conditions during data collection...
```

---

## Available Content Blocks

Sanity provides several custom content blocks to enhance your dataset pages:

### 1. **Regular Text**
- Use the text editor for paragraphs, lists, bold, italic, and links
- **Bold:** Select text and click **B** or use `Ctrl/Cmd + B`
- **Italic:** Select text and click *I* or use `Ctrl/Cmd + I`
- **Link:** Select text, click link icon, paste URL

### 2. **Callout Block**

Use callouts to highlight important information.

**Available Types:**
- **Note:** General information (blue)
- **Warning:** Important warnings (yellow)
- **Error:** Critical errors or limitations (red)

**When to Use:**
- **Note:** Dataset features, requirements, or helpful tips
- **Warning:** Data limitations, known issues, or important prerequisites
- **Error:** Critical issues, deprecated data, or breaking changes

**How to Add:**
1. Click **"+"** button in content
2. Select **"Callout Block"**
3. Add **Title** (optional but recommended)
4. Select **Type** (note, warning, or error)
5. Add **Content** (supports text formatting)

**Example:**
```
Title: Prerequisites
Type: Note
Content: You need Python 3.8+ and the UAV-tools package to process this dataset.
```

### 3. **Code Block**

For displaying code samples, configuration files, or data formats.

**How to Add:**
1. Click **"+"** button in content
2. Select **"Code Block"**
3. Add **Code** (your code snippet)
4. Select **Language** (python, javascript, json, yaml, bash, etc.)
5. Add **Filename** (optional - shows as header)

**Example:**
```python
# Filename: load_dataset.py
import pandas as pd

df = pd.read_csv('uav_flight_data.csv')
print(f"Loaded {len(df)} flight records")
```

**Best Practices:**
- Always specify the language for syntax highlighting
- Add filename when showing file contents
- Keep code examples concise and focused

### 4. **Image Block**

For adding images, diagrams, charts, or screenshots.

**How to Add:**
1. Click **"+"** button in content
2. Select **"Image Block"**
3. Click **"Upload"** to add image
4. Add **Alt Text** (required for accessibility)
5. Add **Caption** (optional - displays below image)
6. Select **Layout**:
   - **Standard:** Full-width single image (default)
   - **Side by Side:** Two images displayed side-by-side

**Image Guidelines:**
- **Supported formats:** JPG, PNG, WebP
- **Recommended size:** Max 1920px width
- **Alt text:** Describe what's in the image (e.g., "UAV sensor configuration diagram")
- **File naming:** Use descriptive names (e.g., `sensor-setup.jpg`, not `IMG_1234.jpg`)

**When to Use:**
- Dataset visualization examples
- Sensor configurations
- Data distribution charts
- Example outputs
- Equipment photos

### 5. **Table Block**

For structured data like specifications, comparisons, or data schemas.

**How to Add:**
1. Click **"+"** button in content
2. Select **"Table Block"**
3. Add **Headers** (column names, comma-separated)
   - Example: `Sensor,Model,Frequency,Range`
4. Add **Rows** (click "+ Add Row" for each data row)
   - For each row, add **Cells** (comma-separated values)
   - Example: `IMU,MPU-9250,400 Hz,±16g`
5. Add **Caption** (optional - table title)

**Example:**
```
Caption: Sensor Specifications
Headers: Sensor,Model,Frequency,Range
Row 1: IMU,MPU-9250,400 Hz,±16g
Row 2: GPS,u-blox M8,10 Hz,N/A
Row 3: Barometer,MS5611,100 Hz,10-1200 mbar
```

**Best Practices:**
- Keep tables simple and readable
- Use headers that clearly describe each column
- Align data types in columns
- Add caption to explain what the table shows

---

## Best Practices

### Writing Style

1. **Be Clear and Concise**
   - Use simple, direct language
   - Avoid jargon unless necessary
   - Define technical terms when first used

2. **Use Consistent Terminology**
   - Stick to the same terms throughout (e.g., don't switch between "UAV", "drone", and "aircraft")

3. **Active Voice**
   - ✅ "We collected data using a DJI Mavic"
   - ❌ "Data was collected using a DJI Mavic"

### Structure and Organization

1. **Start with Overview**
   - First section should summarize the dataset
   - Include key statistics (size, duration, samples)

2. **Logical Flow**
   ```
   Overview → Description → Collection → Format → Download → Citation → License
   ```

3. **Use Lists for Multiple Items**
   - Use bullet points for features
   - Use numbered lists for steps or procedures

4. **Group Related Information**
   - Use H3 subsections within H2 sections
   - Keep related content together

### Links and Downloads

1. **External Links**
   - Use descriptive link text (not "click here")
   - ✅ "Download the [UAV Flight Dataset](https://example.com/dataset)"
   - ❌ "Click [here](https://example.com/dataset) to download"

2. **Internal References**
   - Link to related datasets when relevant
   - Reference other sections if needed

### Images and Media

1. **Every Image Needs Alt Text**
   - Describe the image content
   - Help users with screen readers

2. **Use Captions**
   - Explain what the image shows
   - Add context if needed

3. **Image Placement**
   - Place images near related text
   - Use side-by-side layout for comparisons

---

## Complete Example

Here's a complete example of a well-formatted dataset page:

### Basic Information
```
Title: Thermal Imaging Dataset for UAV Detection
Slug: thermal-uav-detection
Page Type: Dataset
Meta Description: High-resolution thermal imagery dataset containing 10,000+ labeled UAV detections across various weather conditions and altitudes.
```

### Content Structure

```markdown
## Overview

This dataset contains 10,247 thermal images captured during UAV flight operations across 8 different environments. Each image is labeled with bounding boxes for UAV detection tasks.

**Dataset Statistics:**
- Total Images: 10,247
- Labeled UAVs: 15,392
- Environments: Urban, Rural, Coastal, Desert, Forest, Mountain, Arctic, Industrial
- Weather Conditions: Clear, Cloudy, Rainy, Foggy, Snowy
- Time of Day: Dawn, Day, Dusk, Night
- Image Resolution: 640×512 pixels
- Format: FLIR radiometric JPEG

## Dataset Description

### Sensor Configuration

[TABLE BLOCK]
Caption: Thermal Camera Specifications
Headers: Parameter,Value
Rows:
- Camera Model,FLIR Duo Pro R
- Resolution,640×512 pixels
- Spectral Range,7.5-13.5 μm
- Frame Rate,30 Hz
- Temperature Range,-40°C to 550°C

### Flight Scenarios

The dataset includes UAVs at various:
- **Altitudes:** 10m to 120m AGL
- **Speeds:** Hover to 15 m/s
- **Orientations:** Front, side, bottom, and oblique views
- **UAV Types:** Quadcopters, hexacopters, fixed-wing

[IMAGE BLOCK]
Image: example-detections.jpg
Alt: Example thermal images showing UAV detections in different conditions
Caption: Sample detections across various environmental conditions

## Data Collection

### Equipment

Data was collected using a ground-based FLIR thermal camera mounted on a pan-tilt unit. The system automatically tracked UAVs while recording thermal imagery.

[CALLOUT BLOCK - Note]
Title: Collection Period
Content: Data was collected between January 2023 and December 2023, ensuring seasonal variation in environmental conditions.

### Labeling Process

All images were manually annotated by trained operators using the CVAT annotation tool. Each bounding box includes:
- UAV position (x, y, width, height)
- UAV type classification
- Confidence score
- Occlusion flag

## Data Format

### Directory Structure

[CODE BLOCK]
Language: bash
Filename: dataset-structure.txt
Code:
thermal-uav-dataset/
├── images/
│   ├── train/
│   ├── val/
│   └── test/
├── labels/
│   ├── train/
│   ├── val/
│   └── test/
├── metadata.json
└── README.txt

### Annotation Format

Labels are provided in YOLO format:

[CODE BLOCK]
Language: txt
Filename: example-label.txt
Code:
0 0.512 0.384 0.094 0.112
0 0.698 0.521 0.087 0.103

Where each line represents: `class x_center y_center width height` (normalized 0-1)

### Metadata File

[CODE BLOCK]
Language: json
Filename: metadata.json
Code:
{
  "image_id": "thermal_001234",
  "timestamp": "2023-06-15T14:32:18Z",
  "environment": "urban",
  "weather": "clear",
  "temperature": 28.5,
  "altitude_agl": 45.2,
  "num_uavs": 1
}

## Download

[CALLOUT BLOCK - Warning]
Title: Dataset Size
Content: The complete dataset is approximately 12 GB. Ensure you have sufficient storage space before downloading.

**Download Options:**
- [Full Dataset (12 GB)](https://example.com/thermal-uav-full.zip)
- [Training Set Only (8 GB)](https://example.com/thermal-uav-train.zip)
- [Sample Subset (500 MB)](https://example.com/thermal-uav-sample.zip)

### Checksum Verification

[CODE BLOCK]
Language: bash
Code:
# Verify download integrity
sha256sum thermal-uav-full.zip
# Expected: a1b2c3d4e5f6...

## Citation

If you use this dataset in your research, please cite:

[CODE BLOCK]
Language: bibtex
Code:
@article{smith2024thermal,
  title={Thermal Imaging Dataset for UAV Detection},
  author={Smith, John and Doe, Jane},
  journal={Journal of UAV Research},
  year={2024},
  volume={10},
  pages={123-145}
}

## License

This dataset is released under the **Creative Commons Attribution 4.0 International License (CC BY 4.0)**.

**You are free to:**
- Share — copy and redistribute the material
- Adapt — remix, transform, and build upon the material

**Under the following terms:**
- Attribution — You must give appropriate credit and cite the dataset

[CALLOUT BLOCK - Note]
Title: Commercial Use
Content: This dataset may be used for commercial purposes with proper attribution.
```

---

## Checklist Before Publishing

Before publishing your dataset page, verify:

- [ ] **Title** is descriptive and follows title case
- [ ] **Slug** is lowercase with hyphens (auto-generated is fine)
- [ ] **Page Type** is set to "Dataset"
- [ ] **Meta Description** is under 160 characters
- [ ] Content starts with an **Overview** section
- [ ] All **images have alt text** and meaningful filenames
- [ ] **Code blocks** specify the programming language
- [ ] **Tables** have clear headers and captions
- [ ] **External links** use descriptive text
- [ ] **Callouts** are used appropriately (Note/Warning/Error)
- [ ] Content follows the **logical structure** (Overview → Description → Collection → Format → Download → Citation → License)
- [ ] **Headings** create a clear hierarchy (H2 for sections, H3 for subsections)
- [ ] Text is **proofread** for spelling and grammar
- [ ] **Citation** information is included
- [ ] **License** terms are clearly stated

---

## Getting Help

If you need assistance:

1. **Review existing datasets** in Sanity Studio for examples
2. **Check this guide** for formatting and structure
3. **Contact the development team** for technical issues
4. **Test in preview mode** before publishing

---

## Quick Reference

### Common Content Blocks

| Block Type | Use For | Required Fields |
|------------|---------|----------------|
| **Text** | Paragraphs, lists | Content |
| **Callout** | Important notes | Title, Type, Content |
| **Code** | Code samples, configs | Code, Language |
| **Image** | Photos, diagrams | Image file, Alt text |
| **Table** | Structured data | Headers, Rows |

### Heading Hierarchy

```
H1 - Page Title (automatic from Title field)
├── H2 - Main Section
│   ├── H3 - Subsection
│   │   └── Regular text, blocks
│   └── H3 - Another Subsection
└── H2 - Another Main Section
```

### Callout Types

- **Note** 💙 - Information, tips, features
- **Warning** 💛 - Cautions, limitations, prerequisites
- **Error** ❤️ - Critical issues, deprecated items

---

**Last Updated:** 2025-01-29
**Version:** 1.0
