import { ApplicationStatus } from "@/enums/ApplicationStatus"

export type Application = {
  id: number;
  name: string;
  userid: string;
  email: string;
  identity_no: string;
  nationality: string;
  semester_name: string;
  semester_code: string;
  semester_status: number;
  faculty_name: string;
  faculty_code: string;
  program_name: string;
  program_code: string;
  reason: string;
  others: string;
  rejection_reason: string;
  comment: string;
  pdf_file_path: string;
  status: ApplicationStatus;
};