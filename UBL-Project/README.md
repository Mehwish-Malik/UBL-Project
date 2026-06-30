# UBL Nexus AI

> **Your Financial World, Connected** — The Central AI Hub for All Your Banking Needs

A premium enterprise-grade AI banking platform built with Next.js 15, TypeScript, and Tailwind CSS. UBL Nexus AI represents the central intelligence layer that connects voice banking, fraud protection, loan guidance, and financial wellness into one unified AI-powered banking experience.

## 🚀 Core Features

- **AI Voice Banking Assistant**: Natural language processing for seamless banking interactions
- **Real-Time Fraud Protection**: AI-powered security monitoring and threat detection
- **Loan Eligibility Intelligence**: Smart loan analysis and personalized recommendations
- **Financial Health Analytics**: Comprehensive wellness tracking with actionable insights
- **Connected Intelligence**: Unified AI hub for all banking needs

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: Custom shadcn/ui-style components
- **Charts**: Recharts
- **Icons**: Lucide React

## 📁 Project Structure

```
ubl-project/
├── app/                          # Next.js App Router pages
│   ├── dashboard/               # Dashboard page
│   ├── voice-assistant/         # Voice Assistant page
│   ├── fraud-alerts/            # Fraud Alerts page
│   ├── loan-checker/            # Loan Eligibility page
│   ├── financial-health/        # Financial Health page
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home page (redirects to dashboard)
│   └── globals.css              # Global styles
├── components/                   # Reusable components
│   ├── ui/                      # Base UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   └── input.tsx
│   ├── layout/                  # Layout components
│   │   ├── sidebar.tsx
│   │   ├── navbar.tsx
│   │   └── main-layout.tsx
│   ├── dashboard/               # Dashboard-specific components
│   │   └── stat-card.tsx
│   └── charts/                  # Chart components
│       ├── bar-chart-card.tsx
│       ├── line-chart-card.tsx
│       └── pie-chart-card.tsx
├── data/                        # Mock data
│   └── mock-data.ts
├── lib/                         # Utility functions
│   └── utils.ts
├── types/                       # TypeScript types
│   └── index.ts
└── public/                      # Static assets
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn or pnpm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ubl-project
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🏗️ Build

```bash
npm run build
npm start
```

## 👥 Team Collaboration

### Branch Strategy

- `main` - Production-ready code
- `develop` - Development branch
- `feature/*` - Feature branches
- `fix/*` - Bug fix branches

### Member Responsibilities

**Member 1 (Frontend Developer)**: 
- UI/UX implementation
- Component development
- Responsive design

**Member 2**: 
- Backend API integration
- Data management

**Member 3**: 
- AI/Voice integration
- Fraud detection logic

**Member 4**: 
- Testing & QA
- Deployment

## 📝 Component Usage Examples

### Using StatCard

```tsx
import { StatCard } from '@/components/dashboard/stat-card';
import { Wallet } from 'lucide-react';

<StatCard
  title="Total Balance"
  value="PKR 1,250K"
  change="+12.5% from last month"
  changeType="positive"
  icon={Wallet}
  iconColor="bg-emerald-600"
/>
```

### Using Charts

```tsx
import { BarChartCard } from '@/components/charts/bar-chart-card';

<BarChartCard
  title="Monthly Spending"
  description="Last 6 months"
  data={chartData}
  dataKeys={[
    { key: 'spending', color: '#ef4444', name: 'Spending' }
  ]}
/>
```

## 🎨 Design System

### Brand Identity

**UBL Nexus AI** represents the central intelligence layer that connects voice banking, fraud protection, loan guidance, and financial wellness into one unified AI-powered banking experience.

**Tagline**: Your Financial World, Connected  
**Description**: The Central AI Hub for All Your Banking Needs

### Color Palette

#### Primary Banking Blue
- Brand Primary: `#0052D4` (Banking Blue)
- Brand Secondary: `#0041a8` (Dark Blue)
- Brand Accent: `#003d9e` (Deep Blue)

#### Supporting Colors
- Background: Slate `#020617` (`slate-950`), `#0f172a` (`slate-900`)
- Text Primary: `#f1f5f9` (`slate-100`)
- Text Secondary: `#94a3b8` (`slate-400`)
- Text Muted: `#64748b` (`slate-500`)

#### Status Colors
- Success: Banking Blue `#0052D4`
- Warning: Amber `#f59e0b` (`amber-500`)
- Danger: Red `#ef4444` (`red-500`)
- Info: Blue `#2563eb` (`blue-600`)

### Logo Specifications

**Premium Badge Design**:
- Background: Gradient from `#0052D4` to `#003d9e`
- Text: White typography
- Rounded corners: 8px
- Shadow: `shadow-lg shadow-blue-900/20`
- Layout: Stacked "UBL" / "Nexus AI"

### Typography

- Headers: Bold, Slate-100
- Body: Regular, Slate-400
- Small text: Slate-500

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🔒 Security Features

- Voice biometric authentication (planned)
- Real-time fraud detection
- Secure transaction monitoring
- Multi-factor authentication support

## 🤝 Contributing

1. Create a feature branch from `develop`
2. Make your changes
3. Write/update tests if needed
4. Submit a pull request to `develop`
5. Wait for code review

## 📄 License

This project is part of the UBL SafeVoice AI hackathon.

## 🙏 Acknowledgments

- UBL Bank for the hackathon opportunity
- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
