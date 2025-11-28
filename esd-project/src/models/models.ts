export interface OrganisationHR {
  id?: number;
  first_name: string;
  last_name: string;
  contact_number: string;
  email: string;
}

export interface Organisation {
  id?: number;
  name: string;
  address: string;
  hr: OrganisationHR;
}

export interface User {
  id?: number;
  username: string;
  email?: string;
}
