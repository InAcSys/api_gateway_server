import type { Role } from "./authentication-types";

export interface UserInfo {
  firstNames?: string;
  lastNames?: string;
  shortName?: string;
  ci?: string;
  ciType?: string;
  imageUrl?: string;
  address?: string;
  phoneNumber?: string;
  email?: string;
  gender?: string;
  birthDate?: Date;
  roleId?: number;
}

export interface SessionData {
  user: UserInfo;
  role: Role;
}
