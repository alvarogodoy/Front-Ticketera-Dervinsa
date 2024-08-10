import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import DashboardPage from "../pages/DashboardPage";
import PrivateRoute from "./PrivateRoute";

const AppRoutes: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route index path="/" element={<HomePage />} />
      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<DashboardPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
