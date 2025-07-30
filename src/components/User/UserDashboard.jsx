import { useEffect, useState } from "react";
import { apiService } from "/src/services/api";

function UserDashboard() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    apiService
      .getUserData(18)
      .then((data) => setUserData(data))
      .catch((error) => console.error("Erreur API:", error));
  }, []);

  return (
    <div>
      {userData ? (
        <h1>Bonjour {userData.data.userInfos.firstName}</h1>
      ) : (
        <p>Chargement...</p>
      )}
    </div>
  );
}

export default UserDashboard;
