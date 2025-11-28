import { Box, Button, Typography } from "@mui/material";
import { ReactNode } from "react";

export default function EmptyState({
  title = "No data",
  description,
  actionLabel,
  onAction,
  illustration,
}: {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  illustration?: ReactNode;
}) {
  return (
    <Box sx={{
      textAlign: "center",
      p: 4,
      border: "1px dashed",
      borderColor: "divider",
      borderRadius: 2,
      bgcolor: (t) => t.palette.background.paper,
    }}>
      {illustration && <Box sx={{ mb: 2 }}>{illustration}</Box>}
      <Typography variant="subtitle1" sx={{ mb: 0.5 }}>{title}</Typography>
      {description && (
        <Typography variant="body2" color="text.secondary" sx={{ mb: actionLabel ? 2 : 0 }}>
          {description}
        </Typography>
      )}
      {actionLabel && onAction && (
        <Button variant="contained" onClick={onAction}>{actionLabel}</Button>
      )}
    </Box>
  );
}
