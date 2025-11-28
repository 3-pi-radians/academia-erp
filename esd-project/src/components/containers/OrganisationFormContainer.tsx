import { useNavigate } from "react-router-dom";
import { OrganisationAPI } from "../../api/organisationApi";
import OrganisationForm from "../presentation/OrganisationForm";
import type { Organisation } from "../../models/models";
import { ROUTES, MESSAGES } from "../../constants";
import { useState } from "react";
import SuccessDialog from "../common/SuccessDialog";
import ErrorDialog from "../common/ErrorDialog";

interface Props {
  initialData?: Organisation;
  onCancel?: () => void;
  onSuccessClose?: () => void;
  hideHeader?: boolean;
  hideCancel?: boolean;
  subtitle?: string;
}

export default function OrganisationFormContainer({ initialData, onCancel, onSuccessClose, hideHeader, hideCancel, subtitle }: Props) {
  const navigate = useNavigate();
  const [successOpen, setSuccessOpen] = useState(false);
  const [successText, setSuccessText] = useState("Successfully saved");
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorText, setErrorText] = useState("We couldn't save your changes.");

  const handleSubmit = async (data: Organisation) => {
    try {
      const payload: any = {
        id: initialData?.id,
        name: data.name,
        address: data.address,
        hrContacts: [
          {
            id: (data as any).hr?.id,
            firstName: (data as any).hr?.first_name || "",
            lastName: (data as any).hr?.last_name || "",
            email: (data as any).hr?.email || "",
            contactNumber: (data as any).hr?.contact_number || "",
          },
        ],
      };

      if (initialData?.id) {
        await OrganisationAPI.update(initialData.id, payload);
        setSuccessText("Organisation updated successfully.");
      } else {
        await OrganisationAPI.create(payload);
        setSuccessText("Organisation created successfully.");
      }
      setSuccessOpen(true);
    } catch (err) {
      console.error(err);
      const message = err instanceof Error ? err.message : MESSAGES.ERROR_GENERIC;
      setErrorText(
        message || "Please check the details and try again."
      );
      setErrorOpen(true);
    }
  };

  return (
    <>
      <OrganisationForm initialData={initialData} onSubmit={handleSubmit} onCancel={onCancel} hideHeader={hideHeader} hideCancel={hideCancel} subtitle={subtitle} />
      <SuccessDialog
        open={successOpen}
        title="Success"
        description={successText}
        onClose={() => {
          setSuccessOpen(false);
          if (onSuccessClose) {
            onSuccessClose();
          } else {
            navigate(ROUTES.ORG_LIST);
          }
        }}
        actionLabel="Continue"
      />
      <ErrorDialog
        open={errorOpen}
        title="We couldn't save this"
        description={errorText}
        onClose={() => setErrorOpen(false)}
        actionLabel="Try again"
      />
    </>
  );
}
