# Mieterstrom Profitability Calculator

A clean, production-ready web application for calculating the profitability of solar energy solutions (Mieterstrom) for apartment buildings.

![Mieterstrom Calculator](https://img.shields.io/badge/Next.js-14-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-cyan)

## 🌟 Features

- **Instant Calculations**: Real-time profitability analysis for solar installations
- **Professional UI**: Clean, modern interface optimized for lead generation
- **Mobile-Responsive**: Works perfectly on desktop, tablet, and mobile devices
- **Type-Safe**: 100% TypeScript for reliability and maintainability
- **Production-Ready**: Includes Netlify deployment configuration

## 📊 Based on Real-World Data

This calculator implements industry-standard assumptions and proven methodologies for accurate Mieterstrom profitability calculations.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm

### Installation
```bash
# Clone the repository
git clone https://github.com/George-A-Nicola/D4d.git
cd D4d

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit http://localhost:3000 to use the calculator.

## 💼 How It Works

### Input Parameters
- **Roof Size (m²)**: Available roof area for solar panels
- **Number of Apartments**: Units in the building
- **Annual Electricity Demand (kWh)**: Total building electricity consumption
- **Building Address** *(optional)*: For reference and labeling

### Calculation Logic
**System Specifications:**
- Solar yield: 950 kWh/kWp/year
- System cost: €1,000/kWp
- Roof efficiency: 5 m²/kWp

**Economic Parameters:**
- Tenant electricity price: €0.30/kWh
- Grid feed-in tariff: €0.08/kWh
- Internal consumption: 35% of solar production
- Grid feed-in: 65% of solar production
- Annual O&M costs: 1% of total investment

### Calculations Performed

1. **System Size**: `Roof size (m²) ÷ 5 = kWp`
2. **Total Investment**: `System size × €1,000`
3. **Annual Production**: `System size × 950 kWh`
4. **Internal Revenue**: `(Production × 35%) × €0.30/kWh`
5. **Feed-in Revenue**: `(Production × 65%) × €0.08/kWh`
6. **Annual O&M Cost**: `Investment × 1%`
7. **Annual Profit**: `Total Revenue - O&M Costs`
8. **Payback Period**: `Investment ÷ Annual Profit`
9. **ROI**: `(Annual Profit ÷ Investment) × 100%`

## 🎯 Example Usage

**Sample Building:**
- Roof Size: 200 m²
- Apartments: 12
- Annual Demand: 48,000 kWh

**Results:**
- System Size: 40 kWp
- Investment: €40,000
- Annual Production: 38,000 kWh
- Annual Profit: €5,566
- ROI: 13.92%
- Payback: 7.2 years

## 🏗️ Technical Architecture

**Frontend:**
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** + **shadcn/ui** for styling
- **Lucide Icons** for professional icons

**Code Quality:**
- Clean, minimal architecture
- Client-side calculations for instant results
- Input validation with error handling
- Mobile-first responsive design

## 🚀 Deployment

### Deploy to Netlify (Recommended)
```bash
# Connect your GitHub repository to Netlify
# Build settings are configured in netlify.toml
# Build command: npm run build
# Publish directory: .next
```

### Deploy to Other Platforms
The application is a standard Next.js app and can be deployed to:
- **Netlify** (recommended) - includes netlify.toml configuration
- **Vercel** 
- **Railway**
- **Docker** containers
- **AWS/GCP/Azure** static hosting

## 📱 User Interface

**Key Features:**
- **Clean Input Form**: Intuitive fields with validation and helpful hints
- **Instant Results**: Professional results display with visual breakdowns
- **Revenue Visualization**: Progress bars showing revenue source distribution
- **Profitability Indicators**: Clear visual feedback on investment viability
- **Assumption Transparency**: Full disclosure of all calculation parameters

**Design Philosophy:**
- **User-Centric**: Optimized for leads and partners to easily understand results
- **Professional**: Clean, trustworthy design suitable for business use
- **Accessible**: Clear typography, good contrast, semantic HTML

## 🎯 Lead Generation Features

This calculator is designed as an effective lead generator:

- **Professional Presentation**: Trustworthy, modern design builds confidence
- **Instant Value**: Real-time results provide immediate value to users
- **Transparent Methodology**: Clear assumptions demonstrate expertise
- **Mobile-Friendly**: Perfect for consultations and on-site assessments
- **Conversion-Optimized**: Clear profitability indicators guide next steps

## 🔧 Development

### Project Structure
```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # App layout
│   └── page.tsx           # Main calculator page
├── components/
│   ├── ui/                # Reusable UI components
│   ├── mieterstrom-form.tsx      # Input form component
│   └── mieterstrom-results.tsx   # Results display component
└── lib/
    ├── mieterstrom-calculator.ts # Core calculation logic
    └── utils.ts                  # Utility functions
```

### Development Commands

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run type-check # TypeScript validation
```

### Key Design Decisions

**Why Client-Side Calculations:**
- Instant results without server dependencies
- Zero backend costs
- Better user experience
- Easier deployment (static hosting)

**Why TypeScript:**
- Catches calculation errors at compile time
- Better developer experience
- Self-documenting code
- Safer refactoring

**Why Minimal Dependencies:**
- Faster loading times
- Easier maintenance
- Smaller bundle size
- Reduced security vulnerabilities

## 🔍 Quality Assurance

**Code Quality:**
- 100% TypeScript coverage
- Clean, maintainable architecture
- Modern React patterns
- Professional error handling

**User Experience:**
- Mobile-responsive design
- Fast loading times
- Intuitive user flow
- Clear visual feedback

**Business Logic:**
- Industry-standard assumptions
- Verified calculation formulas
- Edge case handling
- Clear error messages

## 📈 Future Enhancements

**Potential Additions:**
- PDF export functionality
- Email integration for lead capture
- Advanced scenarios with different tariffs
- Multi-language support
- Solar mapping API integration
- Comparative analysis tools

---

**Built for the renewable energy industry** 🌱

*Professional solar profitability calculations made simple and accessible.*