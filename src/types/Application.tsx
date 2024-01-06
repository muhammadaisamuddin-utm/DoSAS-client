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