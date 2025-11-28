import { useForm, Controller } from "react-hook-form";
import { useEffect } from "react";
import {
  Grid,
  TextField,
  Button,
  Box,
  Paper,
  Typography,
  Divider,
  Stack,
} from "@mui/material";
import { LABELS } from "../../constants";
import type { Organisation } from "../../models/models";

interface Props {
  initialData?: Organisation;
  onSubmit: (data: Organisation) => void;
  onCancel?: () => void;
  hideHeader?: boolean;
  hideCancel?: boolean;
  hideTitle?: boolean;
  subtitle?: string;
}

export default function OrganisationForm({ initialData, onSubmit, onCancel, hideHeader, hideCancel, hideTitle, subtitle }: Props) {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<Organisation>({
    mode: "onChange",
    defaultValues: initialData || {
      id: undefined,
      name: "",
      address: "",
      hr: {
        first_name: "",
        last_name: "",
        contact_number: "",
        email: "",
      },
    },
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  return (
    <Paper elevation={0} sx={{ p: { xs: 2, md: 3 }, borderRadius: 2, border: "1px solid", borderColor: "divider", width: "100%", maxWidth: 720, mx: "auto" }}>
      <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
        {(() => {
          const shouldHideTitle = hideTitle || hideHeader;
          const showDefaultSubtitle = !hideHeader && !subtitle;
          const hasSubtitle = !!subtitle || showDefaultSubtitle;
          if (shouldHideTitle && !hasSubtitle) return null;
          return (
            <Stack spacing={1} sx={{ mb: 2 }}>
              {!shouldHideTitle && (
                <Typography variant="h5">
                  {initialData?.id ? "Edit Organisation" : "Create Organisation"}
                </Typography>
              )}
              {hasSubtitle && (
                <Typography variant="body2" color="text.secondary">
                  {subtitle || (initialData?.id
                    ? "Update organisation details and HR contact information"
                    : "Provide organisation details and HR contact information")}
                </Typography>
              )}
            </Stack>
          );
        })()}

        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2}>
        {/* Organisation Name */}
        <Grid item xs={12}>
          <Controller
            name="name"
            control={control}
            rules={{
              required: "Organisation name is required",
              maxLength: { value: 50, message: "Max 50 characters" },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label={LABELS.ORGANISATION_NAME}
                fullWidth
                required
                error={!!errors.name}
                helperText={errors.name?.message as string}
                inputProps={{ maxLength: 50 }}
              />
            )}
          />
        </Grid>

        {/* Organisation Address */}
        <Grid item xs={12}>
          <Controller
            name="address"
            control={control}
            rules={{
              required: "Address is required",
              maxLength: { value: 100, message: "Max 100 characters" },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label={LABELS.ORGANISATION_ADDRESS}
                fullWidth
                required
                multiline
                error={!!errors.address}
                helperText={errors.address?.message as string}
                inputProps={{ maxLength: 100 }}
              />
            )}
          />
        </Grid>

        {/* HR First Name */}
        <Grid item xs={6}>
          <Controller
            name="hr.first_name"
            control={control}
            rules={{
              required: "First name is required",
              maxLength: { value: 25, message: "Max 25 characters" },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label={LABELS.HR_FIRST_NAME}
                fullWidth
                required
                error={!!errors.hr?.first_name}
                helperText={errors.hr?.first_name?.message as string}
                inputProps={{ maxLength: 25 }}
              />
            )}
          />
        </Grid>

        {/* HR Last Name */}
        <Grid item xs={6}>
          <Controller
            name="hr.last_name"
            control={control}
            rules={{
              required: "Last name is required",
              maxLength: { value: 25, message: "Max 25 characters" },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label={LABELS.HR_LAST_NAME}
                fullWidth
                required
                error={!!errors.hr?.last_name}
                helperText={errors.hr?.last_name?.message as string}
                inputProps={{ maxLength: 25 }}
              />
            )}
          />
        </Grid>

        {/* HR Contact Number */}
        <Grid item xs={6}>
          <Controller
            name="hr.contact_number"
            control={control}
            rules={{
              required: "Contact number is required",
              pattern: {
                value: /^\d{10}$/,
                message: "Contact number must be exactly 10 digits",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label={LABELS.HR_CONTACT}
                fullWidth
                required
                error={!!errors.hr?.contact_number}
                helperText={errors.hr?.contact_number?.message as string}
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*", maxLength: 10 }}
              />
            )}
          />
        </Grid>

        {/* HR Email */}
        <Grid item xs={6}>
          <Controller
            name="hr.email"
            control={control}
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid email address",
              },
              maxLength: { value: 50, message: "Max 50 characters" },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label={LABELS.HR_EMAIL}
                fullWidth
                required
                type="email"
                error={!!errors.hr?.email}
                helperText={errors.hr?.email?.message as string}
                inputProps={{ maxLength: 50 }}
              />
            )}
          />
        </Grid>
        </Grid>

        <Stack direction="row" spacing={1.5} justifyContent="flex-end" sx={{ mt: 2 }}>
          {!hideCancel && (
            <Button
              type="button"
              variant="outlined"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (onCancel) onCancel();
              }}
            >
              Cancel
            </Button>
          )}
          <Button type="submit" variant="contained" disabled={!isValid}>
            {LABELS.BTN_SAVE}
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
}
