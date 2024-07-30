import React from "react";
import ReactDOM from "react-dom/client";
import { CssBaseline } from "@mui/material";
import Layout from "./Layout/Layout.tsx";
import AppRoutes from "./routes/AppRoutes.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import { AuthConfig } from "./config/AuthConfig.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CssBaseline>
      <AuthProvider domain={AuthConfig.domain} clientId={AuthConfig.clientId}>
        <Layout>
          <AppRoutes />
        </Layout>
      </AuthProvider>
    </CssBaseline>
  </React.StrictMode>
);
