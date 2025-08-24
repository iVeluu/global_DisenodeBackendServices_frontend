import { authenticateUser } from "@/api/AuthAPI";
import type { UserLoginForm } from "@/types/index";
import { Link } from "react-router-dom";

export default function LoginView() {

  const initialValues: UserLoginForm = {
    email: '',
    password: '',
  }

  const handleSubmit = () => {
    authenticateUser(initialValues)
  }

  console.log(initialValues)

  return (
    <>

      <h1 className="text-5xl font-black text-white">Iniciar Sesión</h1>
      <p className="text-2xl font-light text-white mt-5">
        Comienza a crear tus tareas <br/>
        <span className=" text-fuchsia-500 font-bold"> Iniciando sesión en este formulario</span>
      </p>


      <form
        onSubmit={handleSubmit}
        className="space-y-8 p-10 bg-white rounded-xl mt-10"
        noValidate
      >
        <div className="flex flex-col gap-5">
          <label
            className="font-normal text-2xl"
          >Email</label>

          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="w-full p-3  border-gray-300 border"
          />
        </div>

        <div className="flex flex-col gap-5">
          <label
            className="font-normal text-2xl"
          >Password</label>

          <input
            type="password"
            placeholder="Password de Registro"
            className="w-full p-3  border-gray-300 border"
          />
        </div>

        <input
          type="submit"
          value='Iniciar Sesión'
          className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
        />
      </form>

      <nav className="mt-10 flex flex-col space-y-4">
        <Link
          to={'/auth/register'}
          className="text-center text-gray-300 font-normal"
        >¿No tienes cuenta? Crear una </Link>
      </nav>
    </>
  )
}