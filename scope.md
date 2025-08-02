# Flexible Goal Tracker - Project Scope & Blueprint

## 🎯 Project Overview

A fun, engaging goal tracking application that makes users feel accomplished through flexible task management, visual feedback, and reward systems. The app supports both single tasks and grouped tasks with nested subtasks, with offline-first functionality and cloud sync capabilities.

## 🏗️ Technical Architecture

### Tech Stack
- **Frontend**: React 18 + TypeScript
- **Styling**: SCSS with BEM methodology
- **Backend**: Node.js + Express + TypeScript (Future Implementation)
- **Database**: MongoDB (Future Implementation)
- **State Management**: React Context + Local Storage
- **Offline Support**: Service Workers + IndexedDB (Future Implementation)
- **Deployment**: Vercel (Frontend) + Railway/Heroku (Backend - Future)

### Project Structure
```
Goal-Tracker/
├── Goal-Tracker-Frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── design/
│   │   │   │   ├── Button/
│   │   │   │   ├── Modal/
│   │   │   │   ├── ProgressBar/
│   │   │   │   ├── TaskBlock/
│   │   │   │   ├── GoalCard/
│   │   │   │   ├── RewardAnimation/
│   │   │   │   └── Header/
│   │   │   └── logic/
│   │   │       ├── GoalManager/
│   │   │       ├── TaskManager/
│   │   │       ├── ProgressCalculator/
│   │   │       ├── SyncManager/
│   │   │       └── RewardSystem/
│   │   ├── hooks/
│   │   ├── context/
│   │   ├── types/
│   │   ├── utils/
│   │   ├── services/
│   │   └── styles/
│   │       ├── abstracts/
│   │       ├── base/
│   │       ├── components/
│   │       ├── layout/
│   │       ├── pages/
│   │       ├── themes/
│   │       └── vendors/
│   ├── package.json
│   └── tsconfig.json
├── Goal-Tracker-Backend/ (Future Implementation)
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── services/
│   │   ├── utils/
│   │   └── types/
│   ├── package.json
│   └── tsconfig.json
└── README.md
```

## 🎨 Design System

### Color Palette
**Light Mode:**
- Primary: `#d8b2ff` (Light Purple)
- Secondary: `#b266ff` (Medium Purple)
- Accent: `#4500e2` (Deep Purple)
- Dark: `#3100a2` (Dark Purple)
- Darkest: `#4c0099` (Very Dark Purple)
- Background: `#ffffff` (White)
- Surface: `#f8f9fa` (Light Gray)
- Text: `#212529` (Dark Gray)

**Dark Mode:**
- Primary: `#b266ff` (Medium Purple)
- Secondary: `#d8b2ff` (Light Purple)
- Accent: `#4500e2` (Deep Purple)
- Background: `#1a1a1a` (Dark Gray)
- Surface: `#2d2d2d` (Medium Dark Gray)
- Text: `#ffffff` (White)

### Typography
- **Headings**: Inter, sans-serif
- **Body**: Inter, sans-serif
- **Monospace**: JetBrains Mono (for code elements)

## 🧭 Navigation & User Flow

### Header Navigation
- **Logo**: "Goal Tracker" - Links to home page
- **Download**: Download app functionality (Future)
- **Register**: User registration (Future - currently placeholder)
- **Log In**: Direct navigation to create goal section (Current Implementation)
- **Theme Toggle**: Light/Dark mode switch

### User Flow (Current Implementation)
1. **Landing Page**: Hero section with features and statistics
2. **Log In Button**: Direct navigation to goal creation
3. **Goal Creation**: Full goal creation workflow
4. **Goal Management**: View, edit, and track goals
5. **Local Storage**: All data persists locally

## 📋 Data Models

### Goal Object
```typescript
interface Goal {
  id: string;
  title: string;
  description?: string;
  deadline?: Date;
  priority: 'low' | 'medium' | 'high';
  reward?: string;
  stepByStep: boolean;
  completed: boolean;
  progress: number;
  taskBlocks: TaskBlock[];
  createdAt: Date;
  updatedAt: Date;
  userId?: string; // Optional for current local-only implementation
}
```

### TaskBlock Object
```typescript
interface TaskBlock {
  id: string;
  title: string;
  type: 'single' | 'grouped';
  completed: boolean;
  locked?: boolean;
  isRewardTrigger?: boolean;
  rewardNote?: string;
  subtasks?: Subtask[];
  order: number;
}
```

