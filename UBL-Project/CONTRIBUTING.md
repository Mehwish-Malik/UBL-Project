# Contributing to UBL Nexus AI

Thank you for contributing to UBL Nexus AI - Your Financial World, Connected! This guide will help you get started with our enterprise-grade AI banking platform.

## Development Workflow

### 1. Setting Up Your Environment

```bash
# Clone the repository
git clone <repository-url>
cd ubl-project

# Install dependencies
npm install

# Start development server
npm run dev
```

### 2. Branch Naming Convention

- `feature/feature-name` - New features
- `fix/bug-name` - Bug fixes
- `docs/description` - Documentation updates
- `refactor/component-name` - Code refactoring

Example: `feature/voice-assistant-integration`

### 3. Commit Messages

Follow conventional commits:

```
feat: add voice recording functionality
fix: resolve sidebar navigation issue
docs: update README with deployment instructions
style: format dashboard components
refactor: optimize chart rendering
```

### 4. Pull Request Process

1. Create a new branch from `main`
2. Make your changes
3. Test locally with `npm run build`
4. Push your branch to remote
5. Create a Pull Request with:
   - Clear title describing the change
   - Description of what was changed and why
   - Screenshots for UI changes
   - Link to related issues

### 5. Code Style Guidelines

#### TypeScript
- Use TypeScript for all new files
- Define proper types/interfaces
- Avoid `any` type

#### React Components
```tsx
// ✅ Good: Typed props with interface
interface ButtonProps {
  label: string;
  onClick: () => void;
}

export function Button({ label, onClick }: ButtonProps) {
  return <button onClick={onClick}>{label}</button>;
}

// ❌ Avoid: Untyped props
export function Button({ label, onClick }) {
  return <button onClick={onClick}>{label}</button>;
}
```

#### File Organization
```
components/
  ├── ui/           # Base UI components (Button, Card, etc.)
  ├── layout/       # Layout components (Sidebar, Navbar)
  ├── dashboard/    # Dashboard-specific components
  └── charts/       # Chart components
```

#### Styling
- Use Tailwind CSS utility classes
- Follow the design system colors:
  - Primary: Banking Blue `#0052D4` (gradient to `#0041a8`)
  - Background: `slate-950`, `slate-900`
  - Text: `slate-100`, `slate-400`
- Keep responsive design in mind (`sm:`, `md:`, `lg:` breakpoints)

#### Component Structure
```tsx
'use client'; // Only if using hooks/interactivity

import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface MyComponentProps {
  // Props here
}

export function MyComponent({ }: MyComponentProps) {
  // Hooks
  const [state, setState] = useState();

  // Handlers
  const handleClick = () => {};

  // Render
  return (
    <div>
      {/* JSX */}
    </div>
  );
}
```

### 6. Testing Your Changes

Before submitting a PR:

```bash
# Check TypeScript types
npm run build

# Run linter
npm run lint

# Test locally
npm run dev
```

### 7. Member Responsibilities

**Member 1 - Frontend Developer (You)**
- UI component development
- Page layouts and styling
- Responsive design implementation

**Member 2 - Backend Developer**
- API integration
- Data fetching and state management
- Authentication logic

**Member 3 - AI/ML Engineer**
- Voice assistant integration
- Fraud detection algorithms
- ML model integration

**Member 4 - QA/DevOps**
- Testing and quality assurance
- CI/CD pipeline setup
- Deployment and monitoring

### 8. Common Tasks

#### Adding a New Page
1. Create folder in `app/` directory
2. Add `page.tsx` file
3. Import `MainLayout`
4. Add route to sidebar navigation

#### Adding a New Component
1. Create component file in appropriate folder
2. Export from index file if in `ui/` folder
3. Add proper TypeScript types
4. Document props with comments

#### Updating Mock Data
- Edit `data/mock-data.ts`
- Ensure types match interfaces in `types/index.ts`

### 9. Getting Help

- Check existing code for patterns and examples
- Review the README.md for project overview
- Ask team members in the project chat
- Refer to Next.js documentation for framework questions

### 10. Code Review Checklist

Before requesting review, ensure:
- [ ] Code follows the style guidelines
- [ ] TypeScript types are properly defined
- [ ] Build passes without errors
- [ ] No console errors in development
- [ ] Responsive design works on mobile/tablet/desktop
- [ ] Comments added for complex logic
- [ ] No hardcoded values (use constants or config)

## Quick Reference

### File Locations
- Pages: `app/[page-name]/page.tsx`
- Components: `components/[category]/[component-name].tsx`
- Types: `types/index.ts`
- Data: `data/mock-data.ts`
- Styles: `app/globals.css`

### Import Aliases
- `@/components/*` - Components directory
- `@/lib/*` - Utility functions
- `@/types` - TypeScript types
- `@/data/*` - Mock data

### Useful Commands
```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Questions?

If you have questions or need clarification, reach out to the team lead or check the project documentation.

Happy coding! 🚀
