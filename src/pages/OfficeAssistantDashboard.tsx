import Countdown from "@/components/Countdown";
import Header from "@/components/Header";
import { columns } from "@/components/applications/columns";
import { DataTable } from "@/components/applications/datatable";
import { User } from "@/types/User";

interface OfficeAssistantDashboardProps {
  user?: User | null;
  applications?: any;
}

function OfficeAssistantDashboard({
  user,
  applications,
}: Readonly<OfficeAssistantDashboardProps>) {
  return (
    <>
      <Header username={user?.name} role={user?.role} />
      <Countdown />
      <DataTable columns={columns} data={applications} />
    </>
  );
}

export default OfficeAssistantDashboard;