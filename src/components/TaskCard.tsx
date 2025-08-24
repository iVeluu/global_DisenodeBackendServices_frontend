import { Task } from "@/types/index";

type TaskCardProps = {
  task: Task
}

export default function TaskCard({ task }: TaskCardProps) {
  return (
    <section className="p-4">
      <div className="flex flex-col p-4 space-y-6 my-6 border-4 border-black rounded-xl shadow-lg shadow-gray-600 ">
        <p className="text-lg font-black text-indigo-600">
          Nombre de la tarea: {' '}
          <span className="text-md text-black font-bold">{task.name}</span>
        </p>
        <p className="text-lg font-black text-indigo-600">
          Descripcion de la tarea: {' '}
          <span className="text-md text-black font-bold">{task.description}</span>
        </p>

      </div>
    </section>
  )
}
