import "./App.css";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Dashboard, { applicationLoader } from "./pages/Dashboard";
import ViewApplicationDetails from "./pages/ViewApplicationDetails";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { RequireAuth } from "./RequireAuth";
import SubmitApplicationForm from "./pages/SubmitApplicationForm";
import UpdateApplicationForm from "./pages/UpdateApplicationForm";
import ViewApplicationByStudent from "./pages/ViewApplicationByStudent";
import ViewApplicationByOfficeAssistant from "./pages/ViewApplicationByOfficeAssistant";
import ViewApplicationBySigner from "./pages/ViewApplicationBySigner";
import { AuthProvider } from "./authContext";
import StudentDashboard from "./pages/StudentDashboard";
import OfficeAssistantDashboard from "./pages/OfficeAssistantDashboard";
import SignerDashboard from "./pages/SignerDashboard";
import { useEffect } from "react";
import axios from "axios";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/login/accountrecovery",
    element: <ForgotPassword />,
  },
  {
    path: "/resetpassword",
    element: <ResetPassword />,
  },
  {
    path: "/",
    loader: applicationLoader,
    element: (
      <RequireAuth>
        <Dashboard />
      </RequireAuth>
    ),
  },
  // {
  //   path: "/home",
  //   loader: applicationLoader,
  //   element: (
  //     // <RequireAuth>
  //     <Dashboard />
  //     // </RequireAuth>
  //   ),
  // },
  {
    path: "/application",
    loader: undefined,
    children: [
      {
        // new application (student only)
        path: "submit",
        element: <SubmitApplicationForm />,
      },
      {
        // view application (different in roles)
        path: ":id",
        element: <ViewApplicationDetails />,
      },
      {
        // update application (student only)
        path: ":id/update",
        element: <UpdateApplicationForm />,
      },
    ],
  },
  {
    path: "/test",
    loader: applicationLoader,
    element: <ViewApplicationByStudent />,
  },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider
        router={router}
        fallbackElement={<p>Initial Load...</p>}
      />
    </AuthProvider>
  );
}

export default App;
