import Elysia from "elysia";
import { validateToken } from "../utils/auth";
import type { JWTPayload } from "../types/types";
import { getPermissions, getRoles } from "../services/authorization";
import type { Role } from "../types/authentication-types";

export const AuthorizationRoute = new Elysia()
  .get("/auth/permissions", async ({ headers }) => {
    const token = headers["authorization"];
    if (!token) throw new Error("Authorization header missing or invalid");

    let decode: JWTPayload;
    try {
      decode = await validateToken(token);
    } catch (error) {
      throw new Error(`Token validation failed ${error}`);
    }

    const permissions = await getPermissions(decode.roleId, decode.tenantId);

    return permissions;
  })
  .get("/auth/roles", async ({ headers }) => {
    const token = headers["authorization"];
    if (!token) throw new Error("Authorization header missing or invalid");

    let decode: JWTPayload;
    try {
      decode = await validateToken(token);
    } catch (error) {
      throw new Error(`Token validation failed ${error}`);
    }

    const data = (await getRoles(decode.tenantId)) as Array<Role>;
    const roles = new Map(data.map((role) => [role.id, role.name]));
    return Object.fromEntries(roles);
  });
