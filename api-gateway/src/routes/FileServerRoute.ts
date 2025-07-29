import Elysia from "elysia";
import { getJWTToHeader } from "../utils/auth";
import { downloadFile, getFile, uploadFile } from "../services/file-server";

interface PostBody {
  file: File;
}

export const FileServerRoute = new Elysia()
  .post("/files/upload", async ({ headers, body }) => {
    const token = await getJWTToHeader(headers);
    const data = body as PostBody;

    const response = await uploadFile(data.file, token.userId, token.tenantId);

    return response;
  })
  .get("/files/view/:id", async ({ headers, params }) => {
    const token = await getJWTToHeader(headers);
    const fileId = params.id;

    const response = await getFile(fileId, token.tenantId);

    return response;
  })
  .get("/files/download/:fileId", async ({ headers, params }) => {
    const token = await getJWTToHeader(headers);
    const fileId = params.fileId;

    const response = await downloadFile(fileId, token.tenantId);

    return response;
  });
