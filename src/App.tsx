//TODO : ADD BILL MODAL AND FUNCTIONS in CustomerTable.tsx file to generate Bill
//TODO : Add Redux toolkit to the app
//TODO : Specify routes properly in the app
//---------Backend------------------------
//TODO : Build Authentication

import { createBrowserRouter, RouterProvider } from "react-router"
import Home from "./pages/Home"
import AppLayout from "./pages/AppLayout"
import AddCategory from "./pages/AddCategory"

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: "/add_category",
          element: <AddCategory />
        },
      ]
    }
  ])

  return <RouterProvider router={router} />
}

export default App
