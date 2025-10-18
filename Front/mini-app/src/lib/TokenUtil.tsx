import { JWTPayload, jwtVerify, JWTVerifyResult } from "jose";
import { getCookie } from "./cookieUtil";
import { redirect } from "next/navigation";


export const getPayload = async ():Promise<JWTVerifyResult<JWTPayload>> =>  {
    const cookieStore = await getCookie("token");
    
    if(!cookieStore)  redirect('/login');

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    return await jwtVerify(cookieStore, secret);
}