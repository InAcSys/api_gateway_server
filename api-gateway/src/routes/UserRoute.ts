import Elysia from "elysia";
import { getJWTToHeader } from "../utils/auth";
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  getUsersByRole,
  searchUsers,
  updateUserInfo,
} from "../services/users";
import type { CreateUserDTO } from "../dtos/CreateUserDTO";
import { assignToPrincipal } from "../services/academics";
import type { SessionData, UserInfo } from "../types/user-types";
import { getRole } from "../services/authorization";
import type { Role } from "../types/authentication-types";

export const UserRoute = new Elysia()
  .get("/users", async ({ query, headers }) => {
    const token = await getJWTToHeader(headers);

    const pageNumber = parseInt(query.pageNumber?.toString() ?? "1");
    const pageSize = parseInt(query.pageSize?.toString() ?? "10");

    if (isNaN(pageNumber)) throw new Error("pageNumber must be a number");
    if (isNaN(pageSize)) throw new Error("pageSize must be a number");

    const users = await getUsers(pageNumber, pageSize, token.tenantId);

    return users;
  })
  .get("/user/:id", async ({ headers, params }) => {
    const token = await getJWTToHeader(headers);
    const userId = params.id;
    if (!userId) throw new Error("User creation failed: missing user ID");
    const user = (await getUser(userId, token.tenantId)) as UserInfo;
    return user;
  })
  .post("/principal/registration", async ({ query, body }) => {
    const tenantId = query.tenantId?.toString();
    if (!tenantId) throw new Error("tenant id missing or invalid");
    const user = body as CreateUserDTO;
    const createdUser = await createUser(tenantId, user);

    const userId = createdUser.id?.toString();
    if (!userId) throw new Error("User creation failed: missing user ID");

    const result = await assignToPrincipal(userId, tenantId);
    return result;
  })
  .post("/create-user", async ({ headers, body }) => {
    const token = await getJWTToHeader(headers);

    const user = body as CreateUserDTO;
    const userCreated = await createUser(token.tenantId, user);

    const userId = userCreated.id?.toString();
    if (!userId) throw new Error("User creation failed");

    return userId;
  })
  .delete("/users/delete/:userId", async ({ headers, params }) => {
    const token = await getJWTToHeader(headers);

    const userId = params.userId;

    const result = deleteUser(userId, token.tenantId);

    return result;
  })
  .get("/search", async ({ headers, query }) => {
    const token = await getJWTToHeader(headers);

    const pageNumber = parseInt(query.pageNumber?.toString() ?? "1");
    const pageSize = parseInt(query.pageSize?.toString() ?? "10");
    const search = query.search?.toString() ?? "";

    if (isNaN(pageNumber)) throw new Error("pageNumber must be a number");
    if (isNaN(pageSize)) throw new Error("pageSize must be a number");

    const users = searchUsers(pageNumber, pageSize, token.tenantId, search);
    return users;
  })
  .put("/users/update/:userId", async ({ headers, params, body }) => {
    const token = await getJWTToHeader(headers);
    const userId = params.userId;
    const updateUser = body as UserInfo;

    const user = await updateUserInfo(userId, token.tenantId, updateUser);
    return user;
  })
  .get("/users/role/:roleId", async ({ headers, params }) => {
    const token = await getJWTToHeader(headers);
    const roleId = parseInt(params.roleId);

    const users = await getUsersByRole(roleId, token.tenantId);
    return users;
  })
  .get("/my-info", async ({ headers }) => {
    const token = await getJWTToHeader(headers);
    const userData = await getUser(token.userId, token.tenantId);
    const roleData = await getRole(token.roleId, token.tenantId);

    const user = userData.data as UserInfo;
    const role = roleData as Role;

    const sessionData: SessionData = {
      user,
      role,
    };

    return sessionData;
  });
