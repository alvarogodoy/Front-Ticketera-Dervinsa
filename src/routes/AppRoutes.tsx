import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import DashboardPage from "../pages/DashboardPage";
import PrivateRoute from "./PrivateRoute";
import EmpleadoPage from "../pages/EmpleadoPage";

const AppRoutes: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route index path="/" element={<HomePage />} />
      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/tickets" element={<EmpleadoPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
