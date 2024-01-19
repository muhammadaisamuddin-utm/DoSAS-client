import Countdown from "@/components/Countdown";
import Header from "@/components/Header";
import { columns } from "@/components/applications/columns";
import { DataTable } from "@/components/applications/datatable";
import { mockApplications } from "@/test/mockApplications";
import { User } from "@/types/User";

interface OfficeAssistantDashboardProps {
  user?: User;
}

function OfficeAssistantDashboard({
  user,
}: Readonly<OfficeAssistantDashboardProps>) {
  return (
    <>
      <Header username={user?.username} role={user?.role} />
      <Countdown />
      <DataTable columns={columns} data={mockApplications} />
    </>
  );
}

export default OfficeAssistantDashboard;
