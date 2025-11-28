// Prefer reading client id from the Vite env to avoid committing it in source.
// Create a `.env` file in project root with:
// VITE_GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com

export const CONFIG = {
  OAUTH_PROVIDER_URL: "https://accounts.google.com/o/oauth2/v2/auth",
  OAUTH_CLIENT_ID:
    "540060915765-jqmltpq1grnmn1merhaekmnjvdin3c3t.apps.googleusercontent.com",
  OAUTH_REDIRECT_URI: "http://localhost:5173/oauth/callback",
  OAUTH_SCOPE: "openid profile email",
  OAUTH_EXTRA_PARAMS:
    "access_type=offline&prompt=consent&include_granted_scopes=true",
} as const;
