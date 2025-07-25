export interface LogIn {
  email: string;
  password: string;
  ip: string;
  userAgent: string;
  device: string;
  browser: string;
  os: string;
}

export type Role = {
  name: string;
  id: number;
  isActive: boolean;
  created: string;
  updated: string | null;
  deleted: string | null;
  tenantId: string;
};
