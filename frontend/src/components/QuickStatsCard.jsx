// src/components/QuickStatsCard.js
import React from 'react';

function QuickStatsCard({ title, value }) {
  return (
    <div className="stats-card">
      <p className="stats-value">{value}</p>
      <p className="stats-title">{title}</p>
    </div>
  );
}

export default QuickStatsCard;