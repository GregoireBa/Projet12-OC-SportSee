/**
 * Classe User pour standardiser les données utilisateur
 */
export class User {
  constructor(userData) {
    this.id = userData.id;
    this.firstName = userData.userInfos?.firstName || "";
    this.lastName = userData.userInfos?.lastName || "";
    this.age = userData.userInfos?.age || 0;

    this.score = userData.todayScore || userData.score || 0;

    this.calories = userData.keyData?.calorieCount || 0;
    this.proteins = userData.keyData?.proteinCount || 0;
    this.carbohydrates = userData.keyData?.carbohydrateCount || 0;
    this.lipids = userData.keyData?.lipidCount || 0;
  }

  /**
   * Retourne le nom complet de l'utilisateur
   */
  getFullName() {
    return `${this.firstName} ${this.lastName}`.trim();
  }

  /**
   * Retourne le score en pourcentage
   */
  getScorePercentage() {
    return Math.round(this.score * 100);
  }

  /**
   * Retourne les données nutritionnelles formatées
   */
  getNutritionData() {
    return {
      calories: {
        value: this.calories,
        unit: "kCal",
        label: "Calories",
      },
      proteins: {
        value: this.proteins,
        unit: "g",
        label: "Protéines",
      },
      carbohydrates: {
        value: this.carbohydrates,
        unit: "g",
        label: "Glucides",
      },
      lipids: {
        value: this.lipids,
        unit: "g",
        label: "Lipides",
      },
    };
  }
}

/**
 * Classe UserActivity pour standardiser les données d'activité
 */
export class UserActivity {
  constructor(activityData) {
    this.userId = activityData.userId;
    this.sessions = Array.isArray(activityData.sessions)
      ? activityData.sessions.map((session) => ({
          day: session.day,
          weight: session.kilogram,
          calories: session.calories,
          dayNumber: new Date(session.day).getDate(),
        }))
      : [];
  }

  /**
   * Retourne les données formatées pour les graphiques
   */
  getFormattedSessions() {
    return this.sessions;
  }
}

/**
 * Classe UserAverageSessions pour standardiser les sessions moyennes
 */
export class UserAverageSessions {
  constructor(sessionsData) {
    this.userId = sessionsData.userId;
    this.sessions =
      sessionsData.sessions?.map((session) => ({
        day: session.day,
        sessionLength: session.sessionLength,
        // Conversion du numéro de jour en lettre
        dayLetter: this.getDayLetter(session.day),
      })) || [];
  }

  /**
   * Convertit le numéro de jour en lettre
   * @param {number} dayNumber - Numéro du jour (1-7)
   * @returns {string} - Lettre du jour
   */
  getDayLetter(dayNumber) {
    const days = ["L", "M", "M", "J", "V", "S", "D"];
    return days[dayNumber - 1] || "";
  }

  /**
   * Retourne les données formatées pour les graphiques
   * @returns {Array} - Sessions formatées
   */
  getFormattedSessions() {
    return this.sessions;
  }
}

/**
 * Classe UserPerformance pour standardiser les performances
 */
export class UserPerformance {
  constructor(performanceData) {
    this.userId = performanceData.userId;
    this.kind = performanceData.kind || {};
    this.data = Array.isArray(performanceData.data)
      ? performanceData.data.map((item) => ({
          value: item.value,
          kind: item.kind,
          label: this.kind[item.kind] || "",
          frenchLabel: this.getFrenchLabel(this.kind[item.kind]),
        }))
      : [];
  }

  /**
   * Traduit les labels en français
   */
  getFrenchLabel(englishLabel) {
    const translations = {
      cardio: "Cardio",
      energy: "Énergie",
      endurance: "Endurance",
      strength: "Force",
      speed: "Vitesse",
      intensity: "Intensité",
    };
    return translations[englishLabel] || englishLabel;
  }

  /**
   * Retourne les données formatées pour les graphiques
   */
  getFormattedPerformances() {
    return this.data;
  }
}
