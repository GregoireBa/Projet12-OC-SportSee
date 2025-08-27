import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import "./RadialBarChart.css";

const RadialBarChart = ({ data, title }) => {
  const scoreValue = typeof data === 'number' ? data : 0;
  
  // Données pour le graphique donut
  const chartData = [
    { name: "score", value: scoreValue, fill: "#FF0101" },
    { name: "remaining", value: 100 - scoreValue, fill: "transparent" }
  ];

  return (
    <div className="score-chart">
      <h3 className="score-title">{title}</h3>
      <div className="score-container">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            {/* Cercle de fond blanc */}
            <Pie
              data={[{ value: 100 }]}
              cx="50%"
              cy="50%"
              startAngle={0}
              endAngle={360}
              innerRadius={70}
              outerRadius={85}
              fill="#FFFFFF"
              dataKey="value"
            />
            {/* Arc de score rouge */}
            <Pie
              data={[{ value: scoreValue }]}
              cx="50%"
              cy="50%"
              startAngle={90}
              endAngle={90 + (scoreValue * 3.6)}
              innerRadius={70}
              outerRadius={85}
              dataKey="value"
              cornerRadius={10}
              clockWise={false}
            >
              <Cell fill="#FF0101" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        
        <div className="score-content">
          <div className="score-percentage">{scoreValue}%</div>
          <div className="score-text">
            <span>de votre</span>
            <span>objectif</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RadialBarChart;