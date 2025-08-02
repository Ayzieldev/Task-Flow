import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface GoalFormData {
  title: string;
  description: string;
  deadline: string;
  priority: 'low' | 'medium' | 'high';
  reward: string;
  stepByStep: boolean;
}

const GoalCreationPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<GoalFormData>({
    title: '',
    description: '',
    deadline: '',
    priority: 'medium',
    reward: '',
    stepByStep: false,
  });

  const [errors, setErrors] = useState<Partial<GoalFormData>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof GoalFormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<GoalFormData> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (formData.title.length > 100) {
      newErrors.title = 'Title must be less than 100 characters';
    }

    if (formData.description.length > 500) {
      newErrors.description = 'Description must be less than 500 characters';
    }

    if (formData.deadline && new Date(formData.deadline) < new Date()) {
      newErrors.deadline = 'Deadline cannot be in the past';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Create new goal
      const newGoal = {
        id: Date.now().toString(),
        ...formData,
        completed: false,
        progress: 0,
        taskBlocks: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Save to localStorage (temporary until backend is implemented)
      const existingGoals = JSON.parse(localStorage.getItem('goals') || '[]');
      existingGoals.push(newGoal);
      localStorage.setItem('goals', JSON.stringify(existingGoals));

      // Navigate to goal detail page
      navigate(`/goal/${newGoal.id}`);
    }
  };

  return (
    <div className="goal-creation-page">
      <div className="container">
        <div className="goal-creation-form">
          <div className="form-header">
            <h1>Create New Goal</h1>
            <p>Set up your goal with flexible task management and rewarding progress</p>
          </div>

          <form onSubmit={handleSubmit} className="goal-form">
            <div className="form-group">
              <label htmlFor="title">Goal Title *</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter your goal title"
                className={errors.title ? 'error' : ''}
                maxLength={100}
              />
              {errors.title && <span className="error-message">{errors.title}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe your goal in detail"
                rows={4}
                maxLength={500}
              />
              <span className="character-count">{formData.description.length}/500</span>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="deadline">Deadline</label>
                <input
                  type="datetime-local"
                  id="deadline"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleInputChange}
                  className={errors.deadline ? 'error' : ''}
                />
                {errors.deadline && <span className="error-message">{errors.deadline}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="priority">Priority</label>
                <select
                  id="priority"
                  name="priority"
                  value={formData.priority}
                  onChange={handleInputChange}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="reward">Reward</label>
              <input
                type="text"
                id="reward"
                name="reward"
                value={formData.reward}
                onChange={handleInputChange}
                placeholder="What's your reward for completing this goal?"
              />
            </div>

            <div className="form-group checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="stepByStep"
                  checked={formData.stepByStep}
                  onChange={handleInputChange}
                />
                <span className="checkmark"></span>
                Enable Step-by-Step Mode
              </label>
              <p className="help-text">
                When enabled, tasks must be completed in sequence. Each task unlocks only after the previous one is completed.
              </p>
            </div>

            <div className="form-actions">
              <button type="button" className="btn btn--secondary" onClick={() => navigate('/')}>
                Cancel
              </button>
              <button type="submit" className="btn btn--primary">
                Create Goal
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GoalCreationPage; 