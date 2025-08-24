import { isAxiosError } from "axios";


import api from "@/lib/axios";
import { Task, TaskFormData } from "../types";

export async function getAllTask() {
  try {
    const url = '/task'
    const { data } = await api.get(url)
    console.log(data);
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

export async function getTaskById(taskId: Task["_id"]): Promise<Task> {
  try {
    const url = `/task/${taskId}`
    const { data } = await api.get<Task>(url)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
    throw new Error("Error desconocido al obtener la tarea")
  }
}

export async function createTask(formData: TaskFormData) {
  try {
    const url = '/task/create'
    const { data } = await api.post<string>(url, formData)
    console.log(data);
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

type TaskAPIType = {
  formData: TaskFormData,
  taskId: Task['_id']
}


export async function updateTask({ formData, taskId }: TaskAPIType): Promise<string> {
  try {
    const url = `/task/update/${taskId}`
    const { data } = await api.put<string>(url, formData)
    return data // <- siempre retorna string en éxito
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
    throw new Error('Error al actualizar la tarea') // <- evita retornar undefined
  }
}

export async function deleteTask(id: Task["_id"]): Promise<string> {
  try {
    const res = await api.delete(`/task/delete/${id}`, { responseType: "text" });

    const body = typeof res.data === "string" ? res.data.trim() : "";
    return body || "Tarea eliminada Correctamente";
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error('Necesitas ser admin para eliminar!');
    }
    throw error instanceof Error ? error : new Error("Error desconocido");
  }
}