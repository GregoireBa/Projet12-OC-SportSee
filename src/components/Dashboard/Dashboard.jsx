import React from "react";
import { useParams } from "react-router-dom";
import { useUserData } from "../../hooks/useUserData";
import NutritionCard from "../NutritionCard/NutritionCard";
import BarChart from "../BarChart/BarChart";
import LineChart from "../LineChart/LineChart";
import RadarChart from "../RadarChart/RadarChart";
import RadialBarChart from "../RadialBarChart/RadialBarChart";
import "./Dashboard.css";

const Dashboard = () => {
  const { userId } = useParams();
  const { userData, loading, error } = useUserData(userId);

  if (loading) {
    return <div className="dashboard-loading">Chargement des données...</div>;
  }

  if (error) {
    return <div className="dashboard-error">Erreur : {error}</div>;
  }

  if (!userData?.user) {
    return <div className="dashboard-error">Utilisateur non trouvé</div>;
  }

  const { user } = userData;
  const nutritionData = user.getNutritionData();

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1 className="dashboard-title">
          Bonjour{" "}
          <span className="user-name">{user.firstName || "Utilisateur"}</span>
        </h1>
        <p className="dashboard-subtitle">
          Félicitation ! Vous avez explosé vos objectifs hier 👏
        </p>
      </div>

      <div className="dashboard-content">
        <div className="charts-section">
          <div className="chart-row">
            <div className="activity-chart">
              <BarChart
                data={userData.activity}
                title="Activité quotidienne"
              />
            </div>
          </div>

          <div className="chart-row">
            <div className="chart-wrapper">
              <LineChart
                data={userData.averageSessions}
                title="Durée moyenne des sessions"
              />
            </div>

            <div className="chart-wrapper">
              <RadarChart
                data={userData.performance}
                title="Performance"
              />
            </div>

            <div className="chart-wrapper">
              <RadialBarChart
                data={user.getScorePercentage()}
                title="Score"
              />
            </div>
          </div>
        </div>

        <div className="nutrition-section">
          <NutritionCard
            data={nutritionData.calories}
            icon="/energy.svg"
            color="#ff0000"
          />
          <NutritionCard
            data={nutritionData.proteins}
            icon="/chicken.svg"
            color="#4ab8ff"
          />
          <NutritionCard
            data={nutritionData.carbohydrates}
            icon="/apple.svg"
            color="#fdcc0c"
          />
          <NutritionCard
            data={nutritionData.lipids}
            icon="/cheeseburger.svg"
            color="#fd5181"
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
