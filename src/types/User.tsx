export interface User {
  name: string;
  userid: string;
  email: string;
  role: string;
  faculty_name: string;
  faculty_code: string;
  has_logged_in: false;
  program_name: string;
  program_code: string;
  identity_no: string;
  nationality: string;
  current_semester: number;
  proposal_defence_status: boolean;
  nht_completion_status: boolean;
  supervisor: string;
  logged_in: string;
}