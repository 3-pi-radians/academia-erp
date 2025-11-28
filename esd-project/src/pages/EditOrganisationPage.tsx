import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OrganisationFormContainer from "../components/containers/OrganisationFormContainer";
import { OrganisationAPI } from "../api/organisationApi";
import type { Organisation } from "../models/models";
import { MESSAGES } from "../constants";
import AppLayout from "../components/layout/AppLayout";
import { useToast } from "../components/common/ToastProvider";

export default function OrganisationEditPage() {
  const { id } = useParams();
  const [initial, setInitial] = useState<Organisation | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const load = async () => {
      if (!id) return;
      try {
        const res = await OrganisationAPI.getById(Number(id));
        setInitial(res);
      } catch (err) {
        console.error(err);
        toast({ variant: "error", message: MESSAGES.ERROR_GENERIC });
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading)
    return (
      <AppLayout title="Edit Organisation" centerContent>
        <div>{MESSAGES.LOADING}</div>
      </AppLayout>
    );

  return (
    <AppLayout title="Edit Organisation" centerContent>
      <OrganisationFormContainer initialData={initial} />
    </AppLayout>
  );
}
