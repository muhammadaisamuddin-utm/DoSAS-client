import "./App.css";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import ViewApplicationDetails from "./pages/ViewApplicationDetails";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { RequireAuth } from "./RequireAuth";
import SubmitApplicationForm from "./pages/SubmitApplicationForm";
import UpdateApplicationForm from "./pages/UpdateApplicationForm";
import { AuthProvider } from "./authContext";
import LandingPage from "./pages/LandingPage";
import ManageApplicationDetails from "./pages/ManageApplicationDetails";
import { applicationsLoader } from "./lib/loader";
import { createContext, useState } from "react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/home",
    loader: applicationsLoader,
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
    element: (
      <RequireAuth>
        <ResetPassword isFirstTime />
      </RequireAuth>
    ),
  },
  {
    path: "/password-reset/:token",
    element: <ResetPassword />,
  },
  {
    path: "/application",
    loader: applicationsLoader,
    children: [
      {
        // new application (student only)
        path: "submit",
        element: (
          <RequireAuth>
            <SubmitApplicationForm />
          </RequireAuth>
        ),
      },
      {
        // view application (different in roles)
        path: ":id",
        loader: applicationsLoader,
        element: (
          <RequireAuth>
            <ViewApplicationDetails />
          </RequireAuth>
        ),
      },
      {
        // update application (student only)
        path: ":id/update",
        loader: applicationsLoader,
        element: (
          <RequireAuth>
            <UpdateApplicationForm />
          </RequireAuth>
        ),
      },
      {
        path: ":id/manage",
        loader: applicationsLoader,
        element: (
          <RequireAuth>
            <ManageApplicationDetails />
          </RequireAuth>
        ),
      },
    ],
  },
]);

type SystemContextType = {
  systemInfo: {
    currentSemester: string;
    semesterExpiration: string;
  };
  setSystemInfo: React.Dispatch<React.SetStateAction<{
    currentSemester: string;
    semesterExpiration: string;
  }>>;
};

export const SystemContext = createContext<SystemContextType | null>(null);

function App() {
  const [systemInfo, setSystemInfo] = useState({
    currentSemester: "",
    semesterExpiration: "",
  });

  return (
    <SystemContext.Provider value={{
      systemInfo,
      setSystemInfo,
    }}>
      <AuthProvider>
        <RouterProvider
          router={router}
          fallbackElement={<p>Initial Load...</p>}
        />
      </AuthProvider>
    </SystemContext.Provider>
  );
}

export default App;
