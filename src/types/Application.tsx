import { ApplicationStatus } from "@/enums/ApplicationStatus"

export type Application = {
    studentId: string
    fullName: string 
    email: string
    applicationStatus: ApplicationStatus
    studentFaculty: string
    programCode: string
    programName: string
    dateSubmitted?: string
    semester?: string
}



// export type Application = {
//   id: number;
//   name: string;
//   userid: string;
//   email: string;
//   identity_no: string;
//   nationality: string;
//   semester_name: string;
//   semester_code: string;
//   semester_status: number;
//   faculty_name: string;
//   faculty_code: string;
//   program_name: string;
//   program_code: string;
//   reason: string;
//   others: string;
//   rejection_reason: string;
//   comment: string;
//   pdf_file_path: string;
//   status: string;
// };