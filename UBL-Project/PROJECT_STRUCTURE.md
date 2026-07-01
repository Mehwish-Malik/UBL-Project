# UBL Nexus AI - Project Structure

> **Your Financial World, Connected**  
> The Central AI Hub for All Your Banking Needs

## 🎯 Brand Identity

**UBL Nexus AI** represents the central intelligence layer that connects voice banking, fraud protection, loan guidance, and financial wellness into one unified AI-powered banking experience.

**Primary Tagline**: Your Financial World, Connected  
**Secondary Description**: The Central AI Hub for All Your Banking Needs

**Key Features**:
- AI Voice Banking Assistant
- Real-Time Fraud Protection
- Loan Eligibility Intelligence
- Financial Health Analytics

## 📂 Complete Folder Structure

```
ubl-project/
│
├── app/                                    # Next.js 15 App Router
│   ├── dashboard/
│   │   └── page.tsx                       # Dashboard with stats, charts, transactions
│   ├── voice-assistant/
│   │   └── page.tsx                       # AI chat and voice interface
│   ├── fraud-alerts/
│   │   └── page.tsx                       # Real-time fraud monitoring
│   ├── loan-checker/
│   │   └── page.tsx                       # Loan eligibility calculator
│   ├── financial-health/
│   │   └── page.tsx                       # Financial wellness tracker
│   ├── layout.tsx                         # Root layout with metadata
│   ├── page.tsx                           # Home (redirects to dashboard)
│   └── globals.css                        # Global styles & custom scrollbar
│
├── components/
│   ├── ui/                                # Base UI components (shadcn/ui style)
│   │   ├── button.tsx                     # Button with variants
│   │   ├── card.tsx                       # Card container components
│   │   ├── badge.tsx                      # Badge with status variants
│   │   ├── input.tsx                      # Form input
│   │   └── index.ts                       # Barrel export
│   │
│   ├── layout/                            # Layout components
│   │   ├── sidebar.tsx                    # Collapsible sidebar navigation
│   │   ├── navbar.tsx                     # Top navbar with search & profile
│   │   └── main-layout.tsx                # Main layout wrapper
│   │
│   ├── dashboard/                         # Dashboard-specific components
│   │   └── stat-card.tsx                  # Statistic card with icon
│   │
│   └── charts/                            # Recharts wrappers
│       ├── bar-chart-card.tsx             # Bar chart component
│       ├── line-chart-card.tsx            # Line chart component
│       └── pie-chart-card.tsx             # Pie chart component
│
├── data/
│   └── mock-data.ts                       # All mock data (stats, transactions, alerts)
│
├── lib/
│   └── utils.ts                           # Utility functions (cn for Tailwind)
│
├── types/
│   └── index.ts                           # TypeScript interfaces
│
├── public/                                # Static assets
│
├── .gitignore                             # Git ignore rules
├── package.json                           # Dependencies and scripts
├── tsconfig.json                          # TypeScript configuration
├── tailwind.config.ts                     # Tailwind CSS config
├── next.config.ts                         # Next.js configuration
├── README.md                              # Project documentation
└── CONTRIBUTING.md                        # Team contribution guidelines
```

## 🎨 Pages Overview

### 1. Dashboard (`/dashboard`)
- **Stats Cards**: Total Balance, Monthly Spending, Savings Goal, Credit Score
- **Charts**: Income vs Spending (Bar), Spending by Category (Pie)
- **Recent Transactions**: List with categories and amounts
- **Status**: ✅ Complete

### 2. Voice Assistant (`/voice-assistant`)
- **Chat Interface**: Message history with AI responses
- **Voice Control**: Microphone button with listening state
- **Quick Actions**: Pre-defined command buttons
- **Features List**: Natural language, secure, 24/7 available
- **Status**: ✅ Complete (UI only, backend integration needed)

### 3. Fraud Alerts (`/fraud-alerts`)
- **Alert Cards**: High/Medium/Low risk alerts
- **Stats Dashboard**: High risk count, pending reviews, total alerts
- **Action Buttons**: View details, Mark safe, Report fraud
- **Security Tips**: Best practices section
- **Status**: ✅ Complete

### 4. Loan Checker (`/loan-checker`)
- **Calculator Form**: Income, existing loans, desired amount, tenure
- **Eligibility Results**: Max amount, interest rate, tenure, credit score
- **Loan Types**: Personal, Business, Car, Home loans
- **Benefits Section**: Quick approval, competitive rates
- **Status**: ✅ Complete (UI only, calculation logic needed)

### 5. Financial Health (`/financial-health`)
- **Health Score**: Large circular score display (0-100)
- **Factor Breakdown**: Credit score, debt-to-income, savings, payment history
- **Credit Score Trend**: 6-month line chart
- **Recommendations**: Personalized action items
- **Goals & Milestones**: Progress tracking
- **Status**: ✅ Complete

