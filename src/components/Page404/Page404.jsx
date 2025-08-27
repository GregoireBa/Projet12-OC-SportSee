import { Link } from "react-router-dom";
import "./Page404.css";

const Page404 = ({ pageName = "cette page" }) => {
  return (
    <div className="page404">
      <div className="page404-content">
        <div className="page404-icon">
          <span className="page404-number">404</span>
        </div>

        <h1 className="page404-title">Page non disponible</h1>

        <p className="page404-message">
          Désolé, {pageName} n'est pas encore implémentée.
          <br />
          Cette fonctionnalité sera disponible prochainement.
        </p>

        <div className="page404-actions">
          <Link to="/user/12" className="page404-button primary">
            Retourner au tableau de bord
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page404;
