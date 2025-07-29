import axios from "axios";
import type { JWTPayload } from "../types/types";

const AUTHENTICATION_URL = "http://localhost:90/authentication/";

export async function validateToken(token: string): Promise<JWTPayload> {
  try {
    const response = await axios.post(
      `${AUTHENTICATION_URL}validate`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );

    if (!response.data) {
      throw new Error("Invalid token response");
    }

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        `Authentication service error: ${error.response?.status} - ${error.message}`
      );
    }
    throw new Error("Unknown error validating token");
  }
}

export async function getJWTToHeader(headers: { [x: string]: any }) {
  const token = headers["authorization"];
  if (!token) throw new Error("Authorization header missing or invalid");

  let decode: JWTPayload;
  try {
    decode = await validateToken(token);
  } catch (error) {
    throw new Error(`Token validation failed ${error}`);
  }
  return decode;
}
