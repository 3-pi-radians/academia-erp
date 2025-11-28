import { useEffect } from "react";
import FullScreenLoader from "../components/common/FullScreenLoader";
import { API_BASE_URL } from "../constants";

export default function LogoutProcessingPage() {
  useEffect(() => {
    const backendBase = API_BASE_URL.replace(/\/api$/, "");
    const timer = setTimeout(() => {
      window.location.href = `${backendBase}/logout`;
    }, 250);
    return () => clearTimeout(timer);
  }, []);

  return <FullScreenLoader text="Signing you out..." />;
}
