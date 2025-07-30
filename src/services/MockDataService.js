import { DataService } from "./DataService.js";
import {
  User,
  UserActivity,
  UserAverageSessions,
  UserPerformance,
} from "../models/User.js";
import {
  USER_MAIN_DATA,
  USER_ACTIVITY,
  USER_AVERAGE_SESSIONS,
  USER_PERFORMANCE,
} from "../data/mockData.js";

/**
 * Implémentation du service de données via données mock
 */
export class MockDataService extends DataService {
  /**
   * Récupère les données utilisateur
   */
  async getUserData(userId) {
    const mockUser = USER_MAIN_DATA.find(
      (user) => user.id === parseInt(userId)
    );

    if (mockUser) {
      return { success: true, data: new User(mockUser) };
    }

    return { success: false, error: "User not found" };
  }

  /**
   * Récupère l'activité utilisateur
   */
  async getUserActivity(userId) {
    const mockActivity = USER_ACTIVITY.find(
      (activity) => activity.userId === parseInt(userId)
    );

    if (mockActivity) {
      return { success: true, data: new UserActivity(mockActivity) };
    }

    return { success: false, error: "Activity data not found" };
  }

  /**
   * Récupère les sessions moyennes
   */
  async getUserAverageSessions(userId) {
    const mockSessions = USER_AVERAGE_SESSIONS.find(
      (session) => session.userId === parseInt(userId)
    );

    if (mockSessions) {
      return { success: true, data: new UserAverageSessions(mockSessions) };
    }

    return { success: false, error: "Average sessions data not found" };
  }

  /**
   * Récupère les performances
   */
  async getUserPerformance(userId) {
    const mockPerformance = USER_PERFORMANCE.find(
      (perf) => perf.userId === parseInt(userId)
    );

    if (mockPerformance) {
      return { success: true, data: new UserPerformance(mockPerformance) };
    }

    return { success: false, error: "Performance data not found" };
  }
}
