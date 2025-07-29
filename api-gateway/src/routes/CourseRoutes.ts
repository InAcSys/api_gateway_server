import Elysia from "elysia";
import { getJWTToHeader } from "../utils/auth";
import {
  createLevel,
  createSubject,
  getLevels,
  getSubject,
  getSubjects,
  getSubjectsByTeacher,
} from "../services/courses";
import type { AcademicLevel, Subject } from "../types/course-types";
import { getMySubjects } from "../services/lms";

export const CourseRoute = new Elysia()
  .get("/subjects", async ({ query, headers }) => {
    const token = await getJWTToHeader(headers);

    const pageNumber = parseInt(query.pageNumber?.toString() ?? "1");
    const pageSize = parseInt(query.pageSize?.toString() ?? "10");

    if (isNaN(pageNumber)) throw new Error("pageNumber must be a number");
    if (isNaN(pageSize)) throw new Error("pageSize must be a number");

    let subjects = {};

    if (token.roleId === 3 || token.roleId === 4) {
      subjects = await getSubjects(pageNumber, pageSize, token.tenantId);
    }

    if (token.roleId === 2) {
      subjects = await getSubjectsByTeacher(
        pageNumber,
        pageSize,
        token.tenantId,
        token.userId
      );
    }

    if (token.roleId === 1) {
      const result = await getMySubjects(token.tenantId, token.userId);
      const subjectIds = result.data;
      const items = await Promise.all(
        subjectIds.map(async (subjectId: string) => {
          return await getSubject(subjectId, token.tenantId);
        })
      );

      subjects = {
        data: {
          items: items,
        },
      };
    }

    return subjects;
  })
  .get("/subject/:id", async ({ headers, params }) => {
    const token = await getJWTToHeader(headers);
    const id = params.id;

    const response = await getSubject(id, token.tenantId);
    return response;
  })
  .post("/subject", async ({ headers, body }) => {
    const token = await getJWTToHeader(headers);
    const subject = body as Subject;

    const response = await createSubject(token.tenantId, subject);
    const subjectId = response.id?.toString();
    if (!subjectId) throw new Error("Subject creation failed");
    return subjectId;
  })
  .get("/academic-levels", async ({ headers, query }) => {
    const token = await getJWTToHeader(headers);

    const pageNumber = parseInt(query.pageNumber?.toString() ?? "1");
    const pageSize = parseInt(query.pageSize?.toString() ?? "10");

    if (isNaN(pageNumber)) throw new Error("pageNumber must be a number");
    if (isNaN(pageSize)) throw new Error("pageSize must be a number");

    const levels = await getLevels(pageNumber, pageSize, token.tenantId);

    return levels;
  })
  .post("/academic-level", async ({ headers, body }) => {
    const token = await getJWTToHeader(headers);
    const level = body as AcademicLevel;

    const response = await createLevel(level, token.tenantId);
    return response;
  });
