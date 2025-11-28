import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import Zoom from "@mui/material/Zoom";

interface ErrorDialogProps {
  open: boolean;
  title?: string;
  description?: string;
  actionLabel?: string;
  onClose: () => void;
}

export default function ErrorDialog({
  open,
  title = "Something went wrong",
  description = "We couldn't complete your request.",
  actionLabel = "OK",
  onClose,
}: ErrorDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      TransitionComponent={Zoom}
      TransitionProps={{ timeout: 200 }}
      PaperProps={{ sx: { overflow: "hidden", borderRadius: 3 } }}
    >
      <DialogTitle sx={{ textAlign: "center", pb: 0 }}>{title}</DialogTitle>
      <DialogContent sx={{ pt: 1 }}>
        <Box sx={{ display: "flex", justifyContent: "center", my: 1.5 }}>
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              background: (t) => t.palette.error.main,
              boxShadow: (t) => `0 10px 24px ${t.palette.error.main}33`,
              animation: "shake 420ms ease-out",
            }}
          >
            <ErrorOutlineIcon sx={{ fontSize: 48, color: "#fff" }} />
          </Box>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center", px: 1 }}>
          {description}
        </Typography>
        <style>
          {`@keyframes shake { 10%, 90% { transform: translateX(-1px); } 20%, 80% { transform: translateX(2px); } 30%, 50%, 70% { transform: translateX(-4px); } 40%, 60% { transform: translateX(4px); } }`}
        </style>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
        <Button variant="contained" color="error" onClick={onClose} autoFocus sx={{ px: 3 }}>
          {actionLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
