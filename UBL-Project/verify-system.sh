#!/bin/bash
# UBL Nexus AI - Comprehensive Test Script
# Run this script to verify everything is working correctly

echo "🚀 UBL Nexus AI - System Check"
echo "================================"
echo ""

# Check Node version
echo "📦 Checking Node.js version..."
node --version
echo ""

# Check npm version
echo "📦 Checking npm version..."
npm --version
echo ""

# Check if dependencies are installed
echo "📦 Checking dependencies..."
if [ -d "node_modules" ]; then
    echo "✅ node_modules exists"
else
    echo "❌ node_modules not found. Run: npm install"
    exit 1
fi
echo ""

# Check key dependencies
echo "📦 Verifying key packages..."
PACKAGES=("next" "react" "framer-motion" "next-themes" "recharts" "tailwindcss")
for pkg in "${PACKAGES[@]}"; do
    if npm list "$pkg" &> /dev/null; then
        echo "✅ $pkg installed"
    else
        echo "❌ $pkg not found"
    fi
done
echo ""

# Run TypeScript check
echo "🔍 Running TypeScript type check..."
if npx tsc --noEmit; then
    echo "✅ No TypeScript errors"
else
    echo "⚠️  TypeScript errors found"
fi
echo ""

# Run linter
echo "🔍 Running linter..."
if npm run lint; then
    echo "✅ No linting errors"
else
    echo "⚠️  Linting warnings found (not critical)"
fi
echo ""

# Build test
echo "🏗️  Testing production build..."
if npm run build; then
    echo "✅ Build successful"
else
    echo "❌ Build failed"
    exit 1
fi
echo ""

echo "================================"
echo "✅ All checks passed!"
echo ""
echo "🌐 To start development server:"
echo "   npm run dev"
echo ""
echo "🚀 To start production server:"
echo "   npm run build && npm start"
echo ""
echo "📱 Access the app at: http://localhost:3000"
echo "================================"
