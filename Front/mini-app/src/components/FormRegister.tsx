"use client";

import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import { FC, useActionState, useContext, useEffect, useState } from "react";
import { FormInput } from "./_ui/FormInput";
import { FormInputPassword } from "./_ui/FormInputPassword";
import { FormError } from "./_ui/FormError";
import { FormErrorContext } from "@/context/formContext/FormErrorContext";

type FormRegisterProps = {
    action: (_: string, formData: FormData) => Promise<string>;
}

export const FormRegister:FC<FormRegisterProps> = ({action}) => {
    const [name, setName] = useState("");
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

        <FormInput id="name" label="Nome" value={name} maxLength={65} setValue={setName}  />

        <FormInput id="email" label="Email" value={email} maxLength={55} setValue={setEmail}  />

        <FormInputPassword id="password" label="Senha" value={password} maxLength={15} setValue={setPassword}  />

        <button disabled={isPending} className="flex items-center justify-center bg-[#141516] text-white p-2 rounded-lg cursor-pointer disabled:opacity-50" type="submit">Cadastrar  {isPending && <span className="ml-2"><LoaderCircle className="animate-spin w-4" /></span>}</button>
      </form>
    </>
    );
}