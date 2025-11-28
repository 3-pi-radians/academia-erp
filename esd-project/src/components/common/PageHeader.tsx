import { Box, Breadcrumbs, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { ReactNode } from "react";

interface Crumb { label: string; href?: string }

export default function PageHeader({
  title,
  subtitle,
  crumbs,
  actions,
}: {
  title: string;
  subtitle?: string;
  crumbs?: Crumb[];
  actions?: ReactNode;
}) {
  return (
    <Box sx={{ mb: 2 }}>
      {crumbs && crumbs.length > 0 && (
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} sx={{ mb: 1 }}>
          {crumbs.map((c, i) => (
            <Typography key={`${c.label}-${i}`} variant="caption" color="text.secondary">
              {c.label}
            </Typography>
          ))}
        </Breadcrumbs>
      )}
      <Box sx={{ display: "flex", alignItems: { xs: "stretch", sm: "center" }, justifyContent: "space-between", gap: 1, flexDirection: { xs: "column", sm: "row" } }}>
        <Box>
          <Typography variant="h4" sx={{ mb: subtitle ? 0.5 : 0 }}>{title}</Typography>
          {subtitle && (
            <Typography variant="body2" color="text.secondary">{subtitle}</Typography>
          )}
        </Box>
        {actions && <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>{actions}</Box>}
      </Box>
    </Box>
  );
}
