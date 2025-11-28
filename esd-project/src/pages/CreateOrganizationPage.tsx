import OrganisationFormContainer from "../components/containers/OrganisationFormContainer";
import AppLayout from "../components/layout/AppLayout";

export default function OrganisationCreatePage() {
  return (
    <AppLayout title="Create Organisation">
      <OrganisationFormContainer hideCancel />
    </AppLayout>
  );
}
