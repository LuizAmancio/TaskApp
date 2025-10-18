
import Link from "next/link";
import { redirect } from "next/navigation";
import {FormLogin} from "@/components/FormLogin";
import { Metadata } from "next";
import { setCookie } from "@/lib/cookieUtil";

export const metadata: Metadata = {
  title: "Login",
};

export default function Login() {

  const handleLogin = async(initialState:string,formData: FormData) => {
    "use server";

    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();

    if (!email || !password) {
      return "Preencha todos os campos corretamente";
    }
    if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      return "Email inválido";
    }

    if ( email.length > 45 || password.length > 20) {
      return "Um ou mais campos excedem o limite de caracteres";
    }

    if (password.length < 6) {
      return "A senha deve ter no mínimo 6 caracteres";
    }

    const body = {email, password };

    try{
      const res = await fetch(`${process.env.BACKEND_URL}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({...body})
      });
      const data = await res.json();

      if(!data.token) return data.detail;

      // salva token no cookie
      await setCookie("token", data.token, 24);

    } catch (error) {
      const err = error as Error;
      return "Erro ao logar usuário: " + err.message.substring(0, 65);

    }
     redirect('/tasks');

  }

  return (
    <>
      <h1 className="text-3xl font-bold text-center">Login</h1>

      <FormLogin action={handleLogin} />

      <Link className="text-center underline" href="/register">Não tenho cadastro</Link>
      <Link className="text-center underline" href="/login">Esqueceu sua senha?</Link>
    </>

  );
}
