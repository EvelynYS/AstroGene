"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import CustomFormField from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { getAppointmentSchema } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { FormFieldType } from "./ClientForm";
import { Consultants } from "@/constants";
import { SelectItem } from "../ui/select";
import Image from "next/image";
import {
  createAppointment,
  updateAppointment,
} from "@/lib/actions/appointment.actions";
import { setHours, setMinutes } from "@/node_modules/date-fns";
import { Appointment } from "@/types/appwrite.types";
import { newDate } from "react-datepicker/dist/date_utils";

export const AppointmentForm = ({
  userId,
  clientId,
  type,
  appointment,
  setOpen,
}: {
  userId: string;
  clientId: string;
  type: "create" | "cancel" | "schedule";
  appointment?: Appointment;
  setOpen: (open: boolean) => void;
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const AppointmentFormValidation = getAppointmentSchema(type);
  // 1. Define your form.
  const form = useForm<z.infer<typeof AppointmentFormValidation>>({
    resolver: zodResolver(AppointmentFormValidation),
    defaultValues: {
      primaryConsultant: appointment? appointment.primaryConsultant: '',
      schedule: appointment? new Date(appointment.schedule) : new Date(Date.now()),
      //   reason: appointment? appointment.reason : "",
      //   note: appointment? appointment.note : "",
      cancellationReason: appointment?.cancellationReason ||  '',
    },
  });

  //2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof AppointmentFormValidation>) {
    setIsLoading(true);

    let status;
    switch (type) {
      case "schedule":
        status = "scheduled";
        break;
      case "cancel":
        status = "cancelled";
        break;
      default:
        status = "pending";
        break;
    }

    try {
      if (type === "create" && clientId) {
        const appointmentData = {
          userId,
          client: clientId,
          primaryConsultant: values.primaryConsultant,
          schedule: new Date(values.schedule),
          status: status as Status,
        };

        const appointment = await createAppointment(appointmentData);
        if (appointment) {
          form.reset();
          router.push(
            `/clients/${userId}/new-appointment/success?appointmentId=${appointment.$id}`
          );
        }
      } else {
        const appointmentToUpdate = {
          userId,
          appointmentId: appointment?.$id!,
          appointment: {
            primaryConsultant: values?.primaryConsultant,
            schedule: new Date(values?.schedule),
            status: status as Status,
            cancellationReason: values?.cancellationReason,
          },
          type,
        };
        const updatedAppointment = await updateAppointment(appointmentToUpdate);
        if (updatedAppointment) {
          setOpen && setOpen(false);
          form.reset();
        }
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }

  let buttonLabel;
  switch (type) {
    case "cancel":
      buttonLabel = "Cancel Appointment";
      break;
    case "schedule":
      buttonLabel = "Schedule Appointment";
      break;
    default:
      buttonLabel = "Submit Appointment";
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        {type === "create" && (
          <section className="mb-12 space-y-4">
            <h1 className="header">New Appointment</h1>
            <p className="text-dark-700">
              Request a new appointment in 10 seconds.
            </p>
          </section>
        )}

        {type !== "cancel" && (
          <>
            <div className="flex flex-col gap-6 xl:flex-row">
              <CustomFormField
                fieldType={FormFieldType.SELECT}
                control={form.control}
                name="primaryConsultant"
                label="Consultant"
                placeholder="Select a consultant"
              >
                {Consultants.map((consultant, i) => (
                  <SelectItem key={consultant.name + i} value={consultant.name}>
                    <div className="flex cursor-pointer items-center gap-2">
                      <Image
                        src={consultant.image}
                        width={32}
                        height={32}
                        alt={consultant.name}
                        className="rounded-full border border-dark-500"
                      />
                      <p>{consultant.name}</p>
                    </div>
                  </SelectItem>
                ))}
              </CustomFormField>

              <CustomFormField
                fieldType={FormFieldType.DATE_PICKER}
                control={form.control}
                name="schedule"
                label="Expected date"
                showTimeSelect
                minTime={setHours(setMinutes(new Date(), 59), 18)}
                maxTime={setHours(setMinutes(new Date(), 30), 23)}
                dateFormat="MM/dd/yyyy - h:mm aa"
              />
            </div>
          </>
        )}

        {type === "cancel" && (
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="cancellationReason"
            label="Reason for cancellation"
            placeholder="Urgent meeting came up"
          />
        )}
        <SubmitButton
          isLoading={isLoading}
          className={`${
            type === "cancel" ? "shad-danger-btn" : "shad-primary-btn"
          } w-full`}
        >
          {buttonLabel}
        </SubmitButton>
      </form>
    </Form>
  );
};
