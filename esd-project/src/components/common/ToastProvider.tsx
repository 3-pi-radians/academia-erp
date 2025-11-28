import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { Alert, Snackbar } from "@mui/material";

export type ToastVariant = "success" | "info" | "warning" | "error";

interface ToastOptions {
  message: string;
  variant?: ToastVariant;
  autoHideDuration?: number;
}

interface ToastContextValue {
  toast: (opts: ToastOptions | string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

export default function ToastProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState<ToastVariant>("info");
  const [autoHideDuration, setAutoHideDuration] = useState<number | undefined>(3000);

  const toast = useCallback((opts: ToastOptions | string) => {
    if (typeof opts === "string") {
      setMessage(opts);
      setVariant("info");
      setAutoHideDuration(3000);
    } else {
      setMessage(opts.message);
      setVariant(opts.variant ?? "info");
      setAutoHideDuration(opts.autoHideDuration ?? 3000);
    }
    setOpen(true);
  }, []);

  const value = useMemo(() => ({ toast }), [toast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <Snackbar
        open={open}
        onClose={() => setOpen(false)}
        autoHideDuration={autoHideDuration}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={() => setOpen(false)} severity={variant} variant="filled" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </ToastContext.Provider>
  );
}
