export interface User {
  name: string;
  email: string;
  userid: string;
  role: string;
  faculty_name: string;
  faculty_code: string;
  has_logged_in: boolean;
  program_name: string;
  program_code: string;
  max_semester: number;
  identity_no: string;
  nationality: string;
  current_semester: number;
  proposal_defence_status: boolean;
  nht_completion_status: boolean;
  deferment_streak: number;
  main_supervisor: string;
  co_supervisor: string[];
}