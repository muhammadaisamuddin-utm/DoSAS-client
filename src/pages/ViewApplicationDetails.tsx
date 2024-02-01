import { useAuth } from "@/authContext";
import ViewApplicationByStudent from "./ViewApplicationByStudent";
import ViewApplicationByOfficeAssistant from "./ViewApplicationByOfficeAssistant";
import ViewApplicationBySigner from "./ViewApplicationBySigner";

function ViewApplicationDetails() {
  const { user } = useAuth();

  let parsedUser: any;
  if (user != null || user != undefined) parsedUser = JSON.parse(user);

  const role = parsedUser?.role;

  return (
    <>
      {role === "STUDENT" && <ViewApplicationByStudent />}
      {role === "ACADEMIC_ASSISTANT" && <ViewApplicationByOfficeAssistant />}
      {(role === "SUPERVISOR" || role === "PROGRAM_COORDINATOR") && (
        <ViewApplicationBySigner />
      )}
    </>
  );
}

export default ViewApplicationDetails;
