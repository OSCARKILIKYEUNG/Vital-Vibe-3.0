# Vital Vibe - Mobile-First Health & Fitness Web App

A production-quality health and fitness tracking web application built with Next.js 14, TypeScript, TailwindCSS, and shadcn/ui components.

## 🌟 Features

### Core Functionality
- **Dashboard**: Daily calorie tracking with remaining kcal display, weekly trends, and 30-day summaries
- **Meals**: Add meals manually, with AI assistance, or by photo (UI-only mock)
- **Workouts**: Log workouts with calorie calculations based on MET values
- **Library**: Save workout links and recipes with search and filtering
- **Profile**: Personal metrics for accurate calorie calculations

### Design & UX
- Mobile-first responsive design with bottom tab navigation
- Clean Nike Run-inspired aesthetic with brand blue (#001489)
- Smooth animations and micro-interactions
- Accessibility-focused with proper ARIA labels and keyboard navigation
- i18n support for English and Chinese

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## 🛠 Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: TailwindCSS + shadcn/ui components
- **Charts**: Recharts
- **Icons**: Lucide React
- **State Management**: React state (ready for Zustand/Zustand integration)

## 📱 Mobile-First Design

- Bottom tab navigation on mobile
- Top bar with page title and settings
- Responsive breakpoints for tablet and desktop
- Touch-friendly interface elements
- Optimized for various screen sizes

## 🎨 Design System

- **Primary Color**: #001489 (Brand Blue)
- **Typography**: Inter font family
- **Spacing**: 8px grid system
- **Borders**: rounded-2xl for cards
- **Shadows**: Subtle shadows for depth

## 📊 Mock Data & Calculations

The app uses realistic mock data and includes:
- 7-day and 30-day sample data generation
- BMR calculations using Mifflin-St Jeor equation
- MET-based workout calorie calculations
- 40+ workout catalog with categorized exercises
- Local food catalog for meal logging

## 🌍 Internationalization

Simple i18n system supporting:
- English (en)
- Chinese Simplified (zh)
- Language toggle in header
- Easy to extend for additional languages

## 📁 Project Structure

```
├── app/                    # Next.js App Router pages
├── components/            # Reusable UI components
├── lib/                   # Utilities and shared logic
│   ├── i18n.ts           # Internationalization
│   ├── metrics.ts        # Health calculations
│   ├── sampleData.ts     # Mock data generators
│   └── workoutCatalog.ts # Exercise database
├── public/               # Static assets
└── styles/               # Global styles
```

## 🔄 What's Next (TODOs)

### Backend Integration
- Set up Supabase database with the following schema:
  - `profiles` table for user data
  - `daily_summaries` for daily calorie tracking
  - `meals` and `meal_items` for nutrition logging
  - `workouts` for exercise tracking
  - `workout_links` and `collections` for library
  - `recipes` with `ingredients` and `steps`
  - Row Level Security (RLS) policies

### API Routes
- `/api/link-preview` - Fetch link metadata
- `/api/food/analyze` - AI food recognition
- `/api/food/portion-estimate` - Portion size estimation
- `/api/recipe/parse` - Recipe URL parsing

### Real-time Features
- Automatic daily summary updates
- Meal and workout change notifications
- Progress tracking and streaks
- Social features and challenges

### Advanced Features
- Photo upload and processing
- Barcode scanning for food items
- Wearable device integration
- Advanced analytics and insights
- Meal planning and prep tools

## 🎯 Production Ready

This is a complete UI/UX implementation with:
- Clean, maintainable code architecture
- TypeScript for type safety
- Responsive design for all devices
- Accessibility best practices
- Performance optimizations
- Mock data that demonstrates all features

The app is ready for backend integration and can be easily extended with real data sources and API connections.

## 📄 License

MIT License - feel free to use this project as a starting point for your own health and fitness applications.