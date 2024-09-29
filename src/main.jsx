import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Front from './components/frontpage/front.jsx'
import Found from './components/foundpage/found.jsx'
import Lost from './components/lostpage/Lost.jsx'
import FoundItems from './components/foundItems/fItems.jsx'
import LostItems from './components/lostItems/lItems.jsx'
import Layout from './components/PageLayout.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Front />,
      },
      {
        path: "found",
        element: <Found />,
      },
      {
        path: "lost",
        element: <Lost />,
      },
      {
        path: "foundItems",
        element: <FoundItems />,
      },
      {
        path: "lostItems",
        element: <LostItems />,
      },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
