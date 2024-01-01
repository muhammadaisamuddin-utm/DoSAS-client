function Countdown() {
  return (
    <div className="flex flex-wrap w-full my-4 justify-end">
      <span className="mr-2">Deferment period will end in: </span>

      <div className="countdown-container flex space-x-3 mx-2">
        <div className="countdown-item-container flex flex-col content-center">
          <span className="text-xl font-bold">3700</span>
          <span className="text-sm">days</span>
        </div>

        <div className="countdown-item-container flex flex-col content-center">
          <span className="text-xl font-bold">20</span>
          <span className="text-sm">hours</span>
        </div>

        <div className="countdown-item-container flex flex-col content-center">
          <span className="text-xl font-bold">30</span>
          <span className="text-sm">minutes</span>
        </div>

        <div className="countdown-item-container flex flex-col content-center">
          <span className="text-xl font-bold">50</span>
          <span className="text-sm">seconds</span>
        </div>
      </div>
    </div>
  );
}

export default Countdown;
