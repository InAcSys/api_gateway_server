import Elysia from "elysia";
import { getJWTToHeader } from "../utils/auth";
import { uploadFile } from "../services/file-server";

interface PostBody {
  file: File
}

export const FileServerRoute = new Elysia().post(
  "/files/upload",
  async ({ headers, body }) => {
    const token = await getJWTToHeader(headers);
    const data = body as PostBody;

    const response = await uploadFile(data.file, token.userId, token.tenantId);

    return response;
  }
);
