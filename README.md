# Task Flow - Goal Tracker

A modern, flexible goal tracking application built with React, TypeScript, and SCSS.

## 📁 Project Structure

```
Task-Flow/
├── Goal-Tracker-Frontend/     # React application
│   ├── src/                   # Source code
│   ├── public/                # Static assets
│   ├── package.json           # Dependencies
│   └── README.md             # Frontend documentation
├── Goal-Tracker-Backend/      # Backend (if needed)
├── netlify.toml              # Netlify deployment config
└── scope.md                  # Project scope and phases
```

## 🚀 Quick Start

### Frontend (React App)
```bash
cd Goal-Tracker-Frontend
npm install
npm start
```

### Features
- ✅ **Goal Management**: Create, edit, and track goals
- ✅ **Task System**: Flexible task creation with subtasks
- ✅ **PWA Support**: Installable as a Progressive Web App
- ✅ **Mobile Optimized**: Touch-friendly interface
- ✅ **Dark/Light Theme**: Automatic theme switching
- ✅ **Offline Support**: Works without internet connection

## 🌐 Deployment

This project is configured for Netlify deployment. The `netlify.toml` file specifies:
- Build directory: `Goal-Tracker-Frontend`
- Build command: `npm install && npm run build`
- Publish directory: `Goal-Tracker-Frontend/build`

## 📱 Mobile Features

- **PWA Installation**: Add to home screen
- **Touch Gestures**: Swipe, tap, long press
- **Haptic Feedback**: Vibration feedback
- **Offline Functionality**: Works without internet
- **Responsive Design**: Optimized for all screen sizes

## 🖥️ Desktop Features

- **Electron App**: Native desktop application
- **System Integration**: Native window controls
- **Offline Support**: Full local storage functionality

## 📄 License

MIT License
