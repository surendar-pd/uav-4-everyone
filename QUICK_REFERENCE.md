# Quick Reference - Adding Datasets to Sanity

## Access Studio
🌐 **Development:** http://localhost:3000/studio
🌐 **Production:** https://your-domain.com/studio

---

## Required Fields

| Field | Format | Example |
|-------|--------|---------|
| **Title** | Title Case | `UAV Flight Dynamics Dataset` |
| **Slug** | lowercase-with-hyphens | `uav-flight-dynamics` |
| **Page Type** | Select "Dataset" | `Dataset` |
| **Meta Description** | Max 160 chars | `A comprehensive dataset of UAV flight dynamics...` |

---

## Content Structure Template

```markdown
## Overview
Brief introduction and key statistics

## Dataset Description
### Sensor Configuration
### Flight Scenarios

## Data Collection
### Equipment
### Labeling Process

## Data Format
### Directory Structure
### Annotation Format

## Download
Links and instructions

## Citation
BibTeX citation

## License
Usage terms
```

---

## Content Blocks

### 📝 Callout Block
**Types:** Note (info) | Warning (caution) | Error (critical)

**When to use:**
- **Note:** Tips, features, requirements
- **Warning:** Limitations, prerequisites
- **Error:** Critical issues, deprecated

### 💻 Code Block
**Fields:**
- Code (required)
- Language: python, javascript, json, yaml, bash, etc.
- Filename (optional - shows as header)

**Always specify language for syntax highlighting!**

### 🖼️ Image Block
**Fields:**
- Image file (JPG, PNG, WebP)
- Alt text (required - describe the image)
- Caption (optional - displays below)
- Layout: Standard | Side by Side

**Max width:** 1920px recommended

### 📊 Table Block
**Format:**
- Headers: `Column1,Column2,Column3` (comma-separated)
- Rows: Click "+ Add Row", then add cells comma-separated
- Caption: Optional table title

---

## Before Publishing Checklist

- [ ] Title in Title Case
- [ ] Slug is lowercase-with-hyphens
- [ ] Page Type = "Dataset"
- [ ] Meta Description < 160 characters
- [ ] All images have alt text
- [ ] Code blocks specify language
- [ ] Tables have headers
- [ ] Content starts with Overview
- [ ] Citation included
- [ ] License specified

---

## Common Mistakes to Avoid

❌ Using H1 headings (title is automatic)
❌ Missing alt text on images
❌ Code blocks without language specified
❌ Meta description over 160 characters
❌ Changing slug after publishing
❌ Using "click here" for links
❌ Forgetting to set Page Type to "Dataset"

---

## Example BibTeX Citation

```bibtex
@article{author2024dataset,
  title={Your Dataset Title},
  author={Last, First and Last, First},
  journal={Journal Name},
  year={2024},
  volume={10},
  pages={123-145}
}
```

---

## Need Help?

1. Review existing datasets in Studio
2. Check DATASET_CONTENT_GUIDE.md for details
3. Contact development team

**Last Updated:** 2025-01-29
