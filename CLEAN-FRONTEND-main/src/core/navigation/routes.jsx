import { createBrowserRouter } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { JutsuViewModel } from "../../features/Jutsu/presentation/viewmodels/JutsuViewModel";
import JutsuForm from "../../features/Jutsu/presentation/pages/JutsuForm";
import { ShinobiViewModel } from "../../features/Shinobi/presentation/viewmodels/ShinobiViewModel";
import ShinobiForm from "../../features/Shinobi/presentation/pages/ShinobiForm";

// Crear instancias de los ViewModels
const shinobiViewModel = new ShinobiViewModel();
const jutsuViewModel = new JutsuViewModel();

// Configuración de rutas
export const routes = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/shinobi-form" replace />,
    },
    {
        path: "/jutsu-form",
        element: <JutsuForm viewModel={jutsuViewModel} />,
    },
    {
        path: "/shinobi-form",
        element: <ShinobiForm viewModel={shinobiViewModel} />,
    },
]);