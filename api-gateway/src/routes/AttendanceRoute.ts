import Elysia from "elysia";
import { getJWTToHeader } from "../utils/auth";
import type { AttendanceBySubject } from "../types/attendance-types";
import {
  getRegisterByStudentId,
  registerBySubject,
} from "../services/attendance";

export const AttendanceRoute = new Elysia({ prefix: "/attendance" })
  .post("/subject/:id", async ({ headers, params, body }) => {
    const token = await getJWTToHeader(headers);
    const subjectId = params.id;
    const attendances = body as Array<AttendanceBySubject>;

    const response = await registerBySubject(
      subjectId,
      token.tenantId,
      attendances
    );

    return response;
  })
  .get("/student/:studentId", async ({ headers, params, query }) => {
    const token = await getJWTToHeader(headers);
    const studentId = params.studentId;
    const subjectId = query.subjectId?.toString() ?? "";

    const response = await getRegisterByStudentId(
      studentId,
      subjectId,
      token.tenantId
    );

    return response;
  });
