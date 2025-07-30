import React from "react";
import { SIDEBAR_ICONS } from "../../utils/constants";
import "./Sidebar.css";

const Sidebar = () => {
  const activities = [
    { id: 1, icon: SIDEBAR_ICONS.yoga, label: "Yoga" },
    { id: 2, icon: SIDEBAR_ICONS.swimming, label: "Natation" },
    { id: 3, icon: SIDEBAR_ICONS.cycling, label: "Cyclisme" },
    { id: 4, icon: SIDEBAR_ICONS.musculation, label: "Musculation" },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-activities">
        {activities.map((activity) => (
          <button
            key={activity.id}
            className="activity-btn"
            title={activity.label}
          >
            <img src={activity.icon} alt={activity.label} />
          </button>
        ))}
      </div>
      <div className="sidebar-footer">
        <p className="copyright">Copyright, SportSee 2020</p>
      </div>
    </aside>
  );
};

export default Sidebar;
