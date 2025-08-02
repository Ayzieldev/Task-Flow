# Goal Tracker Frontend

A modern, flexible goal tracking application built with React, TypeScript, and SCSS.

## 🚀 Features

- **Flexible Task Management**: Create single tasks or grouped tasks with subtasks
- **Step-by-Step Mode**: Lock tasks in sequence for structured progress
- **Reward System**: Set rewards for task completion and goal achievement
- **Theme Support**: Light and dark mode with automatic system preference detection
- **Offline-First**: Works offline with local storage persistence
- **Responsive Design**: Mobile-first approach with modern UI

## 🛠️ Tech Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **SCSS** - Advanced styling with BEM methodology
- **React Router** - Client-side routing
- **Local Storage** - Offline data persistence

## 📁 Project Structure

```
src/
├── components/
│   ├── design/          # UI components
│   └── logic/           # Business logic components
├── context/             # React contexts
├── hooks/               # Custom React hooks
├── pages/               # Page components
├── services/            # API and external services
├── styles/              # SCSS files
│   ├── abstracts/       # Variables and mixins
│   ├── base/           # Reset and base styles
│   ├── components/     # Component styles
│   ├── layout/         # Layout styles
│   ├── pages/          # Page styles
│   ├── themes/         # Theme styles
│   └── vendors/        # Third-party styles
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

## 🎨 Design System

### Color Palette
- **Primary**: `#d8b2ff` (Light Purple)
- **Secondary**: `#b266ff` (Medium Purple)
- **Accent**: `#4500e2` (Deep Purple)
- **Dark**: `#3100a2` (Dark Purple)
- **Darkest**: `#4c0099` (Very Dark Purple)

### Typography
- **Primary Font**: Inter (Google Fonts)
- **Monospace**: JetBrains Mono

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Goal-Tracker-Frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run format` - Format code with Prettier

## 📝 Development Guidelines

### Code Style
- Use TypeScript for all new files
- Follow BEM methodology for CSS classes
- Use SCSS variables and mixins for consistency
- Write descriptive component and function names

### Component Structure
- Separate logic and design components
- Use custom hooks for reusable logic
- Implement proper TypeScript interfaces
- Follow React best practices

### Styling
- Use SCSS with BEM methodology
- Leverage design system variables
- Ensure responsive design
- Maintain accessibility standards

## 🔧 Configuration

### TypeScript
- Strict mode enabled
- Path aliases configured for clean imports
- ESLint integration for code quality

### SCSS
- Modular structure with partials
- Design system with variables and mixins
- Theme support for light/dark modes

## 📱 Responsive Design

The application is built with a mobile-first approach:
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🎯 Next Steps

This is Phase 1 of the development plan. Upcoming phases include:

- **Phase 2**: Goal Management (forms, CRUD operations)
- **Phase 3**: Advanced Task Features (grouped tasks, step-by-step logic)
- **Phase 4**: Reward System (animations, confetti effects)
- **Phase 5**: Backend & Sync (API integration, offline support)
- **Phase 6**: Polish & Optimization (performance, testing)

## 🤝 Contributing

1. Follow the established code style
2. Write tests for new features
3. Update documentation as needed
4. Use conventional commit messages

## 📄 License

This project is licensed under the MIT License. 