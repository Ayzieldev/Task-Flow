import { DailyTask, WeeklyTask, TaskConfiguration } from '@/types';

// Local storage keys
const DAILY_TASKS_STORAGE_KEY = 'dailyTasks';
const WEEKLY_TASKS_STORAGE_KEY = 'weeklyTasks';
const TASK_CONFIG_STORAGE_KEY = 'taskConfigurations';

// Simulate API delay for better UX
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Helper function to get data from localStorage
const getFromStorage = <T>(key: string): T[] => {
  try {
    // Check if localStorage is available
    if (typeof window === 'undefined' || !window.localStorage) {
      console.warn('localStorage is not available');
      return [];
    }
    
    const stored = localStorage.getItem(key);
    if (!stored) return [];
    
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error(`Error reading ${key} from localStorage:`, error);
    return [];
  }
};

// Helper function to save data to localStorage
const saveToStorage = <T>(key: string, data: T[]): void => {
  try {
    // Check if localStorage is available
    if (typeof window === 'undefined' || !window.localStorage) {
      console.warn('localStorage is not available');
      return;
    }
    
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
  }
};

// Helper function to check if tasks need reset
const shouldResetTasks = (lastReset: string, type: 'daily' | 'weekly'): boolean => {
  const now = new Date();
  const lastResetDate = new Date(lastReset);
  
  if (type === 'daily') {
    return now.getDate() !== lastResetDate.getDate() || 
           now.getMonth() !== lastResetDate.getMonth() || 
           now.getFullYear() !== lastResetDate.getFullYear();
  } else {
    // Weekly reset - check if it's a new week
    const nowWeek = getWeekNumber(now);
    const lastWeek = getWeekNumber(lastResetDate);
    return nowWeek !== lastWeek;
  }
};

// Helper function to get week number
const getWeekNumber = (date: Date): number => {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
};

