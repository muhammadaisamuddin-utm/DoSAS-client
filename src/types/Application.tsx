import { ApplicationStatus } from "@/enums/ApplicationStatus"

export type Application = {
    studentId: string
    fullName: string 
    email: string
    applicationStatus: ApplicationStatus
}