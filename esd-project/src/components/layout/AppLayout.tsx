import { ReactNode, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Avatar,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import AddIcon from "@mui/icons-material/Add";
import UpdateIcon from "@mui/icons-material/Upgrade";
import ListIcon from "@mui/icons-material/List";
import LogoutIcon from "@mui/icons-material/Logout";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { ROUTES } from "../../constants";
import { useAuth } from "../../hooks/useAuth";
import { useThemeMode } from "../../theme/ThemeModeProvider";

const drawerWidth = 240;

interface AppLayoutProps {
  children: ReactNode;
  centerContent?: boolean;
  title?: string;
}

export default function AppLayout({ children, centerContent, title }: AppLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  const navItems = [
    { icon: <ListIcon />, label: "Show Organisations", path: ROUTES.ORG_LIST, action: () => navigate(ROUTES.ORG_LIST) },
    { icon: <AddIcon />, label: "Create", path: ROUTES.ORG_CREATE, action: () => navigate(ROUTES.ORG_CREATE) },
    { icon: <UpdateIcon />, label: "Update", path: ROUTES.ORG_UPDATE, action: () => navigate(ROUTES.ORG_UPDATE) },
    { icon: <LogoutIcon />, label: "Logout", path: "__logout__", action: () => { logout(); navigate(ROUTES.LOGIN); } },
  ];

  const drawer = (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Toolbar />
      <Divider />
      {/* Top navigation items */}
      <List sx={{ px: 1, py: 1 }}>
        {navItems
          .filter((i) => i.path !== "__logout__")
          .map((item) => {
            const isList = location.pathname === ROUTES.ORG_LIST;
            const isCreate = location.pathname.startsWith(ROUTES.ORG_CREATE);
            const isUpdate = location.pathname.startsWith(ROUTES.ORG_UPDATE);
            const isActive =
              (item.label === "Show Organisations" && isList) ||
              (item.label === "Create" && isCreate) ||
              (item.label === "Update" && isUpdate);
            return (
              <ListItemButton
                key={item.label}
                onClick={item.action}
                selected={isActive}
                sx={{
                  my: 0.5,
                  transition: "all 180ms ease",
                  "&:hover": {
                    transform: "translateX(4px)",
                    bgcolor: (theme) => theme.palette.action.hover,
                  },
                  "& .MuiListItemIcon-root": {
                    transition: "color 180ms ease",
                  },
                  "&.Mui-selected": {
                    bgcolor: (theme) =>
                      theme.palette.mode === "dark"
                        ? "#ffffff"
                        : alpha(theme.palette.primary.main, 0.12),
                    color: (theme) => theme.palette.primary.main,
                    borderRadius: 9999,
                    "& .MuiListItemIcon-root": {
                      color: (theme) => theme.palette.primary.main,
                    },
                    boxShadow: (theme) =>
                      theme.palette.mode === "dark"
                        ? `inset 0 0 0 1px ${alpha(theme.palette.primary.main, 0.24)}`
                        : `inset 0 0 0 1px ${alpha(theme.palette.primary.main, 0.2)}`,
                  },
                  "&.Mui-selected:hover": {
                    bgcolor: (theme) =>
                      theme.palette.mode === "dark"
                        ? "#f3f4f6"
                        : alpha(theme.palette.primary.main, 0.16),
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 36 }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            );
          })}
      </List>

      {/* Spacer to push logout to bottom */}
      <Box sx={{ flexGrow: 1 }} />

      {/* Bottom logout item */}
      <Divider />
      <List sx={{ px: 1, py: 1 }}>
        {navItems
          .filter((i) => i.path === "__logout__")
          .map((item) => (
            <ListItemButton
              key={item.label}
              onClick={item.action}
              sx={{
                my: 0.5,
                transition: "all 180ms ease",
                "&:hover": {
                  transform: "translateX(4px)",
                  bgcolor: (theme) => theme.palette.action.hover,
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 36 }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          bgcolor: (t) => (t.palette.mode === 'light' ? t.palette.primary.main : 'transparent'),
          color: (t) => (t.palette.mode === 'light' ? t.palette.getContrastText(t.palette.primary.main) : '#ffffff'),
          boxShadow: 'none',
          border: 'none',
          borderBottom: 'none',
          backgroundImage: (t) =>
            t.palette.mode === 'dark'
              ? 'linear-gradient(90deg, #4F46E5, #7C3AED)'
              : 'none',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {title || "Academic ERP"}
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          {/* Right side user info */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
            {(() => {
              const { mode, toggle, isSingleTheme } = useThemeMode();
              if (isSingleTheme) return null;
              const isDark = mode === "dark";
              return (
                <IconButton
                  color="inherit"
                  aria-label="Toggle color mode"
                  title={isDark ? "Switch to light mode" : "Switch to dark mode"}
                  onClick={toggle}
                  size="small"
                >
                  {isDark ? <LightModeIcon fontSize="small" /> : <DarkModeIcon fontSize="small" />}
                </IconButton>
              );
            })()}
            <Typography variant="body2" sx={{ display: { xs: "none", sm: "block" } }}>
              {(user as any)?.username || (user as any)?.name || (user as any)?.email || "User"}
            </Typography>
            <Avatar 
              src={(user as any)?.profilePicture} 
              alt="Profile"
              sx={{ 
                width: 32, 
                height: 32, 
                bgcolor: (t) => t.palette.secondary.main,
                '&:hover': {
                  cursor: 'pointer',
                  opacity: 0.9
                }
              }}
            >
              {!((user as any)?.profilePicture) && 
                String(((user as any)?.username || (user as any)?.name || (user as any)?.email || "U")).trim().charAt(0).toUpperCase()
              }
            </Avatar>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }} aria-label="sidebar">
        {/* Mobile drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              bgcolor: (t) =>
                t.palette.mode === "light"
                  ? '#F0F2F5'
                  : alpha(t.palette.background.paper, 0.96),
              boxShadow: (t) => t.shadows[6],
              borderRight: (t) => `1px solid ${t.palette.divider}`,
            },
          }}
        >
          {drawer}
        </Drawer>
        {/* Desktop drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              bgcolor: (t) =>
                t.palette.mode === "light"
                  ? '#F0F2F5'
                  : alpha(t.palette.background.paper, 0.96),
              boxShadow: (t) => t.shadows[6],
              borderRight: (t) => `1px solid ${t.palette.divider}`,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: { xs: 2, md: 3 },
          px: { xs: 2, md: 3 },
          pb: { xs: 8, md: 9 },
          width: { md: `calc(100% - ${drawerWidth}px)` },
          display: "flex",
          flexDirection: "column",
          bgcolor: (t) => t.palette.background.default,
          borderLeft: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar />
        <Box sx={{ flex: 1, display: "flex", alignItems: centerContent ? "center" : "stretch", justifyContent: centerContent ? "center" : "stretch" }}>
          <Box sx={{ width: "100%", maxWidth: centerContent ? 720 : "100%" }}>{children}</Box>
        </Box>
        {/* Footer */}
        <Box
          component="footer"
          sx={{
            position: 'fixed',
            left: { xs: 0, md: `${drawerWidth}px` },
            right: 0,
            bottom: 0,
            py: 2,
            textAlign: 'center',
            bgcolor: (t) => (t.palette.mode === 'dark' ? t.palette.background.default : t.palette.primary.light),
            color: (t) => (t.palette.mode === 'dark' ? '#ffffff' : t.palette.getContrastText(t.palette.primary.light!)),
            zIndex: (t) => t.zIndex.appBar - 1,
          }}
        >
          <Typography variant="body2" sx={{ color: 'inherit' }}>© {new Date().getFullYear()} Academic ERP</Typography>
        </Box>
      </Box>
    </Box>
  );

}
