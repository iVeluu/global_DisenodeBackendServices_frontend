import { createTask } from "@/api/TaskAPI"
import type { TaskFormData } from "@/types/index"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { Navigate, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import ErrorMessage from "@/components/ErrorMessage"
import { useAuth } from "@/hooks/useAuth"

export default function CreateTask() {
  const navigate = useNavigate()
  const { isError } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TaskFormData>({
    defaultValues: { name: "", description: "" },
  })
  
  const { mutate, isPending } = useMutation<string | void, Error, TaskFormData>({
    mutationFn: createTask,
    onError: (error) => {
      toast.error(error.message || "Error al crear la tarea")
    },
    onSuccess: () => {
      toast.success("Tarea creada correctamente!")
      reset()
      navigate("/")
    },
  })

  const onSubmit = (formData: TaskFormData) => mutate(formData)

  if (isError) {
    return <Navigate to='/auth/login' />
  }

  return (
    <div>
      <h2 className="text-5xl font-black text-center">Crea una nueva tarea</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-8 p-10 bg-white rounded-xl mt-10"
        noValidate
      >
        {/* Nombre */}
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="font-normal text-2xl">
            Nombre de la tarea
          </label>
          <input
            id="name"
            type="text"
            placeholder="Ej. Implementar Login"
            className="w-full p-3 border border-gray-300 rounded"
            {...register("name", {
              required: "El nombre es obligatorio",
              minLength: { value: 3, message: "Mínimo 3 caracteres" },
              maxLength: { value: 100, message: "Máximo 100 caracteres" },
            })}
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </div>

        {/* Descripción */}
        <div className="flex flex-col gap-2">
          <label htmlFor="description" className="font-normal text-2xl">
            Descripción
          </label>
          <textarea
            id="description"
            placeholder="Describe la tarea…"
            className="w-full p-3 border border-gray-300 rounded min-h-28"
            {...register("description", {
              required: "La descripción es obligatoria",
              minLength: { value: 5, message: "Mínimo 5 caracteres" },
              maxLength: { value: 1000, message: "Máximo 1000 caracteres" },
            })}
          />
          {errors.description && (
            <ErrorMessage>{errors.description.message}</ErrorMessage>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="bg-fuchsia-600 hover:bg-fuchsia-700 disabled:opacity-60 w-full p-3 text-white font-black text-xl rounded cursor-pointer transition-all"
        >
          {isPending ? "Creando..." : "Crear tarea"}
        </button>
      </form>
    </div>
  )
}