// Task Service API
export const taskService = {
  // Get all daily tasks
  async getDailyTasks(): Promise<DailyTask[]> {
    await delay(200);
    let tasks = getFromStorage<DailyTask>(DAILY_TASKS_STORAGE_KEY);
    
    // Initialize with sample data if empty
    if (tasks.length === 0) {
             const sampleTasks: DailyTask[] = [
         {
           id: '1',
           title: 'Drink 8 glasses of water',
           description: 'Stay hydrated throughout the day',
           completed: false,
           streak: 0,
           scheduledTime: '09:00',
           order: 0,
           createdAt: new Date(),
           updatedAt: new Date().toISOString(),
         },
         {
           id: '2',
           title: 'Exercise for 30 minutes',
           description: 'Get your daily workout in',
           completed: false,
           streak: 0,
           scheduledTime: '18:00',
           order: 1,
           createdAt: new Date(),
           updatedAt: new Date().toISOString(),
         }
       ];
      saveToStorage(DAILY_TASKS_STORAGE_KEY, sampleTasks);
      tasks = sampleTasks;
    }
    
    // Check if tasks need reset
    const config = taskService.getTaskConfiguration('daily');
    if (config && shouldResetTasks(config.updatedAt, 'daily')) {
      const resetTasks = tasks.map(task => ({
        ...task,
        completed: false,
        updatedAt: new Date().toISOString()
      }));
      saveToStorage(DAILY_TASKS_STORAGE_KEY, resetTasks);
      return resetTasks;
    }
    
    return tasks;
  },

  // Get all weekly tasks
  async getWeeklyTasks(): Promise<WeeklyTask[]> {
    await delay(200);
    const tasks = getFromStorage<WeeklyTask>(WEEKLY_TASKS_STORAGE_KEY);
    
    // Check if tasks need reset
    const config = taskService.getTaskConfiguration('weekly');
    if (config && shouldResetTasks(config.updatedAt, 'weekly')) {
      const resetTasks = tasks.map(task => ({
        ...task,
        completed: false,
        updatedAt: new Date().toISOString()
      }));
      saveToStorage(WEEKLY_TASKS_STORAGE_KEY, resetTasks);
      return resetTasks;
    }
    
    return tasks;
  },

  // Get task configuration
  getTaskConfiguration(type: 'daily' | 'weekly'): TaskConfiguration | null {
    const configs = getFromStorage<TaskConfiguration>(TASK_CONFIG_STORAGE_KEY);
    return configs.find(config => config.type === type) || null;
  },

  // Create a new daily task
  async createDailyTask(taskData: Omit<DailyTask, 'id' | 'createdAt' | 'updatedAt'>): Promise<DailyTask> {
    await delay(300);
    const tasks = getFromStorage<DailyTask>(DAILY_TASKS_STORAGE_KEY);
    
    const newTask: DailyTask = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date().toISOString(),
    };

    tasks.push(newTask);
    saveToStorage(DAILY_TASKS_STORAGE_KEY, tasks);
    return newTask;
  },

  // Create a new weekly task
  async createWeeklyTask(taskData: Omit<WeeklyTask, 'id' | 'createdAt' | 'updatedAt'>): Promise<WeeklyTask> {
    await delay(300);
    const tasks = getFromStorage<WeeklyTask>(WEEKLY_TASKS_STORAGE_KEY);
    
    const newTask: WeeklyTask = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date().toISOString(),
    };

    tasks.push(newTask);
    saveToStorage(WEEKLY_TASKS_STORAGE_KEY, tasks);
    return newTask;
  },

  // Update a daily task
  async updateDailyTask(id: string, updates: Partial<DailyTask>): Promise<DailyTask> {
    await delay(300);
    const tasks = getFromStorage<DailyTask>(DAILY_TASKS_STORAGE_KEY);
    const taskIndex = tasks.findIndex(task => task.id === id);
    
    if (taskIndex === -1) {
      throw new Error('Daily task not found');
    }

    const updatedTask: DailyTask = {
      ...tasks[taskIndex],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    tasks[taskIndex] = updatedTask;
    saveToStorage(DAILY_TASKS_STORAGE_KEY, tasks);
    return updatedTask;
  },

  // Update a weekly task
  async updateWeeklyTask(id: string, updates: Partial<WeeklyTask>): Promise<WeeklyTask> {
    await delay(300);
    const tasks = getFromStorage<WeeklyTask>(WEEKLY_TASKS_STORAGE_KEY);
    const taskIndex = tasks.findIndex(task => task.id === id);
    
    if (taskIndex === -1) {
      throw new Error('Weekly task not found');
    }

    const updatedTask: WeeklyTask = {
      ...tasks[taskIndex],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    tasks[taskIndex] = updatedTask;
    saveToStorage(WEEKLY_TASKS_STORAGE_KEY, tasks);
    return updatedTask;
  },

  // Delete a daily task
  async deleteDailyTask(id: string): Promise<void> {
    await delay(300);
    const tasks = getFromStorage<DailyTask>(DAILY_TASKS_STORAGE_KEY);
    const filteredTasks = tasks.filter(task => task.id !== id);
    saveToStorage(DAILY_TASKS_STORAGE_KEY, filteredTasks);
  },

  // Delete a weekly task
  async deleteWeeklyTask(id: string): Promise<void> {
    await delay(300);
    const tasks = getFromStorage<WeeklyTask>(WEEKLY_TASKS_STORAGE_KEY);
    const filteredTasks = tasks.filter(task => task.id !== id);
    saveToStorage(WEEKLY_TASKS_STORAGE_KEY, filteredTasks);
  },

  // Toggle daily task completion
  async toggleDailyTask(id: string): Promise<DailyTask> {
    const task = await this.getDailyTask(id);
    if (!task) {
      throw new Error('Daily task not found');
    }

    const updatedTask = {
      ...task,
      completed: !task.completed,
      streak: !task.completed ? task.streak + 1 : Math.max(0, task.streak - 1),
      updatedAt: new Date().toISOString(),
    };

    return this.updateDailyTask(id, updatedTask);
  },

  // Toggle weekly task completion
  async toggleWeeklyTask(id: string): Promise<WeeklyTask> {
    const task = await this.getWeeklyTask(id);
    if (!task) {
      throw new Error('Weekly task not found');
    }

    const updatedTask = {
      ...task,
      completed: !task.completed,
      streak: !task.completed ? task.streak + 1 : Math.max(0, task.streak - 1),
      updatedAt: new Date().toISOString(),
    };

    return this.updateWeeklyTask(id, updatedTask);
  },

  // Get a single daily task
  async getDailyTask(id: string): Promise<DailyTask | null> {
    const tasks = await this.getDailyTasks();
    return tasks.find(task => task.id === id) || null;
  },

  // Get a single weekly task
  async getWeeklyTask(id: string): Promise<WeeklyTask | null> {
    const tasks = await this.getWeeklyTasks();
    return tasks.find(task => task.id === id) || null;
  },

  // Get today's weekly tasks
  async getTodayWeeklyTasks(): Promise<WeeklyTask[]> {
    const tasks = await this.getWeeklyTasks();
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    return tasks.filter(task => task.dayOfWeek === today);
  },

  // Get task statistics
  async getTaskStatistics(): Promise<{
    dailyCompleted: number;
    dailyTotal: number;
    weeklyCompleted: number;
    weeklyTotal: number;
    todayWeeklyCompleted: number;
    todayWeeklyTotal: number;
  }> {
    const dailyTasks = await this.getDailyTasks();
    const weeklyTasks = await this.getWeeklyTasks();
    const todayWeeklyTasks = await this.getTodayWeeklyTasks();

    return {
      dailyCompleted: dailyTasks.filter(task => task.completed).length,
      dailyTotal: dailyTasks.length,
      weeklyCompleted: weeklyTasks.filter(task => task.completed).length,
      weeklyTotal: weeklyTasks.length,
      todayWeeklyCompleted: todayWeeklyTasks.filter(task => task.completed).length,
      todayWeeklyTotal: todayWeeklyTasks.length,
    };
  },
}; 