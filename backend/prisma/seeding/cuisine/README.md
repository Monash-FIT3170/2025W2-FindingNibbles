# Cuisine Generation System

This directory contains all files related to restaurant cuisine assignment and enhancement.

## 📁 **File Structure**

### **Scripts**

- `generate-cuisines-resumable.ts` - Main AI-powered cuisine generation (uses Gemini API)
- `enhance-cuisines-keywords.ts` - Keyword-based cuisine enhancement (adds missing cuisines)

### **Data Files**

- `restaurants_with_cuisines.json` - ✨ **Enhanced restaurant data** (AI + keyword cuisines)
- `restaurants_cleaned.json` - Clean restaurant data source
- `restaurants.csv` - Original CSV data (kept for reference)

### **Documentation**

- `GEMINI_CUISINE_ASSIGNMENT.md` - Technical documentation for AI assignment process

## 🚀 **Usage**

### **1. Generate AI Cuisines (First Time)**

```bash
npm run db:generate-cuisines
```

- Uses Gemini AI to assign up to 3 cuisines per restaurant
- Processes 6,972+ restaurants in batches of 200
- Prioritizes restaurants by distance from Melbourne CBD
- Resumable if interrupted by rate limits

### **2. Enhance with Keywords**

```bash
npm run db:enhance-cuisines
```

- Adds keyword-detected cuisines that AI might have missed
- Only adds non-duplicate cuisines
- Preserves existing AI assignments

### **3. Validate Results**

```bash
npm run db:validate-cuisines
```

- Checks cuisine assignment quality
- Shows statistics and distribution
- Validates against approved cuisine list

### **4. Seed Database**

```bash
npm run db:seed
```

- Uses enhanced restaurant data automatically
- Creates all restaurants with proper cuisine relationships

## 🔄 **Workflow**

1. **Initial Setup**: Run `db:generate-cuisines` to get AI assignments
2. **Enhancement**: Run `db:enhance-cuisines` to add keyword-based cuisines
3. **Validation**: Run `db:validate-cuisines` to check quality
4. **Seeding**: Run `db:seed` to populate database

## 📊 **Data Quality**

The enhanced data combines:

- 🤖 **AI Intelligence**: Context-aware cuisine assignment from restaurant names/addresses
- 🔍 **Keyword Matching**: Catches obvious patterns (e.g., "Sushi" → Japanese, "Pizza" → Italian)
- ✅ **Validation**: All cuisines verified against comprehensive 90+ cuisine list

## 🛠 **Technical Details**

- **API**: Google Gemini 1.5 Flash for AI assignments
- **Rate Limiting**: 3-second delays, resumable processing
- **Distance Calculation**: Haversine formula for Melbourne CBD proximity
- **Cuisine Coverage**: 90+ international cuisine types with descriptions
- **Batch Processing**: 200 restaurants per API call for efficiency
