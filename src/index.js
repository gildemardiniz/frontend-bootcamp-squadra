import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { SnackbarProvider } from 'notistack';
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Cadastro from './routes/Cadastro';
import Home from './routes/Home';
import ErrorPage from './routes/ErrorPage';
import Visualizar from './routes/Visualizar';
import Editar from './routes/Editar';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "cadastro",
        element: <Cadastro />
      },
      {
        path: "/:id",
        element: <Visualizar />
      },
      {
        path: "/editar/:id",
        element: <Editar/>
      }
    ]
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <SnackbarProvider
      icon={true}
      maxSnack={3}
      autoHideDuration={3000}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      <RouterProvider router={router} />
    </SnackbarProvider>
  </>
);