import Countdown from "@/components/Countdown";
import Header from "@/components/Header";
import { columns } from "@/components/applications/columns";
import { DataTable } from "@/components/applications/datatable";
import { User } from "@/types/User";

interface SignerDashboardProps {
  user?: User | null;
  applications?: any
}

function SignerDashboard({ user, applications }: Readonly<SignerDashboardProps>) {
  return (
    <>
      <Header username={user?.name} role={user?.role} />
      <Countdown />
      <DataTable columns={columns} data={applications} />
    </>
  );
}

export default SignerDashboard;
