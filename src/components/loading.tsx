import loading from "../assets/1487.gif";

export function Loading() {
  return (
    <div className="absolute h-20 w-20 top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
      <img
        className=""
        alt="loading"
        src={loading}
      />
    </div>
  );
}
