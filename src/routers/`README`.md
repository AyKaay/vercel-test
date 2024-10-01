Folder ini untuk file router untuk atur routing dari satu page ke page lain
dokumentasi: https://reactrouter.com/en/main/routers/create-browser-router
contoh untuk isi router.jsx:

import Homepage from "../views/Homepage";
import Register from "../views/Register";
import Register from "../views/Login";
... (tambah sendiri)

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />
  },
  {
    path: "/register",
    element: <register />,
  },
  {
    path: "/login",
    element: <login />,
  },
  {
    ... (tambah sendiri)
  },
])