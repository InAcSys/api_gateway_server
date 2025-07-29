import axios from "axios";

const AUTHORIZATION_SERVICE_URL = "http://localhost:90/authorization/";

export async function getPermissions(roleId: number, tenantId: string) {
  const response = await axios.get(
    `${AUTHORIZATION_SERVICE_URL}Permission/role?roleId=${roleId}&tenantId=${tenantId}`
  );

  return response.data;
}

export async function instituteRegistration(tenantId: string) {
  const response = await axios.post(
    `${AUTHORIZATION_SERVICE_URL}Tenant/initialize/tenant/${tenantId}`
  );

  return response.status == 200;
}

export async function getRoles(tenantId: string) {
  const response = await axios.get(
    `${AUTHORIZATION_SERVICE_URL}Role?tenantId=${tenantId}`
  );

  return response.data;
}

export async function getRole(roleId: number, tenantId: string) {
  const response = await axios.get(
    `${AUTHORIZATION_SERVICE_URL}Role/id?tenantId=${tenantId}&roleId=${roleId}`
  );

  return response.data;
}
