import { isAxiosError } from "axios";

import api from "@/lib/axios";
import { UserRegistrationForm, userSchema, type UserLoginForm } from "@/types/index";

export async function authenticateUser(formData: UserLoginForm) {
  try {
    const url = '/auth/login'
    const { data } = await api.post<string>(url, formData)
    localStorage.setItem('AUTH_TOKEN', data)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

export async function createAccount(formData: UserRegistrationForm): Promise<string> {
  try {
    const url = "/auth/create-account";
    const { data } = await api.post<string>(url, formData);
    return data; // <- siempre string
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
    throw new Error("No se pudo crear la cuenta");
  }
}

export async function getUser() {
  try {
    const { data } = await api('auth/user')
    const result = userSchema.safeParse(data)
    if (result.success) {
      return result.data
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

export async function admin(){
  try {
    const url = "/auth/admin";
    const { data } = await api.get(url);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}