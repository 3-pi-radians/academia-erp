import { useNavigate } from "react-router-dom";
import { Button, Box, Typography } from "@mui/material";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        AcademicERP Dashboard
      </Typography>

      <Box
        sx={{ display: "flex", flexDirection: "column", gap: 2, width: 300 }}
      >
        <Button variant="contained" onClick={() => navigate("/organisations")}>
          View Organisations
        </Button>

        <Button
          variant="outlined"
          onClick={() => navigate("/organisations/create")}
        >
          Create Organisation
        </Button>
      </Box>
    </Box>
  );
}
