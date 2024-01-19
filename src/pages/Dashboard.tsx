import { useAuth } from "@/authContext";
import StudentDashboard from "./StudentDashboard";
import SignerDashboard from "./SignerDashboard";
import OfficeAssistantDashboard from "./OfficeAssistantDashboard";

function Dashboard() {
  const { user } = useAuth();
  const role = user?.role;

  return (
    <>
      {role === "STUDENT" && <StudentDashboard />}
      {role === "OFFICE_ASSISTANT" && <OfficeAssistantDashboard />}
      {role === "SUPERVISOR" ||
        (role === "PROGRAM_COORDINATOR" && <SignerDashboard />)}
    </>
  );
}

export default Dashboard;
