"use client";

import { LoaderCircle } from "lucide-react";
import { FC, useActionState, useContext, useEffect, useState } from "react";
import { FormInput } from "./_ui/FormInput";
import { FormInputPassword } from "./_ui/FormInputPassword";
import { FormError } from "./_ui/FormError";
import { FormErrorContext } from "@/context/formContext/FormErrorContext";
import { signIn } from "next-auth/react";

type FormLoginProps = {
    action: (_: string, formData: FormData) => Promise<string>;
}

export const FormLogin: FC<FormLoginProps> = ({action}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [errorMessage, formAction, isPending] = useActionState(action, "");
     const { hasError, message, setMessage } = useContext(FormErrorContext);
    
         useEffect(() => {
            if(!isPending && errorMessage) {
                setMessage(errorMessage);
            }
        }, [isPending, errorMessage]);
    

  return (
    <>
         { hasError && errorMessage && (
            <FormError />
        )}

      <form action={formAction} className="grid gap-y-5 grid-cols-1">
        <FormInput id="email" label="Email" value={email} maxLength={55} setValue={setEmail}  />
        <FormInputPassword id="password" label="Senha" value={password} maxLength={15} setValue={setPassword}  />

        <button disabled={isPending} className="flex items-center justify-center bg-[#141516] text-white p-2 rounded-lg cursor-pointer disabled:opacity-50" type="submit">Login {isPending && <LoaderCircle className="animate-spin w-4" />}</button>

        {/*
        <button
          onClick={() => signIn("google", {callbackUrl: '/tasks'})}
          className="flex items-center justify-center dark:bg-gray-800  rounded-lg px-4 py-2 flex gap-2 text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150 cursor-pointer"
        >
            <img className="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo"/>
            <span>Login with Google</span>
        </button>
        */}
      </form>
    </>
    );
}