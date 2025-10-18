"use client";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import FormErrorProvider from "@/context/formContext/FormErrorContext";
import { usePageReady } from "@/hooks/usePageReady";


export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

 // const ready = usePageReady();
  return (
    <FormErrorProvider>
      {/*!ready && <LoadingOverlay show={true} />*/}
      <div className="grid px-4 gap-y-4 border border-[#fdfcfc] px-8 py-12 rounded-3xl shadow-xl bg-white min-w-85 max-w-85 md:min-w-100 md:max-w-100">
        {children}
      </div>
    </FormErrorProvider>
  );
}
