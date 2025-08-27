/* eslint-disable no-unused-vars */
/**
 * Classe de base (interface) pour les services de données
 */
export class DataService {
  /**
   * Récupère les données utilisateur
   */
  async getUserData(userId) {
    throw new Error("getUserData method must be implemented");
  }

  /**
   * Récupère l'activité utilisateur
   */
  async getUserActivity(userId) {
    throw new Error("getUserActivity method must be implemented");
  }

  /**
   * Récupère les sessions moyennes
   */
  async getUserAverageSessions(userId) {
    throw new Error("getUserAverageSessions method must be implemented");
  }

  /**
   * Récupère les performances
   */
  async getUserPerformance(userId) {
    throw new Error("getUserPerformance method must be implemented");
  }

  /**
   * Récupère toutes les données d'un utilisateur
   */
  async getAllUserData(userId) {
    try {
      const [userData, activity, averageSessions, performance] =
        await Promise.all([
          this.getUserData(userId),
          this.getUserActivity(userId),
          this.getUserAverageSessions(userId),
          this.getUserPerformance(userId),
        ]);

      return {
        success: true,
        data: {
          user: userData.success ? userData.data : null,
          activity: activity.success ? activity.data : null,
          averageSessions: averageSessions.success
            ? averageSessions.data
            : null,
          performance: performance.success ? performance.data : null,
        },
      };
    } catch (error) {
      console.error("Error in getAllUserData:", error);
      return {
        success: false,
        error: "Failed to fetch user data",
      };
    }
  }
}