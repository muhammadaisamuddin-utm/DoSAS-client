import { useAuth } from "@/authContext";
import StudentDashboard from "./StudentDashboard";
import SignerDashboard from "./SignerDashboard";
import OfficeAssistantDashboard from "./OfficeAssistantDashboard";
import { Roles } from "@/enums/Roles";
import { useLoaderData, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

export async function applicationLoader() {
  const response = await axios.get(
    "https://api.dosas.online/api/deferment-applications",
    // "http://localhost:8000/api/deferment-applications",
    { withCredentials: true }
  );

  console.log(response);
  const { deferment_applications }: any = response.data;
  console.log(deferment_applications);
  return deferment_applications;
}

function Dashboard() {
  const { user } = useAuth();

  const navigate = useNavigate();

  let parsedUser;
  if (user != null || user != undefined) parsedUser = JSON.parse(user);
  const role = parsedUser?.role;
  const hasLoggedIn = parsedUser?.has_logged_in;

  useEffect(() => {
    if (!hasLoggedIn) {
      navigate("/password-reset/first-time");
    }
  }, []);

  const applications = useLoaderData();

  return (
    <>
      {role === Roles.STUDENT.toString() && (
        <StudentDashboard user={parsedUser} applications={applications} />
      )}
      {role === Roles.ACADEMIC_ASSISTANT.toString() && (
        <OfficeAssistantDashboard
          user={parsedUser}
          applications={applications}
        />
      )}
      {(role === Roles.SUPERVISOR.toString() ||
        role === Roles.PROGRAM_COORDINATOR.toString()) && (
        <SignerDashboard user={parsedUser} applications={applications} />
      )}
    </>
  );
}

export default Dashboard;
