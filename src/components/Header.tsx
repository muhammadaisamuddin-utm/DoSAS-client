function Header({ username }: { username: string }) {
  return (
    <header className="flex justify-between border-solid border-y-2 border-y-gray-400 w-full py-5">
      <h1 className="px-3">DoSAS</h1>
      <div className="flex">
        <div className="flex px-3">
          <div>Hello {username}</div>
          <span className="pl-1 text-gray-400">(Student)</span>
        </div>
        <div className="px-3 cursor-pointer">Logout</div>
      </div>
    </header>
  );
}

export default Header;
