import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthProvider from "./context/AuthProvider";
import { useAuth } from "./hooks/useAuth";
import OrganisationListPage from "./pages/ListOrganisationPage";
import OrganisationCreatePage from "./pages/CreateOrganizationPage";
import OrganisationEditPage from "./pages/EditOrganisationPage";
import UpdateOrganisationPage from "./pages/UpdateOrganisationPage";
// import OAuthCallbackPage from "./pages/OAuthCallbackPage";
import LoginPage from "./pages/LoginPage";
import LogoutProcessingPage from "./pages/LogoutProcessingPage";
import ProtectedRoute from "./components/containers/ProtectedRoute";
import { ROUTES } from "./constants";
import FullScreenLoader from "./components/common/FullScreenLoader";

function RootRedirect() {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <FullScreenLoader text="Signing you in..." />;
  return (
    <Navigate to={isAuthenticated ? ROUTES.ORG_LIST : ROUTES.LOGIN} replace />
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.HOME} element={<RootRedirect />} />
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          {/* <Route path={ROUTES.OAUTH_CALLBACK} element={<OAuthCallbackPage />} /> */}
          <Route
            path={ROUTES.LOGOUT_PROCESS}
            element={<LogoutProcessingPage />}
          />

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
