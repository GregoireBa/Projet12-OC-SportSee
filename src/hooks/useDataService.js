import { useState, useEffect } from "react";
import { APIDataService } from "../services/APIDataService.js";
import { MockDataService } from "../services/MockDataService.js";

/**
 * Hook personnalisé pour l'injection de dépendances du service de données
 */
export const useDataService = () => {
  const [dataService, setDataService] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeDataService = async () => {
      const apiService = new APIDataService();

      try {
        const testResult = await apiService.apiCall("/user/12");

        if (testResult.success) {
          console.log("API available, using APIDataService");
          setDataService(apiService);
        } else {
          throw new Error("API not available");
        }
      } catch {
        console.log("API unavailable, using MockDataService");
        setDataService(new MockDataService());
      } finally {
        setIsLoading(false);
      }
    };

    initializeDataService();
  }, []);

  return { dataService, isLoading };
};
