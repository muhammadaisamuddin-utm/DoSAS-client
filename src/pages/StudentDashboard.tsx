import Countdown from "@/components/Countdown";
import Header from "@/components/Header";
import { columns } from "@/components/applications/studentColumns";
import { DataTable } from "@/components/applications/datatable";
import { mockApplications } from "@/test/studentApplications";
import { Button } from "@/components/ui/button";

function StudentDashboard() {
  return (
    <>
      <Header username="Ali bin Abu" role="Student"/>
      <Countdown />
      <div className="mx-20 my-5 w-full font-bold text-2xl text-center">Student Application History</div>
      <Button className="ml-20 border-gray-300 border" variant="secondary">Create a new deferment application</Button>
      <DataTable columns={columns} data={mockApplications} />
    </>
  );
}

export default StudentDashboard;