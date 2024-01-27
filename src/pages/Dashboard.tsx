import { useAuth } from "@/authContext";
import StudentDashboard from "./StudentDashboard";
import SignerDashboard from "./SignerDashboard";
import OfficeAssistantDashboard from "./OfficeAssistantDashboard";
import { Roles } from "@/enums/Roles";
import { useEffect } from "react";
// import { mockApplications } from "@/test/mockApplications";
import { useLoaderData } from "react-router-dom";
import axios from "axios";

export async function applicationLoader() {
  // return mockApplications;

  const response = await axios.get(
    "https://api.dosas.online/api/deferment-applications",
    { withCredentials: true }
  );

  const { deferment_applications }: any = response;
  return deferment_applications;
}

function Dashboard() {
  const { user } = useAuth();
  let parsedUser;
  if (user != null || user != undefined) parsedUser = JSON.parse(user);
  const role = parsedUser?.role;
  const applications = useLoaderData();

  useEffect(() => {
    console.log(applications);
  }, [role, user]);

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
