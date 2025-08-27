import { PERFORMANCE_TRANSLATIONS, DAYS_MAP } from "../utils/constants.js";

/**
 * Classe User pour standardiser les données utilisateur
 */
export class User {
  constructor(userData) {
    // Gestion de la structure API vs Mock
    const data = userData.data || userData;

    this.id = data.id;
    this.firstName = data.userInfos?.firstName || "";
    this.lastName = data.userInfos?.lastName || "";
    this.age = data.userInfos?.age || 0;

    this.score = data.todayScore || data.score || 0;

    this.calories = data.keyData?.calorieCount || 0;
    this.proteins = data.keyData?.proteinCount || 0;
    this.carbohydrates = data.keyData?.carbohydrateCount || 0;
    this.lipids = data.keyData?.lipidCount || 0;
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
    // Gestion flexible de la structure des données
    const data = activityData.data || activityData;

    this.userId = data.userId;
    this.sessions = Array.isArray(data.sessions)
      ? data.sessions.map((session) => ({
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
    // Gestion flexible de la structure des données
    const data = sessionsData.data || sessionsData;

    this.userId = data.userId;
    this.sessions =
      data.sessions?.map((session) => ({
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
    return DAYS_MAP[dayNumber] || "";
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
    // Gestion flexible de la structure des données
    const data = performanceData.data || performanceData;

    this.userId = data.userId;
    this.kind = data.kind || {};
    this.data = Array.isArray(data.data)
      ? data.data.map((item) => ({
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
    return PERFORMANCE_TRANSLATIONS[englishLabel] || englishLabel;
  }

  /**
   * Retourne les données formatées pour les graphiques
   */
  getFormattedPerformances() {
    // Ordre spécifique pour correspondre à la maquette (sens horaire depuis le haut)
    const order = ['intensity', 'speed', 'strength', 'endurance', 'energy', 'cardio'];
    
    return order.map(kindKey => {
      const item = this.data.find(d => d.label.toLowerCase() === kindKey);
      return item || { value: 0, frenchLabel: kindKey };
    });
  }
}
