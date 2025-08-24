import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./layouts/NotFound";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./components/Login";
import CreateAccount from "./components/CreateAccount";
import MainLayout from "./layouts/MainLayout";
import LoginView from "./pages/auth/LoginView";
import RegisterView from "./pages/auth/RegisterView";


export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas auth */}
        <Route element={<AuthLayout />}>
          <Route path='/auth/login' element={<LoginView />} index />
          <Route path='/auth/register' element={<RegisterView />} index />
        </Route>

        {/* Rutas tasks */}
        <Route element={<MainLayout />}>
          <Route path='/tasks' element={<Login />} index />
          <Route path='/tasks/create' element={<CreateAccount />} index />
        </Route>

        {/* Ruta por defecto cuando no coincide ninguna */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

