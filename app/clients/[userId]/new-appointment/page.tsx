import {AppointmentForm} from "@/components/forms/AppointmentForm";
import { getClient } from "@/lib/actions/client.actions";
import Image from "next/image";
import * as Sentry from '@sentry/nextjs';

export default async function NewAppointment({params:{userId}}:SearchParamProps) {
  const client = await getClient(userId);
  Sentry.metrics.set("user_view_new-appointment", client.name);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[860px] flex-1 justify-between">
          <Image
            src="/assets/icons/astroLogo.png"
            height={1000}
            width={1200}
            alt="AstroGene"
            className="mb-12 h-10 w-fit rounded"
          />
          <AppointmentForm
          type="create"
          userId = {userId}
          clientId= {client?.$id}
          />
            <p className="copyright mt-10 py-12">
              © 2024 AstroGene
            </p>
        </div>
      </section>
      <Image
        src="/assets/images/appointment-booking.png"
        height={1000}
        width={1000}
        alt="appointment"
        className="side-img max-w-[600px] object-contain bg-bottom"
      />
    </div>
  );
}
