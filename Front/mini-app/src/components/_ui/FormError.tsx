import { FormErrorContext } from "@/context/formContext/FormErrorContext";
import { FC, useContext, useEffect, useState } from "react";

export type MessageType = {
  type: string
};

type FormErrorProps = {
    message:string;
}


export const FormError:FC = ({}) =>  {

   const { hasError, message, setMessage } = useContext(FormErrorContext);

   useEffect(() => {
    let seconds = 3500;
       const timer = setTimeout(() => {
           setMessage("");
       }, seconds);
       return () => clearTimeout(timer);
   }, [message]);

   if(!message || !hasError) return null;

    return(
       <p className={`px-4 py-2 bg-red-400 text-white font-bold text-sm rounded-lg`}>
            {message}
        </p>
    );
}