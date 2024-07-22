import { Models } from "node-appwrite";

export interface Client extends Models.Document {
  userId: string;
  name: string;
  email: string;
  phone: string;
  birthDate: Date;
  birthTime: Date,
  gender: Gender;
  city: string;
  occupation: string;
//   emergencyContactName: string;
//   emergencyContactNumber: string;
  primaryConsultant: string;
//   insuranceProvider: string;
//   insurancePolicyNumber: string;
  consultingTopic: string | undefined;
  currentChallenge: string | undefined;
//   familyMedicalHistory: string | undefined;
//   pastMedicalHistory: string | undefined;
//   identificationType: string | undefined;
//   identificationNumber: string | undefined;
  identificationDocument: FormData | undefined;
  privacyConsent: boolean;
  disclosureConsent:boolean;
}

export interface Appointment extends Models.Document {
  client: Client;
  schedule: Date;
  status: Status;
  primaryConsultant: string;
  userId: string;
  cancellationReason: string | null;
}