// Documentation: https://reactrouter.com/en/main/routers/create-browser-router
import { createBrowserRouter } from "react-router-dom";

import Dashboard from "../views/dashboard";
// ... add more imports here

const router = createBrowserRouter([
    {
      path: "/",
      element: <Dashboard />
    },
    // (... add more routers)
])  

export default router;  