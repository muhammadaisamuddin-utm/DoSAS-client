import { GraduationCap } from "lucide-react";

interface HeaderProps {
  username: string;
  role: string;
}

function Header({ username, role }: Readonly<HeaderProps>) {
  return (
    <header className="flex justify-between items-center border-solid border-b-2 border-y-gray-400 w-full py-5">
      <div className="flex items-center">
        <GraduationCap className="ml-2 h-8 w-8" />
        <h1 className="ml-3 font-bold text-3xl">DOSAS</h1>
      </div>
      <div className="flex">
        <div className="flex px-3">
          <div>Hello {username}</div>
          <span className="ml-3 text-gray-500">({role})</span>
        </div>
        <div className="px-3 cursor-pointer">Logout</div>
      </div>
    </header>
  );
}

export default Header;
