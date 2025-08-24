import { isAxiosError } from "axios";

import api from "@/lib/axios";
import { userSchema, type UserLoginForm } from "@/types/index";

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