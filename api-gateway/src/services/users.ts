import axios from "axios";
import type { CreateUserDTO } from "../dtos/CreateUserDTO";
import type { UserInfo } from "../types/user-types";

const USER_SERVICE_URL = "http://manage-server:90/users/";

export async function getUsers(
  pageNumber: number,
  pageSize: number,
  tenantId: string
) {
  const response = await axios.get(
    `${USER_SERVICE_URL}?pageNumber=${pageNumber}&pageSize=${pageSize}&tenantId=${tenantId}`
  );
  return response.data;
}

export async function getUser(userId: string, tenantId: string) {
  const response = await axios.get(
    `${USER_SERVICE_URL}id/${userId}?tenantId=${tenantId}`
  );
  return response.data;
}

export async function createUser(tenantId: string, user: CreateUserDTO) {
  const response = await axios.post(
    `http://manage-server:90/users?tenantId=${tenantId}`,
    user,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data.data;
}

export async function deleteUser(userId: string, tenantId: string) {
  const response = await axios.delete(
    `${USER_SERVICE_URL}${userId}?tenantId=${tenantId}`
  );

  return response.status == 200;
}

export async function updateUserInfo(
  id: string,
  tenantId: string,
  user: UserInfo
) {
  const response = await axios.put(
    `${USER_SERVICE_URL}${id}?tenantId=${tenantId}`,
    user,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const updated = response.data as UserInfo;
  return updated;
}

export async function searchUsers(
  pageNumber: number,
  pageSize: number,
  tenantId: string,
  search: string
) {
  const response = await axios.get(
    `${USER_SERVICE_URL}search?pageNumber=${pageNumber}&pageSize=${pageSize}&tenantId=${tenantId}&search=${search}`
  );

  return response.data;
}

export async function getUsersByRole(roleId: number, tenantId: string) {
  const response = await axios.get(
    `${USER_SERVICE_URL}role/${roleId}?tenantId=${tenantId}`
  );

  return response.data.data.users;
}
