import { getTaskById, updateTask } from "@/api/TaskAPI"
import type { Task, TaskFormData } from "@/types/index"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import ErrorMessage from "@/components/ErrorMessage"
import React from "react"

export default function UpdateTask() {
  const navigate = useNavigate()
  const { taskId } = useParams<{ taskId: string }>()
  const queryClient = useQueryClient()

  const { data: task, isLoading, isError, error } = useQuery<Task, Error>({
    queryKey: ["task", taskId],
    queryFn: () => getTaskById(taskId!),
    enabled: Boolean(taskId),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TaskFormData>({
    defaultValues: { name: "", description: "" },
  })

  React.useEffect(() => {
    if (task) {
      reset({ name: task.name, description: task.description })
    }
  }, [task, reset])

  const { mutate, isPending } = useMutation<string, Error, TaskFormData>({
    mutationFn: (formData) => updateTask({ taskId: taskId!, formData }),
    onError: (err) => {
      toast.error(err.message || "Error al actualizar la tarea")
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] })
      queryClient.invalidateQueries({ queryKey: ["task", taskId]})
      toast.success("Tarea actualizada correctamente!")
      navigate("/")
    },
  })

  const onSubmit = (data: TaskFormData) => mutate(data)

  if (isLoading) return <p>Cargando tarea...</p>
  if (isError) return <p>Error: {error.message}</p>
  if (!task) return <p>No se encontró la tarea</p>

  return (
    <div>
      <h2 className="text-5xl font-black text-center">Actualiza tu tarea</h2>

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
            className="w-full p-3 border border-gray-300 rounded"
            {...register("name", {
              required: "El nombre es obligatorio",
              minLength: { value: 3, message: "Mínimo 3 caracteres" },
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
            className="w-full p-3 border border-gray-300 rounded min-h-28"
            {...register("description", {
              required: "La descripción es obligatoria",
              minLength: { value: 5, message: "Mínimo 5 caracteres" },
            })}
          />
          {errors.description && (
            <ErrorMessage>{errors.description.message}</ErrorMessage>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60 w-full p-3 text-white font-black text-xl rounded transition-all"
        >
          {isPending ? "Actualizando..." : "Actualizar tarea"}
        </button>
      </form>
    </div>
  )
}
