import axios from "axios";
import type { CreateInstitute } from "../types/academic-types";

const ACADEMIC_SERVICE_URL = "http://manage-server:90/academic/";

// INSTITUTE ENDPOINTS

export async function createInstitution(institute: CreateInstitute) {
  const response = await axios.post(
    `${ACADEMIC_SERVICE_URL}Institute`,
    institute,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const { id } = response.data;
  return id;
}

export async function assignToPrincipal(userId: string, tenantId: string) {
  const response = await axios.post(
    `${ACADEMIC_SERVICE_URL}/Institute/assign-principal/id/${tenantId}`,
    {
      principal: userId,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
}

export async function verifyDomain(subDomain: string) {
  const response = await axios.post(
    `${ACADEMIC_SERVICE_URL}Institute/verify-subdomain?subDomain=${subDomain}`
  );

  return response.data;
}

// DEPARTMENTS ENDPOINTS

export async function getDepartments(countryId: number) {
  const response = await axios.get(
    `${ACADEMIC_SERVICE_URL}Department/parent-id/${countryId}`
  );
  return response.data;
}

// CITITES ENDPOINTS

export async function getCities(departmentId: number) {
  const response = await axios.get(
    `${ACADEMIC_SERVICE_URL}City/parent-id/${departmentId}`
  );
  return response.data;
}
