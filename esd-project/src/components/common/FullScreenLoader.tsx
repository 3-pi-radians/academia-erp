import { Box, CircularProgress, Typography } from "@mui/material";

export default function FullScreenLoader({ text = "Loading..." }: { text?: string }) {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <CircularProgress />
      <Typography variant="body1" color="text.secondary">
        {text}
      </Typography>
    </Box>
  );
}
