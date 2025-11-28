import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  TextField,
  Box,
  Paper,
  TableContainer,
  Toolbar,
  InputAdornment,
  Typography,
  Stack,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { LABELS, MESSAGES } from "../../constants";
import type { Organisation } from "../../models/models";

interface Props {
  organisations: Organisation[];
  onEdit: (org: Organisation) => void;
  onDelete: (org: Organisation) => void;
  onCreate: () => void;
}

export default function OrganisationTable({
  organisations,
  onEdit,
  onDelete,
  onCreate,
}: Props) {
  const [search, setSearch] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const filtered = organisations.filter((o) => {
    const byName = o.name.toLowerCase().includes(search.toLowerCase());
    const byLocation = (o.address || "").toLowerCase().includes(searchLocation.toLowerCase());
    return byName && byLocation;
  });

  const paginated = filtered.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const isSearching = (search?.trim()?.length ?? 0) > 0 || (searchLocation?.trim()?.length ?? 0) > 0;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper elevation={0} sx={{ p: 2, mb: 2, borderRadius: 2, border: "1px solid", borderColor: "divider" }}>
        <Toolbar disableGutters sx={{ gap: 2, flexWrap: "wrap" }}>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Organisations
          </Typography>
          <TextField
            size="small"
            placeholder={LABELS.SEARCH_ORGANISATION}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(0);
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            size="small"
            placeholder="Search by location"
            value={searchLocation}
            onChange={(e) => {
              setSearchLocation(e.target.value);
              setPage(0);
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />
          <Button variant="contained" startIcon={<AddIcon />} onClick={onCreate}>
            {LABELS.BTN_NEW_ORGANISATION}
          </Button>
        </Toolbar>
      </Paper>

      {filtered.length === 0 ? (
        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: 2,
            border: "1px dashed",
            borderColor: "divider",
            textAlign: "center",
            bgcolor: (theme) => theme.palette.action.hover,
          }}
        >
          <Typography variant="h6" sx={{ mb: 1 }}>
            {isSearching ? "No organisations found for your search" : "No organisations found"}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Get started by creating your first organisation.
          </Typography>
          <Button variant="contained" startIcon={<AddIcon />} onClick={onCreate}>
            {LABELS.BTN_NEW_ORGANISATION}
          </Button>
        </Paper>
      ) : isMobile ? (
        <Stack spacing={2}>
          {paginated.map((org, idx) => {
            const hr = (org as any).hr || {};
            const hrName = `${hr.first_name || ""} ${hr.last_name || ""}`.trim() || "-";
            const hrContact = hr.contact_number || "-";
            return (
            <Paper key={org.id ?? `org-${idx}`} sx={{ p: 2, borderRadius: 2, border: "1px solid", borderColor: "divider" }}>
              <Stack spacing={0.5}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  {org.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {org.address || "-"}
                </Typography>
                <Typography variant="body2">
                  HR: {hrName} • {hrContact}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1.5} sx={{ mt: 1.5 }}>
                <Button size="small" variant="outlined" onClick={() => onEdit(org)} startIcon={<EditIcon fontSize="small" />}>Edit</Button>
                <Button size="small" color="error" variant="outlined" onClick={() => onDelete(org)} startIcon={<DeleteIcon fontSize="small" />}>Delete</Button>
              </Stack>
            </Paper>
          )})}
        </Stack>
      ) : (
        <TableContainer component={Paper} sx={{ borderRadius: 2, border: "1px solid", borderColor: "divider" }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>{LABELS.ORGANISATION_NAME}</TableCell>
                <TableCell>{LABELS.ORGANISATION_ADDRESS}</TableCell>
                <TableCell>{LABELS.HR_FIRST_NAME}</TableCell>
                <TableCell>{LABELS.HR_CONTACT}</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginated.map((org, idx) => {
                const hr = (org as any).hr || {};
                const hrName = `${hr.first_name || ""} ${hr.last_name || ""}`.trim() || "-";
                const hrContact = hr.contact_number || "-";
                return (
                <TableRow key={org.id ?? `org-${idx}`} hover sx={{ backgroundColor: idx % 2 ? "action.hover" : "inherit" }}>
                  <TableCell>{org.name}</TableCell>
                  <TableCell>{org.address || "-"}</TableCell>
                  <TableCell>
                    {hrName}
                  </TableCell>
                  <TableCell>{hrContact}</TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => onEdit(org)} aria-label="edit" sx={{ color: (t) => (t.palette.mode === 'dark' ? '#3B82F6' : 'inherit') }}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => onDelete(org)} color="error" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>)
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Simple client-side pagination controls */}
      {filtered.length > 0 && (
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Showing {Math.min(filtered.length, page * rowsPerPage + 1)}-
            {Math.min(filtered.length, (page + 1) * rowsPerPage)} of {filtered.length}
          </Typography>
          <Stack direction="row" spacing={1}>
            <Button
              size="small"
              variant="outlined"
              disabled={page === 0}
              onClick={() => setPage((p) => Math.max(0, p - 1))}
            >
              Prev
            </Button>
            <Button
              size="small"
              variant="outlined"
              disabled={(page + 1) * rowsPerPage >= filtered.length}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </Button>
            <TextField
              select
              size="small"
              SelectProps={{ native: true }}
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(parseInt(e.target.value, 10));
                setPage(0);
              }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
            </TextField>
          </Stack>
        </Stack>
      )}
    </Box>
  );
}
