import { admin } from "@/api/AuthAPI";
import { getAllTask } from "@/api/TaskAPI";
import TaskCard from "@/components/TaskCard";
import { useAuth } from "@/hooks/useAuth";
import { Task } from "@/types/index";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function DashboardView() {
  const { data: user, isLoading: authLoading } = useAuth();
  const queryClient = useQueryClient();

  const {
    data: tasks = [],
    isLoading: tasksLoading,
    isError,
    error,
  } = useQuery<Task[]>({
    queryKey: ["tasks", user?._id],
    queryFn: getAllTask,
    enabled: !!user && !authLoading,
    placeholderData: [],
    retry: false,
    refetchOnWindowFocus: false,
  });

  // ✅ Sin depender de user.role
  const { mutate: becomeAdmin, isPending: adminLoading } = useMutation({
    mutationFn: admin,
    onSuccess: (res: Error) => {
      const msg =
        (typeof res === "string" && res) ||
        res?.message ||
        "Operación realizada";
      toast.success(msg);
      // refresca el usuario; no asumimos shape ni role
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (err: Error) => {
      toast.error(err?.message ?? "No se pudo completar la operación");
    },
  });

  if (authLoading || tasksLoading) return <p>Cargando...</p>;
  if (!user) return <p>Inicia sesión para ver tus tareas.</p>;
  if (isError) return <p>Error: {(error as Error)?.message ?? "Algo salió mal"}</p>;
  

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-6 mb-8">
        <Link
          to="/tasks/create"
          className="inline-flex items-center justify-center w-56 h-14 text-white border-2 border-amber-400 bg-amber-600 rounded-3xl font-bold text-xl text-center hover:bg-amber-700 transition-all duration-200"
        >
          Crea una nueva tarea
        </Link>

        <button
          onClick={() => becomeAdmin()}
          disabled={adminLoading}
          className={`inline-flex items-center justify-center w-56 h-14 text-white border-2 border-amber-400 bg-amber-600 rounded-3xl font-bold text-xl text-center hover:bg-amber-700 transition-all duration-200 ${adminLoading ? "opacity-70 cursor-not-allowed" : ""
            }`}
        >
          {adminLoading ? "Procesando..." : "Conviértete en Admin"}
        </button>
      </div>

      {tasks.length ? (
        <ul className="flex flex-col">
          {tasks.map((task: Task) => (
            <li key={task._id}>
              <Link to={`/tasks/${task._id}`}>
                <TaskCard task={task} />
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <h2 className="text-5xl font-black text-center">
          No hay tareas, ¡comienza creando una!
        </h2>
      )}
    </div>
  );
}
