import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import OrganisationTable from "../presentation/OrganisationTable";
import { OrganisationAPI } from "../../api/organisationApi";
import type { Organisation } from "../../models/models";
import { ROUTES, MESSAGES } from "../../constants";

export default function OrganisationListContainer() {
  const [list, setList] = useState<Organisation[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const load = async () => {
    setLoading(true);
    try {
      const res = await OrganisationAPI.getAll();
      setList(res);
    } catch (err) {
      console.error(err);
      alert(MESSAGES.ERROR_GENERIC);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleEdit = (org: Organisation) => {
    navigate(`/organisations/edit/${org.id}`);
  };

  const handleDelete = async (org: Organisation) => {
    const confirm = window.confirm(MESSAGES.DELETE_CONFIRM);
    if (!confirm) return;

    try {
      await OrganisationAPI.remove(org.id!);
      alert(MESSAGES.DELETE_SUCCESS);
      load();
    } catch (err) {
      console.error(err);
      alert(MESSAGES.ERROR_GENERIC);
    }
  };

  const handleCreate = () => {
    navigate(ROUTES.ORG_CREATE);
  };

  if (loading) return <div>{MESSAGES.LOADING}</div>;

  return (
    <OrganisationTable
      organisations={list}
      onEdit={handleEdit}
      onDelete={handleDelete}
      onCreate={handleCreate}
    />
  );
}
