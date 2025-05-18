import { createBrowserRouter, RouterProvider } from "react-router"
import Home from "./pages/Home"

function App() {
  
  const router = createBrowserRouter([
    {
      path:"/",
      element:<Home/>
    }
  ])

  // return (
  //   <>
  //   <Navbar/>
  //   <div>Hello World</div>  
  //   </>
  // )

  return <RouterProvider router={router}/>
}

export default App
