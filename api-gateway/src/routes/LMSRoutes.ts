import Elysia from "elysia";
import { getJWTToHeader } from "../utils/auth";
import {
  createAnnouncement,
  createTask,
  enrollStudents,
  getAnnouncements,
  getStatusTask,
  getStudents,
  getSubmittedTaskByStudentId,
  getTask,
  getTaskByCourse,
  submitTask,
  unenrollStudents,
} from "../services/lms";
import type { AnnouncementRequest, Task } from "../types/lms-types";

export const LMSRoute = new Elysia()
  .get("/tasks/course/:id", async ({ headers, params }) => {
    const token = await getJWTToHeader(headers);
    const courseId = params.id;

    const response = await getTaskByCourse(courseId, token.tenantId);
    return response;
  })
  .get("/task/:id", async ({ headers, query, params }) => {
    const token = await getJWTToHeader(headers);
    const taskId = params.id;
    const subjectId = query.subjectId?.toString();

    if (!subjectId) {
      throw new Error("Subject id is required");
    }

    const response = await getTask(taskId, subjectId, token.tenantId);
    return response;
  })
  .post("/task", async ({ headers, query, body }) => {
    const token = await getJWTToHeader(headers);
    const subjectId = query.subjectId?.toString();
    const task = body as Task;
    task.tenantId = token.tenantId;

    if (!subjectId) {
      throw new Error("Subject id is required");
    }

    const response = await createTask(task, subjectId, token.tenantId);
    const taskId = response.id?.toString();
    if (!taskId) throw new Error("Task creation failed");
    return taskId;
  })
  .get("/announcements", async ({ headers, query }) => {
    const token = await getJWTToHeader(headers);
    const subjectId = query.subjectId?.toString();

    if (!subjectId) {
      throw new Error("Subject id are required");
    }

    const response = await getAnnouncements(subjectId, token.tenantId);
    return response;
  })
  .post("/announcement", async ({ headers, query, body }) => {
    const token = await getJWTToHeader(headers);
    const announcement = body as AnnouncementRequest;
    const subjectId = query.subjectId?.toString();

    if (!subjectId) {
      throw new Error("Subject id are required");
    }

    const response = await createAnnouncement(
      announcement,
      token.userId,
      token.tenantId,
      subjectId
    );
    const announcementId = response.id?.toString();
    if (!announcementId) throw new Error("Announcement creation failed");
    return announcementId;
  })
  .get("/subject/students", async ({ headers, query }) => {
    const token = await getJWTToHeader(headers);
    const subjectId = query.subjectId?.toString();

    if (!subjectId) {
      throw new Error("Subject id are required");
    }

    const response = await getStudents(token.tenantId, subjectId);
    return response;
  })
  .post("/subject/enroll", async ({ headers, query, body }) => {
    const token = await getJWTToHeader(headers);
    const subjectId = query.subjectId?.toString();
    const studentIds = body as string[];

    if (!subjectId) {
      throw new Error("Subject id are required");
    }

    const response = await enrollStudents(
      subjectId,
      studentIds,
      token.tenantId
    );
    return response;
  })
  .post("/subject/unenroll", async ({ headers, query, body }) => {
    const token = await getJWTToHeader(headers);
    const subjectId = query.subjectId?.toString();
    const studentIds = body as string[];

    if (!subjectId) {
      throw new Error("Subject id are required");
    }

    const response = await unenrollStudents(
      subjectId,
      studentIds,
      token.tenantId
    );

    return response;
  })
  .post("/task/:id/submit", async ({ headers, params, body }) => {
    const token = await getJWTToHeader(headers);
    const taskId = params.id;
    const contents = body as Array<string>;

    const response = await submitTask(
      contents,
      taskId,
      token.userId,
      token.tenantId
    );

    return response;
  })
  .get("/task/status/:id", async ({ headers, params }) => {
    const token = await getJWTToHeader(headers);
    const taskId = params.id;

    const response = await getStatusTask(token.tenantId, token.userId, taskId);

    return response;
  })
  .get("/task/submitted/:taskId", async ({ headers, params, query }) => {
    const token = await getJWTToHeader(headers);

    const studentId =
      token.roleId === 1 ? token.userId : query.studentId?.toString();
    const taskId = params.taskId;

    if (!studentId) throw new Error("Student id is required");

    const response = await getSubmittedTaskByStudentId(
      token.tenantId,
      studentId,
      taskId
    );

    return response;
  });
