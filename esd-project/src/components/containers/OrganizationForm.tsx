import { Button, TextField, Box, Grid } from "@mui/material";
import type { Organisation } from "../../models/models";
import { useState, type ChangeEvent, type FormEvent } from "react";

interface Props {
  initialData?: Organisation;
  onSubmit: (data: Organisation) => void;
}

export default function OrganisationForm({ initialData, onSubmit }: Props) {
  const [org, setOrg] = useState<Organisation>(
    initialData || {
      name: "",
      address: "",
      hr: {
        first_name: "",
        last_name: "",
        contact_number: "",
        email: "",
      },
    }
  );

  return (
    <Box
      component="form"
      sx={{ maxWidth: 600 }}
      onSubmit={(e: FormEvent) => {
        e.preventDefault();
        onSubmit(org);
      }}
    >
      <Grid container spacing={2}>
        {/* Organisation Name */}
        <Grid item xs={12}>
          <TextField
            label="Organisation Name"
            fullWidth
            required
            value={org.name}
            onChange={(
              e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => setOrg({ ...org, name: e.target.value })}
          />
        </Grid>

        {/* Address */}
        <Grid item xs={12}>
          <TextField
            label="Address"
            fullWidth
            required
            multiline
            value={org.address}
            onChange={(
              e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => setOrg({ ...org, address: e.target.value })}
          />
        </Grid>

        {/* HR First Name */}
        <Grid item xs={6}>
          <TextField
            label="HR First Name"
            fullWidth
            required
            value={org.hr.first_name}
            onChange={(
              e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) =>
              setOrg({ ...org, hr: { ...org.hr, first_name: e.target.value } })
            }
          />
        </Grid>

        {/* HR Last Name */}
        <Grid item xs={6}>
          <TextField
            label="HR Last Name"
            fullWidth
            required
            value={org.hr.last_name}
            onChange={(
              e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) =>
              setOrg({ ...org, hr: { ...org.hr, last_name: e.target.value } })
            }
          />
        </Grid>

        {/* HR Contact */}
        <Grid item xs={6}>
          <TextField
            label="HR Contact Number"
            fullWidth
            required
            value={org.hr.contact_number}
            onChange={(
              e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) =>
              setOrg({
                ...org,
                hr: { ...org.hr, contact_number: e.target.value },
              })
            }
          />
        </Grid>

        {/* HR Email */}
        <Grid item xs={6}>
          <TextField
            label="HR Email"
            type="email"
            fullWidth
            required
            value={org.hr.email}
            onChange={(
              e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => setOrg({ ...org, hr: { ...org.hr, email: e.target.value } })}
          />
        </Grid>
      </Grid>

      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Submit
      </Button>
    </Box>
  );
}
