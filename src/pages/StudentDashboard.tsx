import Countdown from "@/components/Countdown";
import Header from "@/components/Header";
import { columns } from "@/components/applications/studentColumns";
import { DataTable } from "@/components/applications/datatable";
import { Button } from "@/components/ui/button";
import { User } from "@/types/User";
import { useNavigate } from "react-router-dom";

interface StudentDashboardProps {
  user?: User | null;
  applications?: any;
}

function StudentDashboard({
  user,
  applications,
}: Readonly<StudentDashboardProps>) {
  const navigate = useNavigate();

  return (
    <>
      <Header username={user?.name} role={user?.role} />
      <Countdown />
      <div className="mx-20 my-5 w-full font-bold text-2xl text-center">
        Student Application History
      </div>
      <Button
        className="ml-20 border-gray-300 border"
        variant="secondary"
        onClick={() => navigate("/application/submit")}
      >
        Create a new deferment application
      </Button>
      <DataTable columns={columns} data={applications} />
    </>
  );
}

export default StudentDashboard;
