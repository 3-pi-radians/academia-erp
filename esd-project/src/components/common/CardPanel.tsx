import { Paper } from "@mui/material";
import type { PaperProps } from "@mui/material";

export default function CardPanel(props: PaperProps) {
  return (
    <Paper
      {...props}
      elevation={0}
      sx={{ p: { xs: 2, md: 3 }, borderRadius: 2, border: "1px solid", borderColor: "divider", ...(props.sx || {}) }}
    />
  );
}
