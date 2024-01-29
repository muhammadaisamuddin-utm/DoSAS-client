import { useAuth } from "@/authContext";
import { GraduationCap } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface HeaderProps {
  username?: string;
  role?: string;
}

function Header({ username, role }: Readonly<HeaderProps>) {
  const auth = useAuth();

  function onSubmit() {
    auth.logout?.();
  }

  return (
    <header className="flex justify-between items-center border-solid border-b-2 border-y-gray-400 w-full py-5">
      <div className="flex items-center">
        <GraduationCap className="ml-2 h-8 w-8" />
        <h1 className="ml-3 font-bold text-3xl">DOSAS</h1>
      </div>
      <div className="flex items-center">
        <div className="flex px-3">
          <div>Hello {username}</div>
          <span className="ml-3 text-gray-500">({role})</span>
        </div>
        <AlertDialog>
          <AlertDialogTrigger>
            <span className="text-md no-underline font-bold mx-2">
              Log Out
            </span>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                You will be logging out of this session.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => onSubmit()}>
                Log Out
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </header>
  );
}

export default Header;
