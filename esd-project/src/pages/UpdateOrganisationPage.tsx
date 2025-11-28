import { useEffect, useState } from "react";
import { MenuItem, TextField, Stack, Typography, Paper, Box } from "@mui/material";
import AppLayout from "../components/layout/AppLayout";
import { OrganisationAPI } from "../api/organisationApi";
import type { Organisation } from "../models/models";
import OrganisationFormContainer from "../components/containers/OrganisationFormContainer";
import { MESSAGES } from "../constants";

export default function UpdateOrganisationPage() {
  const [orgs, setOrgs] = useState<Organisation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<number | "">("");
  const [selected, setSelected] = useState<Organisation | undefined>(undefined);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await OrganisationAPI.getAll();
        setOrgs(data || []);
      } catch (e) {
        setError(e instanceof Error ? e.message : MESSAGES.ERROR_GENERIC);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    const loadSelected = async () => {
      if (typeof selectedId === "number") {
        try {
          // Fetch full details to ensure nested HR fields are present
          const full = await OrganisationAPI.getById(selectedId);
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
        } catch (e) {
          // Fallback to local list match if detailed fetch fails
          const found = orgs.find((o) => o.id === selectedId);
          if (found) {
            const mapped: Organisation = {
              id: found.id,
              name: (found as any).name,
              address: (found as any).address,
              hr: (() => {
                const list = (found as any).hrContacts as any[] | undefined;
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
          } else {
            setSelected(undefined);
          }
        }
      } else {
        setSelected(undefined);
      }
    };
    loadSelected();
  }, [selectedId, orgs]);

  return (
    <AppLayout title="Update Organisation">
      {loading ? (
        <div>{MESSAGES.LOADING}</div>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <Stack spacing={2} sx={{ width: "100%", maxWidth: 960 }}>
          <Paper elevation={0} sx={{ p: 2, borderRadius: 2, border: "1px solid", borderColor: "divider" }}>
            <Stack spacing={1} direction={{ xs: "column", sm: "row" }} alignItems={{ sm: "center" }}>
              <Typography variant="subtitle1">Select an organisation to update</Typography>
              <TextField
                select
                sx={{ width: { xs: "100%", sm: 360 } }}
                size="small"
                value={selectedId}
                onChange={(e) => setSelectedId(e.target.value ? Number(e.target.value) : "")}
                placeholder="Choose organisation"
              >
                <MenuItem value="">-- Select --</MenuItem>
                {orgs.map((o) => (
                  <MenuItem key={o.id} value={o.id as number}>
                    {o.name}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
          </Paper>

          {selected && (
            <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
              <OrganisationFormContainer
                initialData={selected}
                onCancel={() => {
                  setSelected(undefined);
                  setSelectedId("");
                }}
                onSuccessClose={() => {
                  setSelected(undefined);
                  setSelectedId("");
                }}
              />
            </Box>
          )}
        </Stack>
      )}
    </AppLayout>
  );
}
