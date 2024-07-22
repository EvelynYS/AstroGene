import Link from "next/link";
import React from "react";
import Image from "next/image";
import { getAppointment } from "@/lib/actions/appointment.actions";
import { Consultants } from "@/constants";
import { formatDateTime } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import * as Sentry from '@sentry/nextjs'
import { getUser } from "@/lib/actions/client.actions";

const success = async ({
  params: { userId },
  searchParams,
}: SearchParamProps) => {
  const appointmentId = (searchParams?.appointmentId as string) || "";
  const appointment = await getAppointment(appointmentId);

  const consultant = Consultants.find(
    (con) => con.name === appointment.primaryConsultant
  );

  const user = await getUser(userId);
  Sentry.metrics.set("user_view_appointment-success", user.name);

  return (
    <div className="flex h-screen max-h-screen px-[5%]">
      <div className="success-img">
        <Link href="/">
          <Image
            src="/assets/icons/astroLogo.png"
            height={1000}
            width={1200}
            alt="logo"
            className="h-10 w-fit"
          />
        </Link>
        <section className="flex flex-col items-center">
          <Image
            src="/assets/gifs/success.gif"
            height={300}
            width={280}
            alt="success"
          />
          <h2 className="header mb-6 max-w-[600px] text-center">
            Your <span className="text-red-500">appointment request</span>{" "}
            successfully submitted
          </h2>
          <p>We will be in touch shortly to confirm.</p>
        </section>
        <section className="request-details">
          <p className="text-lg">Requested appointment details:</p>
          <div className="flex items-center gap-3">
            <Image
              src={consultant?.image!}
              alt="consultant"
              width={100}
              height={100}
              className="size-6"
            />
            <p className="whitespace-nowrap text-lg">Consultant: {consultant?.name}</p>
          </div>
          <div className="flex gap-2">
            <Image
              src="/assets/icons/calendar.svg"
              height={24}
              width={24}
              alt="calendar"
            />
            <p className="text-lg">{formatDateTime(appointment.schedule).dateTime}</p>
          </div>
        </section>

        <Button variant="outline" className="shad-primary-btn" asChild>
          <Link href={`/clients/${userId}/new-appointment`}>New Appointment
          </Link>
        </Button>
        <p className="copyright"> © 2024 AstroGene</p>
      </div>
    </div>
  );
};

export default success;
