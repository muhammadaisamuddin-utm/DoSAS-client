"use client";

import { Application } from "@/types/Application";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  {
    accessorKey: "dateSubmitted",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date Submitted
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const application = row.original;
      return (
        <span className="block text-center">{application.dateSubmitted}</span>
      );
    },
  },
  {
    accessorKey: "semester",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Semester
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const application = row.original;
      return <span className="block text-center">{application.semester}</span>;
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
      switch (application.applicationStatus.toString()) {
        case "REJECTED":
          return (
            <span className="block text-center font-bold text-red-500">
              {application.applicationStatus.toString()}
            </span>
          );

        case "PENDING":
          return (
            <span className="block text-center font-bold text-blue-500">
              {application.applicationStatus.toString()}
            </span>
          );

        case "APPROVED":
          return (
            <span className="block text-center font-bold text-green-500">
              {application.applicationStatus.toString()}
            </span>
          );
        default:
          return (
            <span className="block text-center font-bold ">
              {application.applicationStatus.toString()}
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

      return (
        <div className="flex space-x-2 justify-center">
          {application.applicationStatus.toString() === "REJECTED" ? (
            <Button variant="secondary" size="sm">
              Update application
            </Button>
          ) : (
            <Button variant="secondary" size="sm" disabled>
              Update application
            </Button>
          )}

          <Button variant="secondary" size="sm">
            View details
          </Button>
        </div>
      );
    },
  },
];
