import { useState, useEffect } from "react";
import { useDataService } from "./useDataService.js";

/**
 * Hook personnalisé pour récupérer les données utilisateur
 */
export const useUserData = (userId) => {
  const { dataService, isLoading: serviceLoading } = useDataService();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!dataService || !userId) return;

      try {
        setLoading(true);
        setError(null);

        const result = await dataService.getAllUserData(userId);

        if (result.success) {
          setUserData(result.data);
        } else {
          setError("Unable to load user data");
        }
      } catch (err) {
        setError("Error loading data");
        console.error("Error fetching user data:", err);
      } finally {
        setLoading(false);
      }
    };

    if (!serviceLoading) {
      fetchUserData();
    }
  }, [dataService, userId, serviceLoading]);

  return {
    userData,
    loading: loading || serviceLoading,
    error,
  };
};
