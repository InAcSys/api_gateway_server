export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  subjectId: string;
  tenantId: string;
}

export interface Announcement {
  title: string;
  description: string;
  tenantId: string;
  authorId: string;
  subjectId: string;
  isActive: boolean;
  created: Date;
  updated: Date;
  deleted: Date;
}

export interface AnnouncementRequest {
  title: string;
  description: string;
}
