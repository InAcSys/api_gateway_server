export interface Subject {
  credits: number;
  lmsId: number;
  academicLevelId: number;
  teacherId: string;
  name: string;
  description: string;
  code: string;
  id: string;
  tenantId: string;
  imageUrl?: string;
}

export interface AcademicLevel {
  order: number;
  name: string;
  description: string;
  code: string;
  id?: number;
}

