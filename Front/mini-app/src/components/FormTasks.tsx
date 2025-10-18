"use client";
import { FC, useActionState, useContext, useEffect, useState } from "react";
import { FormError } from "./_ui/FormError";
import { FormErrorContext } from "@/context/formContext/FormErrorContext";
import { mutate } from "swr";

type FormTasksProps = {
    action: (_: string, formData: FormData) => Promise<string>;
}

export const FormTasks:FC<FormTasksProps> = ({action}) => {
    const [task, setTask] = useState("");
    const [errorMessage, formAction, isPending] = useActionState(action, "");
    const { hasError, message, setMessage } = useContext(FormErrorContext);

    useEffect(() => {
        if(!isPending && !errorMessage) {
            setTask("");
        }
        else if(!isPending && errorMessage) {
            setMessage(errorMessage);
        }
    }, [isPending, errorMessage]);

    useEffect(() => {
        mutate("/api/me"); // força atualização do contexto
    }, []);


  return (
    <>
        { hasError && message && (
            <FormError />
        )}

      <form action={formAction} className="relative shadow-lg rounded-lg">
        <input 
            value={task} 
            onChange={(e) => setTask(e.target.value)} 
            className="w-full px-2 py-1 pr-10 text-[#7b7c7b] border border-[#e8e9e9] hover:border-[#b1b2b2] focus:border-[#b1b2b2] outline-none rounded-lg" 
            name="task" id="task" 
            type="text"
            maxLength={65}
            placeholder="Informe o titulo da task"
        />
        <button disabled={isPending} className="absolute top-0 right-0 bottom-0 px-3 bg-[#141516] text-white rounded-r-lg cursor-pointer disabled:opacity-50" type="submit">+</button>
      </form>
    </>
    );
}