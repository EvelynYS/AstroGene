"use client";
import Image from "next/image";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { MoreHorizontal } from "lucide-react";
import { StatusBadge } from "../StatusBadge";
import { Appointment } from "@/types/appwrite.types";
import { formatDateTime } from "@/lib/utils";
import { Consultants } from "@/constants";
import AppointmentModal from "../AppointmentModal";

export const columns: ColumnDef<Appointment>[] = [
  {
    header: "#",
    cell: ({ row }) => <p className="text-14-medium">{row.index + 1}</p>,
  },
  {
    accessorKey: "client",
    header: "Client",
    cell: ({ row }) => {
      return <p className="text-14-medium ">{row.original.client.name}</p>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return (
        <div className="min-w-[115px]">
          <StatusBadge status={row.original.status} />
        </div>
      );
    },
  },
  {
    accessorKey: "schedule",
    header: "Appointment",
    cell: ({ row }) => {
      return (
        <p className="text-14-regular min-w-[100px]">
          {formatDateTime(row.original.schedule).dateTime}
        </p>
      );
    },
  },
  {
    accessorKey: "primaryConsultant",
    header: () => "Consultant",
    cell: ({ row }) => {
      const consultant = Consultants.find(
        (con) => con.name === row.original.primaryConsultant
      );

      return (
        <div className="flex items-center gap-3">
          <Image
            src={consultant?.image!}
            alt={consultant?.name!}
            width={100}
            height={100}
            className="size-8 rounded-full"
          />
          <p className="whitespace-nowrap"> {consultant?.name}</p>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="pl-4">Action</div>,
    cell: ({ row: { original: data } }) => {
      return (
        <div className="flex gap-1">
          <AppointmentModal
            type="schedule"
            clientId={data.client?.$id}
            userId={data.userId}
            appointment={data}
          />
          <AppointmentModal
            type="cancel"
            clientId={data.client?.$id}
            userId={data.userId}
            appointment={data}
          />
        </div>
      );
    },
  },
];
