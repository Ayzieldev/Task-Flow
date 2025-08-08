# Flexible Goal Tracker - Project Scope & Blueprint

## 🎯 Project Overview

A fun, engaging goal tracking application that makes users feel accomplished through flexible task management, visual feedback, and reward systems. The app supports both single tasks and grouped tasks with nested subtasks, with offline-first functionality and cloud sync capabilities using React Query for efficient data management.

## 🏗️ Technical Architecture

### Tech Stack
- **Frontend**: React 18 + TypeScript
- **Styling**: SCSS with BEM methodology
- **Data Management**: React Query (TanStack Query) + Local Storage
- **Backend**: Node.js + Express + TypeScript (Future Implementation)
- **Database**: MongoDB Atlas
- **State Management**: React Query + React Context
- **Offline Support**: React Query with local storage fallback
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
│   │   │   ├── useLocalStorage.ts
│   │   │   └── useGoals.ts (React Query hooks)
│   │   ├── context/
│   │   │   ├── ThemeContext.tsx
│   │   │   └── QueryClient.tsx (React Query provider)
│   │   ├── services/
│   │   │   ├── goalService.ts (API calls)
│   │   │   └── localStorageService.ts
│   │   ├── types/
│   │   ├── utils/
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
5. **Local Storage**: All data persists locally with React Query caching

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

### Daily Task Object
```typescript
interface DailyTask {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  streak: number;
  isRewardTrigger?: boolean;
  rewardNote?: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}
```

### Weekly Task Object
```typescript
interface WeeklyTask {
  id: string;
  title: string;
  description?: string;
  dayOfWeek: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
  completed: boolean;
  streak: number;
  isRewardTrigger?: boolean;
  rewardNote?: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}
```

### Daily/Weekly Task Configuration
```typescript
interface TaskConfiguration {
  id: string;
  type: 'daily' | 'weekly';
  title: string;
  description?: string;
  tasks: DailyTask[] | WeeklyTask[];
  resetTime: string; // "00:00" for daily, "sunday 00:00" for weekly
  timezone: string;
  createdAt: Date;
  updatedAt: Date;
}
```

## 🚀 Development Phases

### Phase 1: Core Foundation (Week 1) ✅ Done
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

### Phase 2: Goal Management (Week 2) ✅ Done
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

### Phase 3: React Query Integration (Week 3) ✅ Done
**Tasks:**
1. **React Query Setup** ✅
   - Install and configure React Query
   - Set up QueryClient provider
   - Create custom hooks for goals and tasks
   - Implement optimistic updates

2. **Data Management Migration** ✅
   - Migrate from Context to React Query
   - Create goalService for API calls
   - Implement local storage fallback
   - Add error handling and loading states

3. **Enhanced Caching** ✅
   - Configure cache invalidation
   - Implement background refetching
   - Add offline support with local storage
   - Optimize query performance

**Deliverables:**
- React Query integration complete ✅
- Enhanced data management ✅
- Better caching and performance ✅
- Improved user experience ✅

### Phase 4: Advanced Task Features (Week 4) 📋
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

### Phase 5: Reward System (Week 5) 📋
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

### Phase 6: Backend & Sync (Week 6) 📋
**Tasks:**
1. **Backend Setup**
   - Node.js + Express server
   - MongoDB Atlas connection
   - User authentication
   - API endpoints

2. **Database Models**
   - Goal schema
   - User schema
   - Data validation
   - Indexing

3. **Sync System**
   - React Query sync with backend
   - Conflict resolution
   - Real-time sync
   - Data migration

**Deliverables:**
- Working backend API
- Database integration
- Sync functionality

### Phase 7: Daily/Weekly Task System (Week 7) 📋
**Tasks:**
1. **Daily Task Implementation**
   - Daily task creation and management
   - Streak tracking system
   - Daily reset logic
   - Quick completion actions

2. **Weekly Task Implementation**
   - Weekly task scheduling interface
   - Day-of-week selection
   - Weekly reset logic
   - Calendar view component

3. **Task Configuration System**
   - Task template system
   - Reset time configuration
   - Timezone handling
   - Progress tracking

**Deliverables:**
- Complete daily task functionality
- Weekly task scheduling system
- Task configuration management
- Streak tracking and statistics

### Phase 8: Offline & Polish (Week 8) 📋
**Tasks:**
1. **Offline Support**
   - React Query offline capabilities
   - Service worker implementation
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

### 7. React Query Data Management ✅
- **Efficient Caching**: Smart caching with automatic invalidation
- **Optimistic Updates**: Instant UI feedback
- **Background Sync**: Automatic data synchronization
- **Error Handling**: Graceful error states and retry logic
- **Offline Support**: Local storage fallback

### 8. Daily/Weekly Task System 📋
- **Daily Tasks**: Simple recurring tasks that reset every day
- **Weekly Tasks**: Complex scheduling with different tasks per day
- **Streak Tracking**: Track consecutive days of completion
- **Quick Actions**: Fast task completion with swipe/click
- **Template System**: Pre-built routines (morning, evening, etc.)
- **Calendar View**: Visual weekly schedule overview
- **Progress Tracking**: Daily and weekly completion statistics
- **Reset Logic**: Automatic daily/weekly resets with timezone handling

## 🔧 Technical Considerations

### Performance
- **React Query Caching**: Intelligent caching strategies
- **Lazy Loading**: Load components on demand
- **Virtual Scrolling**: Handle large goal lists
- **Debounced Updates**: Prevent excessive API calls

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
- **Database**: Managed MongoDB Atlas service
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
- React Query integration with optimistic updates
- Enhanced data management with caching
- Error handling and loading states
- Custom hooks for all CRUD operations

### In Progress 🔄
- Advanced task features (grouped tasks, step-by-step mode)
- Task block components

### Planned 📋
- Daily/Weekly Task System
- Reward system implementation
- Backend development
- Offline functionality
- User authentication
- Sync capabilities

## 🆕 React Query Integration Benefits

### Why React Query?
1. **Simplified Data Management**: Automatic caching, background updates, and error handling
2. **Better Performance**: Intelligent caching reduces unnecessary API calls
3. **Offline Support**: Built-in offline capabilities with local storage fallback
4. **Developer Experience**: Less boilerplate code and better debugging
5. **Future-Proof**: Easy migration to backend APIs when ready

### Implementation Strategy
- **Phase 1**: Set up React Query with local storage
- **Phase 2**: Create custom hooks for goals and tasks
- **Phase 3**: Add optimistic updates and error handling
- **Phase 4**: Integrate with backend APIs when available

This updated scope document reflects the integration of React Query (TanStack Query) as the primary data management solution, providing better performance, caching, and developer experience while maintaining the existing functionality. 