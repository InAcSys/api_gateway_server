import Elysia from "elysia";
import {
  createInstitution,
  getCities,
  getDepartments,
  verifyDomain,
} from "../services/academics";
import type { CreateInstitute } from "../types/academic-types";
import { instituteRegistration } from "../services/authorization";

export const AcademicRoute = new Elysia()
  .post("/institute/create", async ({ body }) => {
    const institute = body as CreateInstitute;
    const instituteId = await createInstitution(institute);
    const result = await instituteRegistration(instituteId);

    if (!result) {
      throw new Error("Failed to initialize the institution");
    }
    return instituteId;
  })
  .get("/departments/:id", async ({ params }) => {
    const { id } = params;
    if (!id) throw new Error("country id missing or invalid");

    const countryId = parseInt(id);

    const deparments = await getDepartments(countryId);

    return deparments;
  })
  .get("/cities/:id", async ({ params }) => {
    const { id } = params;
    if (!id) throw new Error("department id missing or invalid");

    const departmentId = parseInt(id);

    const cities = await getCities(departmentId);

    return cities;
  })
  .post("/verify/sub-domain", async ({ query }) => {
    const subDomain = query.subDomain?.toString();
    if (!subDomain) throw new Error("Sub domain is missing or invalid");

    const result = await verifyDomain(subDomain);

    return result;
  });
