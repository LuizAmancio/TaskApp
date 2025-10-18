"use server";
import { getCookie } from "@/lib/cookieUtil";
import { fetchWithToken } from "@/lib/fetchWithToken";
import { getPayload } from "@/lib/TokenUtil";
import { revalidateTag } from "next/cache";

export const handleCreateTask = async(initialState:string,formData: FormData) => {

      const task = formData.get("task")?.toString();
      const token = await getCookie("token");
      
      if (!token) {
        return "Usuário não autenticado";
      }
      if (!task) {
        return "Preencha o titulo da task";
      }

      const { payload } = await getPayload();
      const userId = payload.id; // claim "id"

      const body =
      { 
        user:{userId},
        title: task
      };

      try{

        const res = await fetchWithToken(`${process.env.BACKEND_URL}/tasks`, token, {
          method: "POST",
          body: JSON.stringify({...body})
        });

        console.log("Task cadastrada com sucesso!");
        
        if(res.detail){
          return res.detail;
        }

        revalidateTag('get-tasks'); // revalida cache via tag

      } catch (error) {
        const err = error as Error;
        return "Erro ao cadastrar task: " + err.message.substring(0, 65);

      }
    };

    export const handleCompleteTask = async(initialState:string, formData: FormData) => {

      const id = formData.get("id")?.toString();
      const token = await getCookie("token");
      
      if (!token) {
        return "Usuário não autenticado";
      }
      if (!id) {
        return "ID da task não fornecido";
      }

      try{

        const res = await fetchWithToken(
            `${process.env.BACKEND_URL}/tasks/${id}/complete`, 
            token, 
            {
                method: "PUT",
            }
        );
        console.log("Task concluída com sucesso!");
        
        if(res.detail){
          return res.detail;
        }

        revalidateTag('get-tasks'); // revalida cache via tag

      } catch (error) {
        const err = error as Error;
        return "Erro ao atualizar task: " + err.message.substring(0, 65);

      }
    };

     export const handleDeleteTask = async(initialState:string, formData: FormData) => {

      const id = formData.get("id")?.toString();
      const token = await getCookie("token");
      
      if (!token) {
        return "Usuário não autenticado";
      }
      if (!id) {
        return "ID da task não fornecido";
      }

      try{

        const res = await fetchWithToken(
            `${process.env.BACKEND_URL}/tasks/${id}/delete`, 
            token, 
            {
                method: "PUT",
            }
        );
        console.log("Task excluída com sucesso!");
        
        if(res.detail){
          return res.detail;
        }

        revalidateTag('get-tasks'); // revalida cache via tag

      } catch (error) {
        const err = error as Error;
        return "Erro ao deletar task: " + err.message.substring(0, 65);

      }
    };