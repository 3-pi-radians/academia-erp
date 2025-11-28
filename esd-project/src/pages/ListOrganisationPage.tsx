import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogTitle, DialogContent, IconButton, Stack, Typography, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import OrganisationTable from "../components/presentation/OrganisationTable";
import { OrganisationAPI } from "../api/organisationApi";
import type { Organisation } from "../models/models";
import { MESSAGES, ROUTES } from "../constants";
import AppLayout from "../components/layout/AppLayout";
import OrganisationFormContainer from "../components/containers/OrganisationFormContainer";
import CardPanel from "../components/common/CardPanel";
import PageHeader from "../components/common/PageHeader";
import EmptyState from "../components/common/EmptyState";
import LoadingOverlay from "../components/common/LoadingOverlay";
import { useToast } from "../components/common/ToastProvider";

export default function OrganisationListPage() {
  const [organisations, setOrganisations] = useState<Organisation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [selected, setSelected] = useState<Organisation | undefined>(undefined);

  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await OrganisationAPI.getAll();

        if (!cancelled) {
          const normalised = (data || []).map((full: any) => {
            const list = full?.hrContacts as any[] | undefined;
            const first = list && list.length ? list[0] : undefined;
            return {
              id: full?.id,
              name: full?.name || "",
              address: full?.address || "",
              hr: {
                id: first?.id,
                first_name: first?.firstName || first?.first_name || "",
                last_name: first?.lastName || first?.last_name || "",
                contact_number: first?.contactNumber || first?.contact_number || "",
                email: first?.email || "",
              },
            } as Organisation;
          });
          setOrganisations(normalised);
        }
      } catch (err) {
        if (!cancelled) {
          const message =
            err instanceof Error ? err.message : MESSAGES.ERROR_GENERIC;
          setError(message);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await OrganisationAPI.remove(id);
      // Optimistically update UI without refetch
      setOrganisations((prev) => prev.filter((org) => org.id !== id));
      toast({ variant: "success", message: "Organisation deleted" });
    } catch (err) {
      const message = err instanceof Error ? err.message : MESSAGES.ERROR_GENERIC;
      toast({ variant: "error", message });
    }
  };

  const handleEdit = async (org: Organisation) => {
    if (!org.id) return;
    try {
      const full = await OrganisationAPI.getById(org.id);
      const mapped: Organisation = {
        id: full.id,
        name: (full as any).name,
        address: (full as any).address,
        hr: (() => {
          const list = (full as any).hrContacts as any[] | undefined;
          const first = list && list.length ? list[0] : undefined;
          return {
            id: first?.id,
            first_name: first?.firstName || first?.first_name || "",
            last_name: first?.lastName || first?.last_name || "",
            contact_number: first?.contactNumber || first?.contact_number || "",
            email: first?.email || "",
          };
        })(),
      } as Organisation;
      setSelected(mapped);
      setEditOpen(true);
    } catch (e) {
      toast({ variant: "error", message: MESSAGES.ERROR_GENERIC });
    }
  };

  const handleCreate = () => {
    navigate(ROUTES.ORG_CREATE);
  };

  return (
    <AppLayout title="Organisations">
      <PageHeader title="Organisations" subtitle="Manage companies and their HR contacts" />

      {error ? (
        <CardPanel>
          <Stack spacing={1} alignItems="flex-start">
            <Typography color="error">{error}</Typography>
            <Button variant="outlined" onClick={() => window.location.reload()}>Retry</Button>
          </Stack>
        </CardPanel>
      ) : (
        <>
          <OrganisationTable
            organisations={organisations}
            onEdit={handleEdit}
            onDelete={(org) => org.id && handleDelete(org.id)}
            onCreate={handleCreate}
          />
          {organisations.length === 0 && !loading && (
            <EmptyState
              title="No organisations yet"
              description="Create your first organisation to get started."
              actionLabel="Create organisation"
              onAction={handleCreate}
            />
          )}
        </>
      )}

      <LoadingOverlay open={loading} />

      <Dialog open={editOpen} onClose={() => setEditOpen(false)} fullWidth maxWidth="md">
        <DialogTitle sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {selected ? (
            <span>
              Edit <span style={{ fontWeight: 600 }}><span style={{ color: 'var(--mui-palette-primary-main)' }}>{selected.name}</span></span> Details
            </span>
          ) : (
            "Edit Organisation"
          )}
          <IconButton onClick={() => setEditOpen(false)} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {selected && (
            <OrganisationFormContainer
              initialData={selected}
              hideHeader
              hideCancel
              subtitle="Update organisation details and HR contact information"
              onSuccessClose={() => setEditOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
}
