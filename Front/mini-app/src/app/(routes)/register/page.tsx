
import {FormRegister} from "@/components/FormRegister";
import { COOKIE } from "@/lib/consts";
import { setCookie } from "@/lib/cookieUtil";
import { isValidEmail, isValidPassword } from "@/lib/util";
import { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Cadastro",
};

export default function Cadastro() {

  const handleRegister = async(initialState:string,formData: FormData) => {
    "use server";

    const name= formData.get("name")?.toString();
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();

    if (!name || !email || !password) {
      return "Preencha todos os campos corretamente";
    }
    if (name.length > 65 || email.length > 45 || password.length > 20) {
      return "Um ou mais campos excedem o limite de caracteres";
    }

    if(!isValidEmail(email)) {
      return "Email inválido";
    }
    if (!isValidPassword(password)) {
      return "A senha deve ter no mínimo 6 caracteres, pelo menos uma letra e um número";
    }

    const body = { name, email, password };

    try{
      const res = await fetch(`${process.env.BACKEND_URL}/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({...body})
      });
      const data = await res.json();
      console.log("Usuário cadastrado com sucesso!", data);

      if(!data.token){
        return data.detail;
      }else{
        // salva token no cookie
       await setCookie("token", data.token, 24); 
      }


    } catch (error) {
      const err = error as Error;
      return "Erro ao cadastrar usuário: " + err.message.substring(0, 65);

    }
     redirect('/tasks');

  }

  return (
    <>
      <h1 className="text-3xl font-bold text-center">Cadastro</h1>

      <FormRegister action={handleRegister} />

      <Link className="text-center underline" href="/login">Já tenho cadastro</Link>
    </>

  );
}
