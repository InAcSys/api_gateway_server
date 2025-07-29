import axios from "axios";
import FormData from "form-data";
import { Buffer } from "buffer";

const FILE_SERVER_URL = "http://localhost:8002/";

export async function uploadFile(
  file: File,
  ownerId: string,
  tenantId: string
) {
  const formData = new FormData();

  const buffer = Buffer.from(await file.arrayBuffer());

  formData.append("file", buffer, {
    filename: file.name || "upload.dat",
    contentType: file.type || "application/octet-stream",
  });

  const response = await axios.post(
    `${FILE_SERVER_URL}api/files/upload?tenantId=${tenantId}&ownerId=${ownerId}`,
    formData,
    {
      headers: formData.getHeaders(),
    }
  );

  return response.data;
}

export async function getFile(fileId: string, tenantId: string) {
  const response = await axios.get(
    `${FILE_SERVER_URL}api/files/${fileId}?tenantId=${tenantId}`
  );

  return response.data;
}

export async function downloadFile(fileId: string, tenantId: string) {
  const response = await axios.get(
    `${FILE_SERVER_URL}api/files/download/${fileId}?tenantId=${tenantId}`
  );

  return response.data;
}
