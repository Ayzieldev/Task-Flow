import React from 'react';
import { useParams } from 'react-router-dom';

const GoalDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="goal-detail-page">
      <div className="container">
        <h1>Goal Detail</h1>
        <p>Goal ID: {id}</p>
        <p>This page will show the detailed view of a specific goal with all its task blocks.</p>
      </div>
    </div>
  );
};

export default GoalDetailPage; 