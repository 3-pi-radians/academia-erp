import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Zoom from "@mui/material/Zoom";

interface SuccessDialogProps {
  open: boolean;
  title?: string;
  description?: string;
  actionLabel?: string;
  onClose: () => void;
}

export default function SuccessDialog({
  open,
  title = "Success",
  description = "Operation completed successfully.",
  actionLabel = "OK",
  onClose,
}: SuccessDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      TransitionComponent={Zoom}
      TransitionProps={{ timeout: 240 }}
      PaperProps={{
        sx: {
          overflow: "hidden",
          borderRadius: 3,
          boxShadow: (t) => t.shadows[10],
        },
      }}
    >
      <DialogTitle sx={{ textAlign: "center", pb: 0 }}>{title}</DialogTitle>
      <DialogContent sx={{ pt: 1 }}>
        <Box sx={{ display: "flex", justifyContent: "center", my: 1.5 }}>
          {/* Animated success badge */}
          <Box
            sx={{
              position: "relative",
              width: 96,
              height: 96,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "success.contrastText",
              background:
                "linear-gradient(135deg, rgba(16,185,129,0.92), rgba(59,130,246,0.92))",
              boxShadow: (t) => `0 10px 24px ${t.palette.success.main}33`,
              animation: "popIn 380ms ease-out",
              "&::after": {
                content: "''",
                position: "absolute",
                inset: -6,
                borderRadius: "50%",
                border: (t) => `2px solid ${t.palette.success.main}44`,
                animation: "ring 1200ms ease-out",
              },
            }}
          >
            <CheckCircleIcon sx={{ fontSize: 54, color: "#fff" }} />

            {/* Confetti bits */}
            {[...Array(8)].map((_, i) => (
              <Box
                // eslint-disable-next-line react/no-array-index-key
                key={i}
                sx={{
                  position: "absolute",
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  top: 44,
                  left: 44,
                  backgroundColor: (t) =>
                    [
                      t.palette.warning.main,
                      t.palette.info.main,
                      t.palette.secondary.main,
                      t.palette.success.main,
                    ][i % 4],
                  transformOrigin: "-4px -4px",
                  animation: `burst 700ms ease-out ${i * 40}ms both`,
                }}
              />
            ))}
          </Box>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center", px: 1 }}>
          {description}
        </Typography>

        {/* Keyframes */}
        <style>
          {`@keyframes popIn { 0% { transform: scale(0.6); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
            @keyframes ring { 0% { transform: scale(0.8); opacity: 0.6; } 100% { transform: scale(1.15); opacity: 0; } }
            @keyframes burst { 0% { transform: rotate(0deg) translate(0) scale(1); opacity: 1; } 100% { transform: rotate(1turn) translate(36px) scale(0.9); opacity: 0; } }`}
        </style>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
        <Button
          variant="contained"
          onClick={onClose}
          autoFocus
          sx={{ px: 3 }}
        >
          {actionLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