## 🎨 Design System

### Brand Color Palette
```
Primary Banking Blue:
  Brand Primary:   #0052D4   (Banking Blue)
  Brand Secondary: #0041a8   (Dark Blue)
  Brand Accent:    #003d9e   (Deep Blue)

Background Colors:
  Background:      slate-950  (#020617)
  Cards:           slate-900  (#0f172a)
  Borders:         slate-800  (#1e293b)

Typography:
  Primary:         slate-100  (#f1f5f9)
  Secondary:       slate-400  (#94a3b8)
  Muted:           slate-500  (#64748b)

Status Colors:
  Success:         Banking Blue (#0052D4)
  Warning:         amber-500    (#f59e0b)
  Danger:          red-500      (#ef4444)
  Info:            blue-600     (#2563eb)
```

### Component Variants
- **Buttons**: default (banking blue gradient), destructive, outline, secondary, ghost, link
- **Badges**: default, success (banking blue), warning, destructive, outline
- **Cards**: Border, shadow, backdrop blur
- **Logo**: Premium badge with gradient blue background, white text

## 🛠️ Tech Stack

- **Framework**: Next.js 15.2.9 (App Router, Turbopack)
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS 4.x
- **Charts**: Recharts 3.9.0
- **Icons**: Lucide React 1.21.0
- **Utilities**: clsx, tailwind-merge, class-variance-authority

## 📦 Mock Data Available

All data is in `data/mock-data.ts`:
- Dashboard statistics
- Recent transactions (5 items)
- Spending by category (6 categories)
- Monthly spending trend (6 months)
- Fraud alerts (4 alerts with different statuses)
- Loan eligibility data
- Financial health score with factors
- Credit score history (6 months)

## 🚀 Team Member Tasks

### Member 1 (Frontend Developer) - DONE ✅
- [x] Project setup with Next.js 15 + TypeScript
- [x] Base UI components (Button, Card, Badge, Input)
- [x] Layout components (Sidebar, Navbar)
- [x] All 5 pages fully implemented
- [x] Chart components with Recharts
- [x] Dark theme with custom styling
- [x] Responsive design
- [x] Documentation (README, CONTRIBUTING)

### Member 2 (Backend Developer) - TODO
- [ ] Setup backend API (Node.js/Python)
- [ ] Create REST/GraphQL endpoints
- [ ] Database integration (PostgreSQL/MongoDB)
- [ ] Replace mock data with real API calls
- [ ] Implement authentication (JWT/OAuth)
- [ ] Transaction management endpoints

### Member 3 (AI/ML Engineer) - TODO
- [ ] Voice recognition integration
- [ ] Natural language processing for voice commands
- [ ] Fraud detection algorithm
- [ ] Financial health scoring model
- [ ] Loan eligibility calculation engine
- [ ] AI chatbot response generation

### Member 4 (QA/DevOps) - TODO
- [ ] Setup CI/CD pipeline (GitHub Actions)
- [ ] Write unit tests (Jest/Vitest)
- [ ] E2E tests (Playwright/Cypress)
- [ ] Setup staging environment
- [ ] Production deployment (Vercel/AWS)
- [ ] Monitoring and logging

## 🔌 Backend Integration Points

Replace mock data with API calls in these files:
- `app/dashboard/page.tsx` - Dashboard data
- `app/voice-assistant/page.tsx` - Chat messages, voice processing
- `app/fraud-alerts/page.tsx` - Real-time fraud alerts
- `app/loan-checker/page.tsx` - Eligibility calculation
- `app/financial-health/page.tsx` - Health score calculation

Example API integration:
```typescript
// Before (mock data)
import { dashboardStats } from '@/data/mock-data';

// After (API call)
const [stats, setStats] = useState<DashboardStats | null>(null);

useEffect(() => {
  async function fetchStats() {
    const response = await fetch('/api/dashboard/stats');
    const data = await response.json();
    setStats(data);
  }
  fetchStats();
}, []);
```

## 📱 Responsive Breakpoints

- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px (md, lg)
- **Desktop**: > 1024px (xl, 2xl)

Sidebar collapses on mobile, all cards stack vertically.

## 🔐 Security Considerations

- Input validation needed on all forms
- API authentication required
- Rate limiting for voice/chat endpoints
- Secure session management
- HTTPS only in production
- Environment variables for secrets

## 📈 Performance Optimizations

- Server components by default (only 'use client' where needed)
- Image optimization with next/image (when images added)
- Code splitting automatic with App Router
- Static generation where possible
- Turbopack for fast builds

## 🎯 Next Steps

1. **Backend Setup**: Create API endpoints
2. **Database Design**: Schema for users, transactions, alerts
3. **Authentication**: Implement login/signup
4. **AI Integration**: Voice assistant and fraud detection
5. **Testing**: Write comprehensive tests
6. **Deployment**: Setup production environment
