import { DataService } from "./DataService.js";
import {
  User,
  UserActivity,
  UserAverageSessions,
  UserPerformance,
} from "../models/User.js";

const BASE_URL = "http://localhost:3000";

/**
 * Implémentation du service de données via API
 */
export class APIDataService extends DataService {
  /**
   * Fonction utilitaire pour faire les appels API
   */
  async apiCall(endpoint) {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error(`API call failed for ${endpoint}:`, error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Récupère les données utilisateur via API
   */
  async getUserData(userId) {
    const result = await this.apiCall(`/user/${userId}`);
    if (result.success) {
      return { success: true, data: new User(result.data) };
    }
    return result;
  }

  /**
   * Récupère l'activité utilisateur via API
   */
  async getUserActivity(userId) {
    const result = await this.apiCall(`/user/${userId}/activity`);
    if (result.success) {
      return { success: true, data: new UserActivity(result.data) };
    }
    return result;
  }

  /**
   * Récupère les sessions moyennes via API
   */
  async getUserAverageSessions(userId) {
    const result = await this.apiCall(`/user/${userId}/average-sessions`);
    if (result.success) {
      return { success: true, data: new UserAverageSessions(result.data) };
    }
    return result;
  }

  /**
   * Récupère les performances via API
   */
  async getUserPerformance(userId) {
    const result = await this.apiCall(`/user/${userId}/performance`);
    if (result.success) {
      return { success: true, data: new UserPerformance(result.data) };
    }
    return result;
  }
}
