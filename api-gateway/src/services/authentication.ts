import axios from "axios";
import type { LogIn } from "../types/authentication-types";

const AUTHENTICATION_SERVICE_URL = "http://localhost:90/authentication/";

export async function LogIn(logIn: LogIn) {
  const response = await axios.post(
    `${AUTHENTICATION_SERVICE_URL}log-in`,
    logIn,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
}
