import axios from "axios";
import type { AcademicLevel, Subject } from "../types/course-types";

const COURSE_SERVICE_URL = "http://manage-server:90/courses";

export async function getSubjects(
  pageNumber: number,
  pageSize: number,
  tenantId: string
) {
  const response = await axios.get(
    `${COURSE_SERVICE_URL}/Subject?pageNumber=${pageNumber}&pageSize=${pageSize}&tenantId=${tenantId}`
  );

  return response.data;
}

export async function getSubjectsByTeacher(
  pageNumber: number,
  pageSize: number,
  tenantId: string,
  teacherId: string
) {
  const response = await axios.get(
    `${COURSE_SERVICE_URL}/Subject/my-subjects/teacher/${teacherId}?tenantId=${tenantId}&pageNumber=${pageNumber}&pageSize=${pageSize}`
  );

  return response.data;
}

export async function getSubject(id: string, tenantId: string) {
  const response = await axios.get(
    `${COURSE_SERVICE_URL}/Subject/id/${id}?tenantId=${tenantId}`
  );

  return response.data.data;
}

export async function createSubject(tenantId: string, subject: Subject) {
  const response = await axios.post(
    `${COURSE_SERVICE_URL}/Subject?tenantId=${tenantId}`,
    subject,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data.data;
}

export async function getLevels(
  pageNumber: number,
  pageSize: number,
  tenantId: string
) {
  const response = await axios.get(
    `${COURSE_SERVICE_URL}/AcademicLevel?pageNumber=${pageNumber}&pageSize=${pageSize}&tenantId=${tenantId}`
  );

  return response.data;
}

export async function createLevel(level: AcademicLevel, tenantId: string) {
  const response = await axios.post(
    `${COURSE_SERVICE_URL}/AcademicLevel?tenantId=${tenantId}`,
    level,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
}
