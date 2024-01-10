import Countdown from "@/components/Countdown";
import Header from "@/components/Header";
import { columns } from "@/components/applications/columns";
import { DataTable } from "@/components/applications/datatable";
import { mockApplications } from "@/test/mockApplications";

function Dashboard() {
  return (
    <>
      <Header username="Ali bin Abu" />
      <Countdown />
      <DataTable columns={columns} data={mockApplications} />
    </>
  );
}

export default Dashboard;
