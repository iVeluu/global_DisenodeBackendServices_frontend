import { isAxiosError } from "axios";


import api from "@/lib/axios";
import { Task, TaskFormData } from "../types";

export async function getAllTask(formData: Task) {
  try {
    const url = '/task'
    const { data } = await api.post<string>(url, formData)
    console.log(data);
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

export async function getTaskById(taskId: Task['_id']) {
  try {
    const url = `/task/${taskId}`
    const { data } = await api.post<string>(url)
    console.log(data);
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
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


export async function updateTask({ formData, taskId }: TaskAPIType) {
  try {
    const url = `/task/update/${taskId}`
    const { data } = await api.post<string>(url, formData)
    console.log(data);
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

export async function deleteTask(id: Task['_id']) {
  try {
    const url = `/task/delete/${id}`
    const { data } = await api.post<string>(url)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}