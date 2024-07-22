export const GenderOptions= ['male', 'female', 'other']

export const ConsultingOptions= ['Birth Chart Reading', 'General Fortune', 'Career', 'Business', 'Relations', 'Wealth', 'Other' ]

export const  cityOptions = [
    { value: '25.0477 121.5318', label: 'Taipei',  image: "/assets/images/Taipei.png" },
    { value: '35.6761 139.6503', label: 'Tokyo',  image: "/assets/images/Tokyo.png" },
    { value: '31.2304 121.4737', label: 'Shanghai',  image: "/assets/images/shanghai.jpg" },
    { value: '40.71427000 -74.0059', label: 'New York',  image: "/assets/images/NewYork.png" }
  ];
  export const Consultants = [
    {
      image: "/assets/images/consultant_Emily.png",
      name: "Emily Jackson",
    },
    {
      image: "/assets/images/consultant_Michael.png",
      name: "Michael Huber",
    },
    {
      image: "/assets/images/consultant_Evelyn.png",
      name: "Evelyn Lai",
    },];

    export const ClientFormDefaultValues = {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        birthDate: new Date(Date.now()),
        birthTIme: new Date(),
        gender: "male" as Gender,
        city: "",
        occupation: "",
        // emergencyContactName: "",
        // emergencyContactNumber: "",
        primaryConsultant: "",
        // insuranceProvider: "",
        // insurancePolicyNumber: "",
        consultingTopic: "",
        currentChallenge: "",
        // familyMedicalHistory: "",
        // pastMedicalHistory: "",
        // identificationType: "Birth Certificate",
        // identificationNumber: "",
        document: [],
        // treatmentConsent: false,
        disclosureConsent: false,
        privacyConsent: false,
      };

      export const StatusIcon = {
        scheduled: "/assets/icons/check.svg",
        pending: "/assets/icons/pending.svg",
        cancelled: "/assets/icons/cancelled.svg",
      };