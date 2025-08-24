import { Link } from "react-router-dom";

export default function RegisterView() {
  const initialValues = {
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  };

  console.log(initialValues);

  return (
    <>
      <h1 className="text-5xl font-black text-white">Crear Cuenta</h1>
      <p className="text-2xl font-light text-white mt-5">
        Llena el formulario para{" "}
        <span className="text-fuchsia-500 font-bold">crear tu cuenta</span>
      </p>

      <form className="space-y-8 p-10 bg-white mt-10" noValidate>
        {/* Email */}
        <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="w-full p-3 border-gray-300 border"
          />
        </div>

        {/* Nombre */}
        <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl" htmlFor="name">
            Nombre
          </label>
          <input
            id="name"
            type="text"
            placeholder="Nombre de Registro"
            className="w-full p-3 border-gray-300 border"
          />
        </div>

        {/* Password */}
        <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password de Registro"
            className="w-full p-3 border-gray-300 border"
          />
        </div>

        {/* Repetir Password */}
        <div className="flex flex-col gap-5">
          <label
            className="font-normal text-2xl"
            htmlFor="password_confirmation"
          >
            Repetir Password
          </label>
          <input
            id="password_confirmation"
            type="password"
            placeholder="Repite Password de Registro"
            className="w-full p-3 border-gray-300 border"
          />
        </div>

        <input
          type="submit"
          value="Registrarme"
          className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white font-black text-xl cursor-pointer"
        />
      </form>

      <nav className="mt-10 flex flex-col space-y-4">
        <Link
          to={"/auth/login"}
          className="text-center text-gray-300 font-normal"
        >
          ¿Ya tienes cuenta? Iniciar Sesión
        </Link>
      </nav>
    </>
  );
}
