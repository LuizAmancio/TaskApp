import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid px-4 gap-y-4">
      <h1 className="text-3xl font-bold underline">Bem-vindo!</h1>
      <div>
        <p className="font-bold">Telas disponíveis:</p>
        <ul className="list-disc ml-6 underline">
          <li>
            <Link href="/register">Cadastro</Link>
          </li>
          <li>
            <Link href="/login">Login</Link>
          </li>
          <li>
            <Link href="/tasks">Tasks</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
