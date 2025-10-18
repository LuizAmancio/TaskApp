import { FormTasks } from "@/components/FormTasks";
import { fetchWithToken } from "@/lib/fetchWithToken";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { handleCompleteTask, handleCreateTask, handleDeleteTask } from "./actions";
import { TaskCard } from "@/components/TaskCard";
import { getCookie } from "@/lib/cookieUtil";
import { jwtVerify } from "jose";
import { getPayload } from "@/lib/TokenUtil";

export const metadata: Metadata = {
  title: "Tarefas",
};

type TaskType = {
  id: string;
  userId: string;
  title: string;
  status: string;
  completed:boolean;
  createdAt: string;
  updatedAt: string;
};

export default async function Tasks() {

    const cookieStore = await getCookie("token");
    if(!cookieStore)  redirect('/login');
   
    const { payload } = await getPayload();
    const userId = payload.id; 

    const {tasks}: {tasks: TaskType[]} = await fetchWithToken(
      `${process.env.BACKEND_URL}/tasks/user/${userId}`, 
      cookieStore,
      {
        next: { tags: ['get-tasks'] } // cache com revalidação via tag
      }
    )
    .catch(err => {
      console.log("Erro ao buscar tasks: " + err);
      return { tasks:[] };
    });

  return (
    <>
      <h1 className="text-3xl font-bold text-center">Tasks</h1>
      <FormTasks action={handleCreateTask} />

      <ul className="mt-5 overflow-y-auto max-h-[300px]">
        {tasks.reverse().sort((a, b) => (a.status == "pending" ? -1 : 1)).map(task => (
          <TaskCard 
            key={task.id} 
            id={task.id} 
            title={task.title} 
            status={task.status} 
            completeAction={handleCompleteTask} 
            deleteAction={handleDeleteTask} 
          />
        ))}
      </ul>
    </>
  );
}
