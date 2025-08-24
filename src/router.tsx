import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./layouts/NotFound";
import AuthLayout from "./layouts/AuthLayout";
import LoginView from "./pages/auth/LoginView";
import RegisterView from "./pages/auth/RegisterView";
import AppLayout from "./layouts/AppLayout";
import DashboardView from "./pages/tasks/DashboardView";
import UpdateTask from "./pages/tasks/UpdateTask";
import SpecificTask from "./pages/tasks/SpecificTask";
import CreateTask from "./pages/tasks/CreateTask";


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
        <Route element={<AppLayout />}>
          <Route path='/' element={<DashboardView />} index />
          <Route path='/tasks/create' element={<CreateTask />} index />
          <Route path='/tasks/update/:taskId' element={<UpdateTask />} index />
          <Route path='/tasks/:taskId' element={<SpecificTask />} index />
        </Route>

        {/* Ruta por defecto cuando no coincide ninguna */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

