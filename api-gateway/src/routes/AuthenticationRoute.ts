import Elysia from "elysia";
import type { LogIn as Credential } from "../types/authentication-types";
import { LogIn } from "../services/authentication";

export const AuthenticationRoute = new Elysia().post(
  "/log-in",
  async ({ body }) => {
    const credentials = body as Credential;
    const result = await LogIn(credentials);
    if (!result) {
      throw new Error("Failed to log in");
    }
    return result;
  }
);
