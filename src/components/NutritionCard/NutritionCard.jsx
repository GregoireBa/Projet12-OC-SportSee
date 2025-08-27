import React from "react";
import "./NutritionCard.css";

const NutritionCard = ({ data, icon, color }) => {
  const formatValue = (value) => {
    return value.toLocaleString("fr-FR");
  };

  const handleImageError = (e) => {
    e.target.style.display = "none";
    e.target.nextSibling.style.display = "block";
  };

  const getFallbackIcon = (label) => {
    const fallbacks = {
      Calories: "🔥",
      Protéines: "🍗",
      Glucides: "🍎",
      Lipides: "🥑",
    };
    return fallbacks[label] || "📊";
  };

  return (
    <div className="nutrition-card">
      <div className="nutrition-icon" style={{ color: color }}>
        <img src={icon} alt={data.label} onError={handleImageError} />
        <span
          className="fallback-icon"
          style={{ display: "none", fontSize: "20px" }}
        >
          {getFallbackIcon(data.label)}
        </span>
      </div>
      <div className="nutrition-info">
        <div className="nutrition-value">
          {formatValue(data.value)}
          {data.unit}
        </div>
        <div className="nutrition-label">{data.label}</div>
      </div>
    </div>
  );
};

export default NutritionCard;
