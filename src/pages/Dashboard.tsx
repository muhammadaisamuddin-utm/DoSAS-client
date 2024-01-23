import { useAuth } from "@/authContext";
import StudentDashboard from "./StudentDashboard";
import SignerDashboard from "./SignerDashboard";
import OfficeAssistantDashboard from "./OfficeAssistantDashboard";
import { Roles } from "@/enums/Roles";

function Dashboard() {
  const { user } = useAuth();
  const role = user?.role;

  return (
    <>
      {role === Roles.STUDENT.toString() && <StudentDashboard user={user} />}
      {role === Roles.ACADEMIC_ASSISTANT.toString() && (
        <OfficeAssistantDashboard user={user} />
      )}
      {(role === Roles.SUPERVISOR.toString() ||
        role === Roles.PROGRAM_COORDINATOR.toString()) && (
        <SignerDashboard user={user} />
      )}
    </>
  );
}

export default Dashboard;
