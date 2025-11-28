import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthAPI } from "../api/authApi";
import http from "../utils/httpClient";
import { ROUTES, MESSAGES } from "../constants";
import FullScreenLoader from "../components/common/FullScreenLoader";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function OAuthCallbackPage() {
  const query = useQuery();
  const navigate = useNavigate();

  useEffect(() => {
    const code = query.get("code");

    if (!code) {
      navigate(ROUTES.LOGIN, { replace: true });
      return;
    }

    (async () => {
      try {
        const res = await AuthAPI.exchangeOAuthCode(code);
        const token = res.token;

        localStorage.setItem("token", token);
        http.setToken(token);

        // ⚡ reload browser so AuthContext runs again & loads user
        window.location.href = ROUTES.ORG_LIST;
      } catch (err) {
        console.error("OAuth login failed:", err);
        alert(MESSAGES.ERROR_GENERIC);
        navigate(ROUTES.LOGIN, { replace: true });
      }
    })();
  }, []); // <-- NO external dependencies

  return <FullScreenLoader text="Signing you in..." />;
}
