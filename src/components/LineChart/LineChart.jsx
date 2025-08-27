import React, { useState } from "react";
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./LineChart.css";

const LineChart = ({
  data,
  title = "Durée moyenne des sessions",
  width = "258px",
  height = "263px",
  backgroundColor = "#ff0000",
  titleColor = "rgba(255, 255, 255, 0.5)",
  strokeWidth = 2,
  className = "",
}) => {
  const [hoverPosition, setHoverPosition] = useState(null);

  if (!data?.sessions?.length) {
    return (
      <div
        className={`average-sessions-chart ${className}`}
        style={{ backgroundColor, width, height }}
      >
        <h3 className="average-sessions-title" style={{ color: titleColor }}>
          {title}
        </h3>
        <div className="average-sessions-empty">
          <p>Aucune donnée disponible</p>
        </div>
      </div>
    );
  }

  const baseData = data.getFormattedSessions();
  const extendedChartData = [
    { dayLetter: "", sessionLength: baseData[0].sessionLength, day: 0 },
    ...baseData,
    {
      dayLetter: "",
      sessionLength: baseData[baseData.length - 1].sessionLength,
      day: 8,
    },
  ];

  // Tooltip custom
  const CustomTooltip = ({ active, payload, coordinate }) => {
    if (
      active &&
      payload &&
      payload.length > 0 &&
      payload[0].payload.dayLetter
    ) {
      if (coordinate) {
        const chartAreaRect = document
          .querySelector(".chart-area")
          ?.getBoundingClientRect();
        const cardRect = document
          .querySelector(".average-sessions-chart")
          ?.getBoundingClientRect();
        if (chartAreaRect && cardRect) {
          const relativeX = coordinate.x - (chartAreaRect.left - cardRect.left);
          setHoverPosition(relativeX);
        }
      }
      return (
        <div className="custom-tooltip">
          <p>{`${payload[0].value} min`}</p>
        </div>
      );
    } else {
      setHoverPosition(null);
    }
    return null;
  };

  const CustomCursor = () => null;

  return (
    <div
      className={`average-sessions-chart ${className}`}
      style={{ backgroundColor, width, height }}
    >
      {hoverPosition !== null && (
        <div
          className="shadow-overlay"
          style={{
            left: `${hoverPosition}px`,
            width: `${258 - hoverPosition}px`,
          }}
        />
      )}
      <h3 className="average-sessions-title" style={{ color: titleColor }}>
        {title}
      </h3>
      <div className="chart-area">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsLineChart
            data={extendedChartData}
            margin={{ top: 40, right: 0, bottom: 30, left: 0 }}
          >
            <Line
              type="natural"
              dataKey="sessionLength"
              stroke="rgba(255, 255, 255, 0.7)"
              strokeWidth={strokeWidth}
              dot={false}
              activeDot={(props) =>
                !props.payload.dayLetter ? null : (
                  <circle
                    cx={props.cx}
                    cy={props.cy}
                    r={4}
                    fill="white"
                    stroke="rgba(255,255,255,0.4)"
                    strokeWidth={2}
                  />
                )
              }
            />
            <XAxis
              dataKey="dayLetter"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "rgba(255, 255, 255, 0.5)",
                fontSize: 12,
                fontWeight: 500,
              }}
              interval={0}
              tickFormatter={(value) => value}
              padding={{ left: -10, right: -10 }}
            />
            <YAxis hide domain={["dataMin - 10", "dataMax + 10"]} />
            <Tooltip
              content={<CustomTooltip />}
              cursor={<CustomCursor />}
              isAnimationActive={false}
            />
          </RechartsLineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LineChart;
