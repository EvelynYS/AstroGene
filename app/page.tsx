import Image from "next/image";
import ClientForm from "@/components/forms/ClientForm";
import Link from "next/link";
import PasskeyModal from "@/components/PasskeyModal";

export default function Home({searchParams}:SearchParamProps) {
const isAdmin = searchParams.admin === 'true';

  return (
    <div className="flex h-screen max-h-screen">
     {isAdmin && <PasskeyModal/>}
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <Image
            src="/assets/icons/astroLogo.png"
            height={1000}
            width={1200}
            alt="AstroGene"
            className="mb-12 h-10 w-fit rounded"
          />
          <ClientForm />
          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">
              © 2024 AstroGene
            </p>
            <Link href="/?admin=true" className="text-red-500">
              Admin
            </Link>
          </div>
        </div>
      </section>
      <Image
        src="/assets/images/frontPagePhoto.png"
        height={1000}
        width={1000}
        alt="AstroGene"
        className="side-img max-w-[50%] object-contain"
      />
    </div>
  );
}
