import Countdown from "@/components/Countdown";
import Header from "@/components/Header";
import { columns as supervisorColumns } from "@/components/applications/supervisorColumns";
import { columns as programCoordinatorColumns } from "@/components/applications/programCoordinatorColumns";
import { DataTable } from "@/components/applications/datatable";
import { User } from "@/types/User";

interface SignerDashboardProps {
  user?: User | null;
  applications?: any;
}

function SignerDashboard({
  user,
  applications,
}: Readonly<SignerDashboardProps>) {
  return (
    <>
      <Header username={user?.name} role={user?.role} />
      <Countdown />
      <DataTable
        columns={
          user?.role === "SUPERVISOR"
            ? supervisorColumns
            : programCoordinatorColumns
        }
        data={applications}
      />
    </>
  );
}

export default SignerDashboard;
