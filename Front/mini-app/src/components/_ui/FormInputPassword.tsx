import { Eye, EyeOff } from "lucide-react";
import { Dispatch, FC, InputHTMLAttributes, SetStateAction, useState } from "react";


interface FormInputProps extends InputHTMLAttributes<HTMLInputElement>{
    label:string;
    setValue: Dispatch<SetStateAction<string>>;
}

export const FormInputPassword:FC<FormInputProps> = ({id, label, value, maxLength, setValue, ...inputPropos}) =>  {
        const [showPassword, setShowPassword] = useState(false);

    return(
        <fieldset className="grid">
            <label className="text-[#7b7c7b]" htmlFor="password">Senha</label>
            <div className="relative flex items-center">
                <input 
                    value={value} 
                    onChange={(e) => setValue(e.target.value)} 
                    className="w-full pl-2 pr-10 py-2 text-[#7b7c7b] border border-[#e8e9e9] hover:border-[#b1b2b2] focus:border-[#b1b2b2] outline-none shadow-md rounded-lg" 
                    name={id} id={id} 
                    type={showPassword ? "text" : "password"} 
                    maxLength={maxLength}
                /><span className="text-sm text-[#7b7c7b] absolute right-2 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff /> : <Eye />} </span>
            </div>
        </fieldset>
    );
}