### Subtask Object
```typescript
interface Subtask {
  id: string;
  title: string;
  completed: boolean;
  isRewardTrigger?: boolean;
  rewardNote?: string;
  locked?: boolean;
  order: number;
}
```

## 🚀 Development Phases

### Phase 1: Core Foundation (Week 1) ✅
**Tasks:**
1. **Project Setup** ✅
   - Initialize React + TypeScript frontend
   - Set up SCSS folder structure
   - Configure ESLint and Prettier
   - Set up basic routing

2. **Design System Implementation** ✅
   - Create SCSS variables and mixins
   - Implement color themes (light/dark mode)
   - Build base components (Button, Input, Modal)
   - Set up typography system

3. **Basic State Management** ✅
   - Create React Context for goals
   - Implement local storage persistence
   - Set up basic CRUD operations

4. **Header Navigation** ✅
   - Logo with gradient animation
   - Download, Register, Log In buttons
   - Theme toggle functionality
   - Responsive design

**Deliverables:**
- Working project structure ✅
- Basic UI components ✅
- Theme switching functionality ✅
- Local storage integration ✅
- Header navigation system ✅

### Phase 2: Goal Management (Week 2) ✅
**Tasks:**
1. **Goal Creation Flow** ✅
   - Goal creation form with all fields
   - Date picker component
   - Priority selector
   - Step-by-step mode toggle
   - Form validation

2. **Goal Display** ✅
   - Goal card component
   - Progress visualization
   - Goal list view
   - Goal detail view

3. **Basic Task Management** ✅
   - Single task creation
   - Task completion logic
   - Progress calculation

4. **Enhanced Landing Page** ✅
   - Hero section with statistics
   - Feature showcase
   - Testimonials
   - Call-to-action buttons

**Deliverables:**
- Complete goal creation workflow ✅
- Goal display and management ✅
- Basic task functionality ✅
- Enhanced user experience ✅

### Phase 3: Advanced Task Features (Week 3) 🔄
**Tasks:**
1. **Grouped Tasks**
   - Grouped task creation interface
   - Subtask management
   - Nested progress calculation
   - Collapsible task groups

2. **Step-by-Step Logic**
   - Task locking/unlocking system
   - Sequential completion logic
   - Visual feedback for locked tasks

3. **Task Block Components**
   - Single task block component
   - Grouped task block component
   - Drag-and-drop reordering

**Deliverables:**
- Full task block functionality
- Step-by-step mode working
- Task reordering capability

### Phase 4: Reward System (Week 4) 📋
**Tasks:**
1. **Reward Implementation**
   - Reward trigger logic
   - Reward note system
   - Reward animation components
   - Confetti effects

2. **Visual Feedback**
   - Completion animations
   - Progress bar animations
   - Success states
   - Loading states

3. **User Experience**
   - Smooth transitions
   - Hover effects
   - Micro-interactions

**Deliverables:**
- Complete reward system
- Engaging animations
- Polished user experience

### Phase 5: Backend & Sync (Week 5) 📋
**Tasks:**
1. **Backend Setup**
   - Node.js + Express server
   - MongoDB connection
   - User authentication
   - API endpoints

2. **Database Models**
   - Goal schema
   - User schema
   - Data validation
   - Indexing

3. **Sync System**
   - Offline-first architecture
   - Conflict resolution
   - Real-time sync
   - Data migration

**Deliverables:**
- Working backend API
- Database integration
- Sync functionality

### Phase 6: Offline & Polish (Week 6) 📋
**Tasks:**
1. **Offline Support**
   - Service worker implementation
   - IndexedDB for offline storage
   - Sync queue management
   - Offline indicators

2. **Performance Optimization**
   - Code splitting
   - Lazy loading
   - Bundle optimization
   - Caching strategies

3. **Testing & Bug Fixes**
   - Unit tests
   - Integration tests
   - User testing
   - Bug fixes

**Deliverables:**
- Full offline functionality
- Optimized performance
- Production-ready application

## 🎯 Key Features Breakdown

### 1. Header Navigation ✅
- **Logo**: Animated gradient text with hover effects
- **Download**: App download functionality (placeholder)
- **Register**: User registration (placeholder)
- **Log In**: Direct navigation to goal creation
- **Theme Toggle**: Animated theme switching

### 2. Landing Page ✅
- **Hero Section**: Statistics, testimonials, call-to-actions
- **Feature Showcase**: 2x2 grid with icons and descriptions
- **Responsive Design**: Mobile-optimized layout
- **Social Proof**: User statistics and testimonials

