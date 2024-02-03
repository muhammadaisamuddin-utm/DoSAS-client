import { useAuth } from "@/authContext";
import ManageApplicationByOfficeAssistant from "./ManageApplicationByOfficeAssistant";
import ManageApplicationBySigner from "./ManageApplicationBySigner";

function ManageApplicationDetails() {
  const { user } = useAuth();

  let parsedUser: any;
  if (user != null || user != undefined) parsedUser = JSON.parse(user);

  const role = parsedUser?.role;

  return (
    <>
      {role === "ACADEMIC_ASSISTANT" && <ManageApplicationByOfficeAssistant />}
      {(role === "PROGRAM_COORDINATOR" || role === "SUPERVISOR") && (
        <ManageApplicationBySigner />
      )}
    </>
  );
}

export default ManageApplicationDetails;
