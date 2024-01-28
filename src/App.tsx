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
import { AuthProvider } from "./authContext";
// import ViewApplicationByOfficeAssistant from "./pages/ViewApplicationByOfficeAssistant";
import LandingPage from "./pages/LandingPage";
import ManageApplicationDetails from "./pages/ManageApplicationDetails";
// import ManageApplicationByOfficeAssistant from "./pages/ManageApplicationByOfficeAssistant";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/home",
    loader: applicationLoader,
    element: (
      <RequireAuth>
        <Dashboard />
      </RequireAuth>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/login/accountrecovery",
    element: <ForgotPassword />,
  },
  {
    path: "/password-reset/first-time",
    element: <ResetPassword isFirstTime/>,
  },
  {
    path: "/password-reset/:token",
    element: <ResetPassword />,
  },
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
        loader: applicationLoader,
        element: <ViewApplicationDetails />,
      },
      {
        // update application (student only)
        path: ":id/update",
        loader: applicationLoader,
        element: <UpdateApplicationForm />,
      },
      {
        path: ":id/manage",
        loader: applicationLoader,
        element: <ManageApplicationDetails />,
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