### 3. Goal Creation ✅
- **Form Components**: Title, description, deadline, priority, reward
- **Validation**: Required fields, date validation, character limits
- **Step-by-Step Toggle**: Enables/disables sequential task completion
- **Preview**: Real-time preview of goal structure

### 4. Task Block Management 🔄
- **Single Tasks**: Simple checkbox with optional reward
- **Grouped Tasks**: Collapsible container with subtasks
- **Drag & Drop**: Reorder tasks within a goal
- **Bulk Actions**: Select multiple tasks for batch operations

### 5. Progress Tracking ✅
- **Visual Progress**: Animated progress bars
- **Completion States**: Different visual states for completed tasks
- **Locked States**: Visual indication of locked tasks in step mode
- **Statistics**: Completion rates, streaks, time tracking

### 6. Reward System 📋
- **Trigger Points**: Individual task rewards and goal completion rewards
- **Animations**: Confetti, sparkles, celebration effects
- **Notes**: Custom reward messages
- **History**: Track completed rewards

### 7. Sync & Offline 📋
- **Offline-First**: All functionality works without internet
- **Background Sync**: Automatic sync when online
- **Conflict Resolution**: Handle simultaneous edits
- **Data Migration**: Version updates and data structure changes

## 🔧 Technical Considerations

### Performance
- **Lazy Loading**: Load components on demand
- **Virtual Scrolling**: Handle large goal lists
- **Debounced Updates**: Prevent excessive API calls
- **Caching**: Smart caching strategies

### Security
- **Input Validation**: Server-side and client-side validation
- **Data Sanitization**: Prevent XSS attacks
- **Authentication**: Secure user sessions (Future)
- **Data Encryption**: Sensitive data protection (Future)

### Accessibility
- **Keyboard Navigation**: Full keyboard support
- **Screen Reader**: ARIA labels and semantic HTML
- **Color Contrast**: WCAG compliant color ratios
- **Focus Management**: Proper focus indicators

### Testing Strategy
- **Unit Tests**: Component and utility testing
- **Integration Tests**: API and database testing (Future)
- **E2E Tests**: User workflow testing
- **Performance Tests**: Load and stress testing

## 📊 Success Metrics

### User Experience
- **Task Completion Rate**: Track how many tasks users complete
- **Goal Achievement Rate**: Percentage of goals completed
- **User Retention**: Daily/weekly active users
- **Session Duration**: Time spent in the app

### Technical Performance
- **Load Time**: < 3 seconds initial load
- **Offline Functionality**: 100% offline capability (Future)
- **Sync Reliability**: < 1% sync failures (Future)
- **Error Rate**: < 0.1% error rate

### Business Metrics
- **User Adoption**: Number of active users
- **Feature Usage**: Which features are most used
- **User Feedback**: App store ratings and reviews
- **Retention**: User return rate

## 🚀 Deployment Strategy

### Frontend (Vercel) ✅
- **Automatic Deployments**: Git-based deployments
- **Preview Deployments**: PR-based previews
- **CDN**: Global content delivery
- **Analytics**: Built-in performance monitoring

### Backend (Railway/Heroku) 📋
- **Auto-scaling**: Handle traffic spikes
- **Database**: Managed MongoDB service
- **Monitoring**: Application performance monitoring
- **Logs**: Centralized logging system

## 📝 Development Guidelines

### Code Quality
- **TypeScript**: Strict type checking
- **ESLint**: Code quality enforcement
- **Prettier**: Consistent code formatting
- **Husky**: Pre-commit hooks

### Git Workflow
- **Feature Branches**: Branch per feature
- **Pull Requests**: Code review process
- **Semantic Commits**: Conventional commit messages
- **Release Tags**: Version management

### Documentation
- **README**: Project overview and setup
- **API Docs**: Backend endpoint documentation (Future)
- **Component Docs**: Frontend component documentation
- **Deployment Guide**: Production deployment steps

## 🔄 Current Status

### Completed Features ✅
- Project setup and structure
- Design system implementation
- Header navigation with all buttons
- Landing page with enhanced hero section
- Goal creation and management
- Basic task functionality
- Local storage integration
- Theme switching
- Responsive design

### In Progress 🔄
- Advanced task features (grouped tasks, step-by-step mode)
- Task block components
- Drag-and-drop functionality

### Planned 📋
- Reward system implementation
- Backend development
- Offline functionality
- User authentication
- Sync capabilities

This updated scope document reflects the current state of the Flexible Goal Tracker application, including the new header functionalities and simplified user flow without backend dependencies. 