import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import Dashboard from "../components/Dashboard/Dashboard";
import Page404 from "../components/Page404/Page404";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/user/12" replace />} />
        <Route path="user/:userId" element={<Dashboard />} />

        <Route path="profil" element={<Page404 pageName="la page Profil" />} />
        <Route
          path="reglage"
          element={<Page404 pageName="la page Réglages" />}
        />
        <Route
          path="communaute"
          element={<Page404 pageName="la page Communauté" />}
        />

        <Route path="*" element={<Page404 pageName="cette page" />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
