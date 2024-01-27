import { Button } from "@/components/ui/button";
import { Navigate, useNavigate } from "react-router-dom";
import hellostudy from "../assets/hellostudy.jpg";
import { useAuth } from "@/authContext";

function LandingPage() {
  const navigate = useNavigate();
  const { user, token } = useAuth();

  // let location = useLocation();

  if (token && user) {
    // return <Navigate to="/home" state={{ from: location }} replace />;
    return <Navigate to="/home" />;
  }

  return (
    <main className="flex w-screen h-screen content-center justify-center items-center">
      <img className="mx-5" src={hellostudy} alt="Hello there" />
      <div className="flex flex-col items-center space-y-5">
        <div className="font-bold text-4xl text-center">
          Welcome to the Deferment of Study Application System (DOSAS)
        </div>
        <div>Click on the following login button to sign in to the system.</div>
        <Button
          className="text-2xl px-10 py-5"
          onClick={() => navigate("/login")}
        >
          Login
        </Button>
      </div>
    </main>
  );
}

export default LandingPage;
