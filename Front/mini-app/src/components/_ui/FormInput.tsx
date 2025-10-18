import { Dispatch, FC, InputHTMLAttributes, SetStateAction } from "react";


interface FormInputProps extends InputHTMLAttributes<HTMLInputElement>{
    label:string;
    setValue: Dispatch<SetStateAction<string>>;
}

export const FormInput:FC<FormInputProps> = ({id, label, value, maxLength, setValue, ...inputPropos}) =>  {

    return(
        <fieldset className="grid">
            <label className="text-[#7b7c7b]" htmlFor={id}>{label}</label>
            <input 
                value={value} 
                onChange={(e) => setValue(e.target.value)} 
                className="text-[#7b7c7b] border border-[#e8e9e9] hover:border-[#b1b2b2] focus:border-[#b1b2b2] outline-none p-2 shadow-md rounded-lg" 
                name={id} id={id} 
                type="text"
                maxLength={maxLength}
                {...inputPropos}
            />
        </fieldset>
    );
}