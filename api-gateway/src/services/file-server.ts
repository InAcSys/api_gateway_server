import axios from "axios";

const FILE_SERVER_URL = "http://127.0.0.1:8002/";

export async function uploadFile(
  file: File,
  ownerId: string,
  tenantId: string
) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axios.post(
    `${FILE_SERVER_URL}api/files/upload?ownerId=${ownerId}&tenantId=${tenantId}`,
    formData
  );

  return response.data;
}
