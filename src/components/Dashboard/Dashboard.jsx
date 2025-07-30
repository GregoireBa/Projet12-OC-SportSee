import React from "react";
import { useParams } from "react-router-dom";
import { useUserData } from "../../hooks/useUserData";
import NutritionCard from "./NutritionCard/NutritionCard";
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
            <div className="chart-container activity-chart">
              <h3>Activité quotidienne</h3>
              <div className="chart-placeholder">
                <p>Graphique d'activité (poids/calories)</p>
                <p>
                  Données disponibles :{" "}
                  {userData.activity?.sessions?.length || 0} sessions
                </p>
              </div>
            </div>
          </div>

          <div className="chart-row">
            <div className="chart-container average-sessions-chart">
              <h3>Durée moyenne des sessions</h3>
              <div className="chart-placeholder">
                <p>Graphique des sessions moyennes</p>
                <p>
                  Données disponibles :{" "}
                  {userData.averageSessions?.sessions?.length || 0} sessions
                </p>
              </div>
            </div>

            <div className="chart-container performance-chart">
              <h3>Performance</h3>
              <div className="chart-placeholder">
                <p>Graphique radar des performances</p>
                <p>
                  Données disponibles :{" "}
                  {userData.performance?.data?.length || 0} métriques
                </p>
              </div>
            </div>

            <div className="chart-container score-chart">
              <h3>Score</h3>
              <div className="chart-placeholder">
                <p>Graphique du score</p>
                <p>{user.getScorePercentage()}% de votre objectif</p>
              </div>
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
