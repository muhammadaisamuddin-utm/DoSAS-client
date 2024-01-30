import { useAuth } from "@/authContext";
import ManageApplicationByOfficeAssistant from "./ManageApplicationByOfficeAssistant";
import ManageApplicationBySupervisor from "./ManageApplicationBySupervisor";
import ManageApplicationByProgramCoordinator from "./ManageApplicationByProgramCoordinator";

function ManageApplicationDetails() {
  const { user } = useAuth();

  let parsedUser: any;
  if (user != null || user != undefined) parsedUser = JSON.parse(user);

  const role = parsedUser?.role;

  return (
    <>
      {role === "ACADEMIC_ASSISTANT" && <ManageApplicationByOfficeAssistant />}
      {role === "SUPERVISOR" && <ManageApplicationBySupervisor />}
      {role === "PROGRAM_COORDINATOR" && <ManageApplicationByProgramCoordinator />}
    </>
  );
}

export default ManageApplicationDetails;
