import { useAuth } from "@/authContext";
import ViewApplicationByStudent from "./ViewApplicationByStudent";
import ViewApplicationByOfficeAssistant from "./ViewApplicationByOfficeAssistant";
import ViewApplicationBySigner from "./ViewApplicationBySigner";

function ViewApplicationDetails() {
  const { user } = useAuth();
  const role = user?.role;

  return (
    <>
      {role === "STUDENT" && <ViewApplicationByStudent />}
      {role === "OFFICE_ASSISTANT" && <ViewApplicationByOfficeAssistant />}
      {role === "SUPERVISOR" ||
        (role === "PROGRAM_COORDINATOR" && <ViewApplicationBySigner />)}
    </>
  );
}

export default ViewApplicationDetails;
