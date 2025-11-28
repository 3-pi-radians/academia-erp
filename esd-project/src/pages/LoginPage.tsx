import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { ROUTES } from "../constants";
import { Box, Paper, Stack, Typography, Button } from "@mui/material";

export default function LoginPage() {
  const { isAuthenticated, loginWithOAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      // if already authenticated, go to home
      navigate(ROUTES.HOME, { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
        bgcolor: (t) => (t.palette.mode === "dark" ? "#111827" : "#f5f7fb"),
        backgroundImage: (t) =>
          `radial-gradient(60% 80% at 50% 0%, ${t.palette.primary.main}12 0%, transparent 70%),
           linear-gradient(135deg, ${t.palette.primary.main}14 0%, ${t.palette.secondary.main}14 100%)`,
      }}
    >
      <Paper
        sx={{
          width: "min(100%, 640px)",
          p: { xs: 3, sm: 4 },
          borderRadius: 2.5,
          border: "1px solid",
          borderColor: "divider",
          bgcolor: (t) => t.palette.background.paper,
          boxShadow: (t) => t.shadows[8],
        }}
      >
        <Stack spacing={2} alignItems="center" textAlign="center">
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 56,
              height: 56,
              borderRadius: 2,
              backgroundImage: (t) =>
                `linear-gradient(135deg, ${t.palette.primary.main}33, ${t.palette.secondary.main}33)`,
            }}
          >
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2a10 10 0 100 20 10 10 0 000-20z" fill="#F3F4F6" />
              <path d="M7 13l3 3 7-7" stroke="#10B981" strokeWidth="2" />
            </svg>
          </Box>
          <Box>
            <Typography variant="h5">Welcome to Academia</Typography>
            <Typography variant="body2" color="text.secondary">
              Sign in to continue to your dashboard
            </Typography>
          </Box>
          <Button
            onClick={loginWithOAuth}
            aria-label="Sign in with Google"
            variant="contained"
            sx={{
              width: "100%",
              py: 1.25,
              borderRadius: 1.25,
              color: (t) =>
                t.palette.mode === "light" ? "#111827" : "#F9FAFB",
              backgroundColor: (t) =>
                t.palette.mode === "light" ? "#ffffff" : "#111827",
              border: (t) => `1px solid ${t.palette.divider}`,
              boxShadow: (t) => t.shadows[2],
              "&:hover": {
                boxShadow: (t) => t.shadows[6],
                backgroundColor: (t) =>
                  t.palette.mode === "light" ? "#f5f6f8" : "#0d121a",
              },
            }}
            startIcon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                width="22"
                height="22"
              >
                <path
                  fill="#FFC107"
                  d="M43.6 20.5H42V20H24v8h11.3C33.7 32.3 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.9z"
                />
                <path
                  fill="#FF3D00"
                  d="M6.3 14.7l6.6 4.8C14.5 16 18.9 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 16.1 4 9.2 8.2 6.3 14.7z"
                />
                <path
                  fill="#4CAF50"
                  d="M24 44c5.1 0 9.8-1.9 13.3-5l-6.1-5.2c-2.3 1.6-5.2 2.6-7.2 2.6-5.2 0-9.6-3.7-11.2-8.7l-6.5 5C9.2 39.8 16.1 44 24 44z"
                />
                <path
                  fill="#1976D2"
                  d="M43.6 20.5H42V20H24v8h11.3c-1.3 3.8-5.1 6.5-9.3 6.5-5.2 0-9.6-3.7-11.2-8.7l-6.5 5C9.2 39.8 16.1 44 24 44c8.4 0 19-6.1 19-20 0-1.3-.1-2.7-.4-3.9z"
                />
              </svg>
            }
          >
            Continue with Google
          </Button>
          <Typography variant="caption" color="text.secondary">
            By continuing, you agree to our Terms and Privacy Policy.
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
}
