import axios from "axios";
import type { AnnouncementRequest, Task } from "../types/lms-types";

const LMS_SERVICE_URL = "http://localhost:90/lms/";

export async function getTaskByCourse(subjectId: string, tenantId: string) {
  const response = await axios.get(
    `${LMS_SERVICE_URL}tasks?tenantId=${tenantId}&subjectId=${subjectId}`
  );
  return response.data.data;
}

export async function createTask(
  task: Task,
  subjectId: string,
  tenantId: string
) {
  const response = await axios.post(
    `${LMS_SERVICE_URL}tasks?tenantId=${tenantId}&subjectId=${subjectId}`,
    task,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data.data;
}

export async function getTask(id: string, subjectId: string, tenantId: string) {
  const response = await axios.get(
    `${LMS_SERVICE_URL}tasks/${id}?tenantId=${tenantId}&subjectId=${subjectId}`
  );

  return response.data.data;
}

export async function getAnnouncements(subjectId: string, tenantId: string) {
  const response = await axios.get(
    `${LMS_SERVICE_URL}announcement?subjectId=${subjectId}&tenantId=${tenantId}`
  );

  return response.data.data;
}

export async function createAnnouncement(
  announcement: AnnouncementRequest,
  authorId: string,
  tenantId: string,
  subjectId: string
) {
  const response = await axios.post(
    `${LMS_SERVICE_URL}announcement/${authorId}?tenantId=${tenantId}&subjectId=${subjectId}`,
    announcement,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data.data;
}

export async function getStudents(tenantId: string, subjectId: string) {
  const response = await axios.get(
    `${LMS_SERVICE_URL}subject-students/students?tenantId=${tenantId}&subjectId=${subjectId}`
  );

  return response.data;
}

export async function enrollStudents(
  subjectId: string,
  studentIds: string[],
  tenantId: string
) {
  const requestBody = {
    studentIds: studentIds,
  };
  const response = await axios.post(
    `${LMS_SERVICE_URL}subject-students/enroll?tenantId=${tenantId}&subjectId=${subjectId}`,
    JSON.stringify(requestBody),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
}

export async function unenrollStudents(
  subjectId: string,
  studentIds: string[],
  tenantId: string
) {
  const requestBody = {
    studentIds: studentIds,
  };
  const response = await axios.delete(
    `${LMS_SERVICE_URL}subject-students/unenroll?tenantId=${tenantId}&subjectId=${subjectId}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(requestBody),
    }
  );

  return response.data;
}

export async function submitTask(
  contents: Array<string>,
  taskId: string,
  studentId: string,
  tenantId: string
) {
  const response = await axios.post(
    `${LMS_SERVICE_URL}tasks/submitted/${taskId}?tenantId=${tenantId}&studentId=${studentId}`,
    {
      contents,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
}

export async function getMySubjects(tenantId: string, studentId: string) {
  const response = await axios.get(
    `${LMS_SERVICE_URL}subject-students/my-subjects?tenantId=${tenantId}&studentId=${studentId}`
  );

  return response.data;
}

export async function getStatusTask(
  tenantId: string,
  studentId: string,
  taskId: string
) {
  const response = await axios.get(
    `${LMS_SERVICE_URL}tasks/submitted/status/${taskId}?tenantId=${tenantId}&studentId=${studentId}`
  );

  return response.data;
}

export async function getSubmittedTaskByStudentId(
  tenantId: string,
  studentId: string,
  taskId: string
) {
  const response = await axios.get(
    `${LMS_SERVICE_URL}tasks/submitted/student/${studentId}?tenantId=${tenantId}&taskId=${taskId}`
  );

  return response.data;
}
