"use client";

import { Application } from "@/types/Application";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

// this is the action button right most side
function ActionComponent({ application, row }: Readonly<{ application: any; row: any }>) {
  const navigate = useNavigate();

  return (
    <div className="flex space-x-2 justify-center">
      {/* {application.applicationStatus.toString() === "REJECTED" ? ( */}
      {application.status === "rejected" ? (
        <Button
          variant="secondary"
          size="sm"
          onClick={() => {
            navigate(`/application/${row.id}/update`);
          }}
        >
          Update application
        </Button>
      ) : (
        <Button variant="secondary" size="sm" disabled>
          Update application
        </Button>
      )}

      <Button
        variant="secondary"
        size="sm"
        onClick={() => {
          navigate(`/application/${row.id}`);
        }}
      >
        View details
      </Button>
    </div>
  );
}

export const columns: ColumnDef<Application>[] = [
  {
    accessorKey: "indexNum",
    header: () => {
      return <div>No.</div>;
    },
    cell: ({ row }) => {
      const rowIndex = row.index + 1;
      return <span className="block text-center">{rowIndex}</span>;
    },
  },
  // {
  //   accessorKey: "dateSubmitted",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         Date Submitted
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     );
  //   },
  //   cell: ({ row }) => {
  //     const application = row.original;
  //     return (
  //       <span className="block text-center">{application.dateSubmitted}</span>
  //     );
  //   },
  // },
  {
    accessorKey: "semester_code",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Semester Code
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const application = row.original;
      return <span className="block text-center">{application.semester_code}</span>;
    },
  },
  {
    accessorKey: "semester_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Semester Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const application = row.original;
      return <span className="block text-center">{application.semester_name}</span>;
    },
  },
  {
    accessorKey: "applicationStatus",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const application = row.original;
      switch (application.status) {
        case "rejected":
        case "terminated":
          return (
            <span className="block text-center font-bold text-red-500 uppercase">
              {application.status}
            </span>
          );
        case "submitted":
        case "pending":
        case "pending_approval":
          return (
            <span className="block text-center font-bold text-blue-500 uppercase">
              {application.status}
            </span>
          );
        case "approved":
        case "endorsed1":
        case "endorsed2":
        case "checked":
          return (
            <span className="block text-center font-bold text-green-500 uppercase">
              {application.status}
            </span>
          );
        case "expired":
          return (
            <span className="block text-center font-bold text-gray-500 uppercase">
              {application.status}
            </span>
          );
        default:
          return (
            <span className="block text-center font-bold uppercase">
              {application.status}
            </span>
          );
      }
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const application = row.original;

      return <ActionComponent application={application} row={row} />;
    },
  },
];
