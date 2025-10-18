"use client";
import { FormErrorContext } from "@/context/formContext/FormErrorContext";
import { Check, Pencil, Trash, X } from "lucide-react";
import { FC, PropsWithChildren, use, useActionState, useContext, useEffect, useState } from "react";

import classNames from "classnames";

interface TaskCardProps extends PropsWithChildren {
    id: string;
    title: string;
    status: string;
    completeAction: (_: string, formData: FormData) => Promise<string>;
    deleteAction: (_: string, formData: FormData) => Promise<string>;
}

export const TaskCard:FC<TaskCardProps> = ({id, title, status, completeAction, deleteAction, children}) =>  {
    
    const [errorMessage, formAction, isPending] = useActionState(completeAction, "");
    const [errorMessageDelete, deleteFormAction, isPendingDelete] = useActionState(deleteAction, "");
    const { setMessage } = useContext(FormErrorContext);
    
    
        useEffect(() => {
            if((!isPending && errorMessage)) {
                setMessage(errorMessage);
            }
        }, [isPending, errorMessage]);

        useEffect(() => {
            if((!isPendingDelete && errorMessageDelete)) {
                setMessage(errorMessageDelete);
            }
        }, [isPendingDelete, errorMessageDelete]);

    return(
        
         <li className={classNames("p-4 mb-2 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow",
            {"opacity-50": status === "completed" || status === "deleted"}
         )}>
            <div className="flex">
                <p className={classNames("text-lg", {"line-through": status === "completed" || status === "deleted"})}>{title}</p>
            </div>
            <div className="flex">
                <p className="text-sm text-gray-500">Status: {status}</p>
                { status !== "deleted" && status !== "completed" && (
                    <div className="ml-auto flex gap-3">
                        <form action={formAction}>
                            <input type="hidden" name="id" value={id} />
                            <button disabled={isPending || isPendingDelete} type="submit" className="text-sm text-green-500 cursor-pointer hover:scale-110 transition-transform disabled:opacity-50">
                                <Check size={20} />
                            </button>
                        </form>
                        <form action={deleteFormAction}>
                            <input type="hidden" name="id" value={id} />
                            <button disabled={isPending || isPendingDelete} type="submit" className="text-sm text-red-500 cursor-pointer hover:scale-115 transition-transform disabled:opacity-50">
                                <X size={18}  />
                            </button>
                        </form>
                    </div>
                )}
            </div>
          </li>
    );
}