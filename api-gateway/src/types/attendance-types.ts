export interface AttendanceBySubject {
  userId: string;
  status:
    | "present"
    | "late"
    | "absent"
    | "excused"
    | "unexcused"
    | "left_early"
    | "remote"
    | "incomplete";
  comment: string;
}
