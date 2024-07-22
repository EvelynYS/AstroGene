"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl } from "@/components/ui/form";
import CustomFormField from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { ClientFormValidation } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { createUser, registerClient } from "@/lib/actions/client.actions";
import { FormFieldType } from "./ClientForm";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  cityOptions,
  Consultants,
  ConsultingOptions,
  GenderOptions,
  ClientFormDefaultValues,
} from "@/constants";
import { Label } from "@radix-ui/react-label";
import { SelectItem } from "@/components/ui/select";
import Image from "next/image";
import FileUploader from "../FileUploader";

const RegisterForm = ({ user }: { user: User }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  // 1. Define your form.
  const form = useForm<z.infer<typeof ClientFormValidation>>({
    resolver: zodResolver(ClientFormValidation),
    defaultValues: {
      ...ClientFormDefaultValues,
      name: "",
      email: "",
      phone: "",
    },
  });

  //2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof ClientFormValidation>) {
    setIsLoading(true);

    let formData;
    if (values.document && values.document.length > 0) {
      const blobFile = new Blob([values.document[0]], {
        type: values.document[0].type,
      });
      formData = new FormData();
      formData.append("blobFile", blobFile);
      formData.append("fileName", values.document[0].name);
    }

    try {
      // const clientData = {
      //   ...values,
      //   userId: user.$id,
      //   birthDate: new Date(values.birthDate),
      //   birthTime: new Date(values.birthTime),
      //   document : formData,

      // }
      const clientData  = {
        userId: user.$id,
        name: values.name,
        email: values.email,
        phone: values.phone,
        birthDate: new Date(values.birthDate),
        birthTime: new Date(values.birthTime),
        gender: values.gender,
        city: values.city,
        occupation: values.occupation,
        primaryConsultant: values.primaryConsultant,
        consultingTopic: values.consultingTopic,
        currentChallenge: values.currentChallenge,
        document: values.document ? formData : undefined,
        privacyConsent: values.privacyConsent,
        disclosureConsent: values.disclosureConsent,
      };

      const newClient = await registerClient(clientData);
      if (newClient){ router.push(`/clients/${user.$id}/new-appointment`);}
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-12 flex-1"
      >
        <section className="space-y-4">
          <h1 className="header">Welcome</h1>
          <p className="text-dark-700">Let us know more about you.</p>
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Personal Information</h2>
          </div>
        </section>

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="name"
          label="Full name"
          placeholder="Evelyn Lai"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="email"
            label="Email"
            placeholder="evelynlai@gmail.com"
            iconSrc="/assets/icons/email.svg"
            iconAlt="email"
          />

          <CustomFormField
            fieldType={FormFieldType.PHONE_INPUT}
            control={form.control}
            name="phone"
            label="Phone number"
            placeholder="+886 975 000 000"
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldType.DATE_PICKER}
            control={form.control}
            name="birthDate"
            label="Date of Birth"
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
          />

          <CustomFormField
            fieldType={FormFieldType.TIME_PICKER}
            control={form.control}
            name="birthTime"
            label="Time of Birth"
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="city"
            label="Birth Place"
            placeholder="Select City"
          >
            {cityOptions.map((city, i) => (
              <SelectItem key={city.label + i} value={city.value}>
                <div className="flex cursor-pointer items-center gap-2">
                  <Image
                    src={city.image}
                    width={32}
                    height={32}
                    alt="city"
                    className="rounded-full border border-dark-500"
                  />
                  <p>{city.label}</p>
                </div>
              </SelectItem>
            ))}
          </CustomFormField>

          <CustomFormField
            fieldType={FormFieldType.SKELETON}
            control={form.control}
            name="gender"
            label="Gender"
            renderSkeleton={(field) => (
              <FormControl>
                <RadioGroup
                  className="flex h-11 gap-6 xl:justify-between"
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  {GenderOptions.map((option) => (
                    <div key={option} className="radio-group">
                      <RadioGroupItem value={option} id={option} />
                      <Label htmlFor={option} className="cursor-pointer">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
            )}
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="occupation"
            label="Occupation"
            placeholder="Software Engineer"
          />
        </div>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Consulting Information</h2>
          </div>
        </section>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="primaryConsultant"
            label="Primary Consultant"
            placeholder="Select a consultant"
          >
            {Consultants.map((consultant) => (
              <SelectItem key={consultant.name} value={consultant.name}>
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
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="consultingTopics"
            label="Consulting Topic"
            placeholder="Select a Topic"
          >
            {ConsultingOptions.map((topic) => (
              <SelectItem key={topic} value={topic}>
                <div className="flex cursor-pointer items-center gap-2">
                  <p>{topic}</p>
                </div>
              </SelectItem>
            ))}
          </CustomFormField>
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="currentChallenge"
            label="Current Challenge"
            placeholder="Any challenge you want to share with us? This will allow the consultant better prepare for consultation."
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldType.SKELETON}
            control={form.control}
            name="document"
            label="Copy of any document you wish to share"
            renderSkeleton={(field) => (
              <FormControl>
                <FileUploader files={field.value} onChange={field.onChange} />
              </FormControl>
            )}
          />
        </div>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Consent and Privacy</h2>
          </div>
        </section>
        <CustomFormField
          fieldType={FormFieldType.CHECKBOX}
          control={form.control}
          name="disclosureConsent"
          label="I consent to disclosure of information"
        />
        <CustomFormField
          fieldType={FormFieldType.CHECKBOX}
          control={form.control}
          name="privacyConsent"
          label="I consent to privacy policy"
        />
        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  );
};

export default RegisterForm;
