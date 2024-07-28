import React from "react";
import ReactDOM from "react-dom/client";
import { CssBaseline } from "@mui/material";
import Layout from "./Layout/Layout.tsx";
import AppRoutes from "./routes/AppRoutes.tsx";
import { Auth0Provider } from "@auth0/auth0-react";
import { AuthConfig } from "./config/AuthConfig.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Auth0Provider
      domain={AuthConfig.domain}
      clientId={AuthConfig.clientId}
      authorizationParams={{
        redirect_uri: AuthConfig.redirectUri,
      }}
    >
      <CssBaseline>
        <Layout>
          <AppRoutes />
        </Layout>
      </CssBaseline>
    </Auth0Provider>
  </React.StrictMode>
);
