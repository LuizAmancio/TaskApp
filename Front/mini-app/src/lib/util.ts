
import { cookies } from "next/headers";
import { COOKIE } from "./consts";

const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/; // email valido

const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/; // Minimo oito caracteres, pelo menos uma letra e um número

export const isValidEmail = (email: string): boolean => {
  return EMAIL_REGEX.test(email);
}

export const isValidPassword = (password: string): boolean => {
  return PASSWORD_REGEX.test(password);
}


