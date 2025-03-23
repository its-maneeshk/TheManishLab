import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Login from './components/Login'
import SignUp from './components/SignUp'
import Welcome from './components/Welcome'
import Navbar from './components/global/Navbar'
import PrivateRoute from './components/PrivateRoute'
import NotFound from './components/NotFound'


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <PrivateRoute>
          <div>
            <Navbar />
            <Welcome />
          </div>
        </PrivateRoute>
      ),
      errorElement: <NotFound/>,
    },
    {
      path: "/login",
      element: (
        <div>
          <Login />
        </div>
      )
    },
    {
      path: "/signup",
      element: (
        <div>
          <SignUp />
        </div>
      )
    }
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App
