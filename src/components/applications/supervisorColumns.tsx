"use client";

import { Application } from "@/types/Application";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function ActionComponent({ row }: Readonly<{ row: any }>) {
  const navigate = useNavigate();
  const status = row.original.status;

  return (
    <div className="flex space-x-2 justify-center">
      <Button
        variant="secondary"
        size="sm"
        onClick={() => {
          navigate(`/application/${row.id}`);
        }}
      >
        View details
      </Button>
      {status === "checked" ? (
        <Button
          variant="secondary"
          size="sm"
          onClick={() => {
            navigate(`/application/${row.id}/manage`);
          }}
        >
          Manage application
        </Button>
      ) : (
        <Button variant="secondary" size="sm" disabled>
          Manage application
        </Button>
      )}
    </div>
  );
}

export const columns: ColumnDef<Application>[] = [
  {
    accessorKey: "studentId",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Student ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const application = row.original;
      return <span className="block text-center">{application.userid}</span>;
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "studentFaculty",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Faculty
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const application = row.original;
      return (
        <span className="block text-center">{application.faculty_name}</span>
      );
    },
  },
  {
    accessorKey: "programCode",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Programme Code
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const application = row.original;
      return (
        <span className="block text-center">{application.program_code}</span>
      );
    },
  },
  {
    accessorKey: "programName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Programme Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const application = row.original;
      return (
        <span className="block text-center">{application.program_name}</span>
      );
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
      return <ActionComponent row={row} />;
    },
  },
];
