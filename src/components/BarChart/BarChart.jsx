import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./BarChart.css";

const BarChart = ({
  data,
  title = "Activité quotidienne",
  legend = {
    weight: "Poids (kg)",
    calories: "Calories brûlées (kCal)",
  },
}) => {
  // Gestion des cas d'erreur
  if (!data?.sessions?.length) {
    return (
      <div className="activity-chart-clean">
        <div className="activity-header-clean">
          <h3 className="activity-title-clean">{title}</h3>
        </div>
        <div className="activity-empty-clean">
          <p>Aucune donnée disponible</p>
        </div>
      </div>
    );
  }

  const chartData = data.getFormattedSessions();

  // Tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length >= 2) {
      return (
        <div className="activity-tooltip-clean">
          <p>{`${payload[0].value}kg`}</p>
          <p>{`${payload[1].value}kCal`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="activity-chart-clean">
      {/* Header avec titre et légende */}
      <div className="activity-header-clean">
        <h3 className="activity-title-clean">{title}</h3>
        <div className="activity-legend-clean">
          <div className="legend-item-clean">
            <div className="legend-dot-clean legend-dot-weight-clean"></div>
            <span className="legend-label-clean">{legend.weight}</span>
          </div>
          <div className="legend-item-clean">
            <div className="legend-dot-clean legend-dot-calories-clean"></div>
            <span className="legend-label-clean">{legend.calories}</span>
          </div>
        </div>
      </div>

      {/* Zone graphique */}
      <div className="activity-chart-area-clean">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBarChart
            data={chartData}
            margin={{ top: 20, right: 50, bottom: 30, left: 0 }}
            barCategoryGap="25%"
            barGap={8}
          >
            {/* Grille */}
            <CartesianGrid
              strokeDasharray="3"
              vertical={false}
              stroke="#DEDEDE"
            />

            {/* Axe X jours*/}
            <XAxis
              dataKey="dayNumber"
              axisLine={false}
              tickLine={false}
              tick={{
                fontSize: 14,
                fill: "#9B9EAC",
                fontWeight: 500,
              }}
              dy={10}
            />

            {/* Axe Y poids */}
            <YAxis
              yAxisId="weight"
              type="number"
              orientation="right"
              axisLine={false}
              tickLine={false}
              tick={{
                fontSize: 14,
                fill: "#9B9EAC",
                fontWeight: 500,
              }}
              domain={["dataMin-2", "dataMax+1"]}
              tickCount={3}
              allowDecimals={false}
              tickMargin={30}
            />

            {/* Axe Y invisible */}
            <YAxis
              yAxisId="calories"
              orientation="left"
              hide
              domain={[0, "dataMax + 100"]}
            />

            {/* Tooltip */}
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "rgba(196, 196, 196, 0.5)" }}
            />

            {/* Barres */}
            <Bar
              yAxisId="weight"
              dataKey="weight"
              fill="#282D30"
              radius={[3, 3, 0, 0]}
              barSize={7}
            />

            <Bar
              yAxisId="calories"
              dataKey="calories"
              fill="#E60000"
              radius={[3, 3, 0, 0]}
              barSize={7}
            />
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarChart;
