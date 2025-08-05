import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/context/ThemeContext';
import { QueryClientProviderWrapper } from '@/context/QueryClient';
import './styles/main.scss';

// Components
import Header from '@/components/design/Header/Header';
import Footer from '@/components/design/Footer/Footer';

// Pages
import HomePage from '@/pages/HomePage';
import DashboardPage from '@/pages/DashboardPage';
import GoalDetailPage from '@/pages/GoalDetailPage';
import GoalCreationPage from '@/pages/GoalCreationPage';
import DailyTasksPage from '@/pages/DailyTasksPage';

const App: React.FC = () => {
  return (
    <QueryClientProviderWrapper>
      <ThemeProvider>
        <Router>
          <div className="app">
            <Header />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/goal/:id" element={<GoalDetailPage />} />
                <Route path="/create" element={<GoalCreationPage />} />
                <Route path="/daily-tasks" element={<DailyTasksPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </ThemeProvider>
    </QueryClientProviderWrapper>
  );
};

export default App; 