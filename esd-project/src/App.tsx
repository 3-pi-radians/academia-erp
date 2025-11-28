import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthProvider from "./context/AuthProvider";
import { useAuth } from "./hooks/useAuth";
import { CONFIG } from "./constants";
import { useMemo } from "react";
import OrganisationListPage from "./pages/ListOrganisationPage";
import OrganisationCreatePage from "./pages/CreateOrganizationPage";
import OrganisationEditPage from "./pages/EditOrganisationPage";
import UpdateOrganisationPage from "./pages/UpdateOrganisationPage";
import OAuthCallbackPage from "./pages/OAuthCallbackPage";
import LoginPage from "./pages/LoginPage";
import LogoutProcessingPage from "./pages/LogoutProcessingPage";
import ProtectedRoute from "./components/containers/ProtectedRoute";
import { ROUTES } from "./constants";
import FullScreenLoader from "./components/common/FullScreenLoader";

function HomePage() {
  const { isAuthenticated, loginWithOAuth, user } = useAuth();

  const oauthUrl = useMemo(() => {
    const params = new URLSearchParams({
      client_id: CONFIG.OAUTH_CLIENT_ID,
      redirect_uri: CONFIG.OAUTH_REDIRECT_URI,
      response_type: "code",
      scope: CONFIG.OAUTH_SCOPE,
    });
    const extra = (CONFIG as { OAUTH_EXTRA_PARAMS?: string })
      .OAUTH_EXTRA_PARAMS;
    return `${CONFIG.OAUTH_PROVIDER_URL}?${params.toString()}${
      extra ? `&${extra}` : ""
    }`;
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Welcome to Academic ERP</h2>

      {isAuthenticated ? (
        <div>Signed in as {user?.username || user?.email || "(unknown)"}</div>
      ) : (
        <div>
          <p>Please sign in to continue.</p>
          <button onClick={loginWithOAuth}>Sign in with Google</button>

          <div style={{ marginTop: 12 }}>
            <strong>Debug</strong>
            <div>OAUTH_CLIENT_ID: {CONFIG.OAUTH_CLIENT_ID || "(not set)"}</div>
            <div style={{ marginTop: 8, wordBreak: "break-all" }}>
              {oauthUrl}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function RootRedirect() {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <FullScreenLoader text="Signing you in..." />;
  return (
    <Navigate
      to={isAuthenticated ? ROUTES.ORG_LIST : ROUTES.LOGIN}
      replace
    />
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.HOME} element={<RootRedirect />} />
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.OAUTH_CALLBACK} element={<OAuthCallbackPage />} />
          <Route path={ROUTES.LOGOUT_PROCESS} element={<LogoutProcessingPage />} />

          <Route element={<ProtectedRoute />}>
            <Route path={ROUTES.ORG_LIST} element={<OrganisationListPage />} />
            <Route
              path={ROUTES.ORG_CREATE}
              element={<OrganisationCreatePage />}
            />
            <Route
              path={ROUTES.ORG_UPDATE}
              element={<UpdateOrganisationPage />}
            />
            <Route path={ROUTES.ORG_EDIT} element={<OrganisationEditPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
