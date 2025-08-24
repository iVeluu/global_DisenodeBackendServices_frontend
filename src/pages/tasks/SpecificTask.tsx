import { deleteTask, getTaskById } from "@/api/TaskAPI";
import TaskCard from "@/components/TaskCard";
import { Task } from "@/types/index";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function SpecificTask() {
  const { taskId } = useParams<{ taskId: Task["_id"] }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    data: task,
    isLoading,
    isError,
    error,
  } = useQuery<Task, Error>({
    queryKey: ["task", taskId],
    queryFn: () => getTaskById(taskId!),
    enabled: Boolean(taskId),
    staleTime: 60_000,
  });

  const { mutate, isPending } = useMutation<string, Error, Task["_id"]>({
    mutationFn: (id) => deleteTask(id),
    onSuccess: (msg) => {
      queryClient.setQueryData<Task[]>(["tasks"], (old) =>
        Array.isArray(old) ? old.filter((t) => t._id !== taskId) : old
      );
      queryClient.removeQueries({ queryKey: ["task", taskId], exact: true });
      queryClient.removeQueries({ queryKey: ["tasks"], exact: true });

      toast.success(msg || "Tarea eliminada correctamente!");
      navigate("/");
    },
    onError: (err) => {
      toast.error(err.message || "Error al eliminar la tarea");
    },
  });

  if (isLoading) return <p>Cargando...</p>;
  if (isError) return <p>Error: {error.message}</p>;
  if (!task) return <p>No se encontró la tarea.</p>;

  return (
    <>
      <h2 className="text-5xl font-black text-center">Detalles de la tarea</h2>
      <TaskCard task={task} />

      <div className="flex sm:flex-col md:flex-row gap-4 p-4 sm:justify-center md:justify-end">
        {/* Actualizar */}
        <Link
          to={`/tasks/update/${task._id}`}
          className="group inline-flex items-center justify-center gap-2
               px-5 py-3 rounded-2xl font-semibold text-white
               bg-indigo-600 hover:bg-indigo-700
               shadow-sm hover:shadow
               transition-all duration-200 active:scale-[.98]
               focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60"
          aria-label="Actualizar tarea"
        >
          {/* ícono lápiz */}
          <svg xmlns="http://www.w3.org/2000/svg" className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
          </svg>
          Actualizar Tarea
        </Link>

        {/* Borrar */}
        <button
          onClick={() => mutate(task._id)} // ✅ pasa solo el id
          disabled={isPending}
          className="group inline-flex items-center justify-center gap-2
               px-5 py-3 rounded-2xl font-semibold text-white
               bg-rose-600 hover:bg-rose-700 disabled:opacity-70
               shadow-sm hover:shadow
               transition-all duration-200 active:scale-[.98]
               focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500/60"
          aria-label="Borrar tarea"
        >
          {/* ícono bote de basura */}
          <svg xmlns="http://www.w3.org/2000/svg" className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
          </svg>
          {isPending ? "Borrando..." : "Borrar Tarea"}
        </button>
      </div>
    </>
  );
}
