import axios from "axios";
import type { AttendanceBySubject } from "../types/attendance-types";

const ATTENDANCE_SERVICE_URL = "http://localhost:90/attendance";

export const registerBySubject = async (
  subjectId: string,
  tenantId: string,
  attendances: Array<AttendanceBySubject>
) => {
  const response = await axios.post(
    `${ATTENDANCE_SERVICE_URL}api/attendance/subject/${subjectId}`,
    {
      attendances,
      tenantId,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};

export const getRegisterByStudentId = async (
  studentId: string,
  subjectId: string,
  tenantId: string
) => {
  const response = await axios.get(
    `${ATTENDANCE_SERVICE_URL}api/attendance/student/${studentId}?tenantId=${tenantId}&subjectId=${subjectId}`
  );

  return response.data;
};
