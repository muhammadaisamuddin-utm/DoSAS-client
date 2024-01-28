import { useAuth } from "@/authContext";
import ViewApplicationByStudent from "./ViewApplicationByStudent";
import ViewApplicationByOfficeAssistant from "./ViewApplicationByOfficeAssistant";
import ViewApplicationBySigner from "./ViewApplicationBySigner";
import ManageApplicationByOfficeAssistant from "./ManageApplicationByOfficeAssistant";
import ManageApplicationBySigner from "./ManageApplicationBySigner";

function ManageApplicationDetails() {
  const { user } = useAuth();

  let parsedUser: any;
  if (user != null || user != undefined) parsedUser = JSON.parse(user);

  const role = parsedUser?.role;

  return (
    <>
      {/* {role === "STUDENT" && <ViewApplicationByStudent />} */}
      {role === "ACADEMIC_ASSISTANT" && <ManageApplicationByOfficeAssistant />}
      {role === "SUPERVISOR" ||
        (role === "PROGRAM_COORDINATOR" && <ManageApplicationBySigner />)}
    </>
  );
}

export default ManageApplicationDetails;
