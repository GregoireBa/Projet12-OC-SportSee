import React from "react";
import {
  Radar,
  RadarChart as RechartsRadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";
import "./RadarChart.css";

const RadarChart = ({ data, title }) => {
  if (!data || !data.getFormattedPerformances) {
    return (
      <div className="performance-chart">
        <h3>{title}</h3>
        <div className="chart-placeholder">
          <p>Aucune donnée de performance disponible</p>
        </div>
      </div>
    );
  }

  const performanceData = data.getFormattedPerformances();

  if (!performanceData || performanceData.length === 0) {
    return (
      <div className="performance-chart">
        <h3>{title}</h3>
        <div className="chart-placeholder">
          <p>Aucune donnée de performance disponible</p>
        </div>
      </div>
    );
  }

  return (
    <div className="performance-chart">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsRadarChart data={performanceData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <PolarGrid radialLines={false} />
          <PolarAngleAxis
            dataKey="frenchLabel"
            tick={{ fontSize: 12, fill: "#FFFFFF" }}
          />
          <Radar
            dataKey="value"
            stroke="#FF0101"
            fill="#FF0101"
            fillOpacity={0.7}
          />
        </RechartsRadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RadarChart;