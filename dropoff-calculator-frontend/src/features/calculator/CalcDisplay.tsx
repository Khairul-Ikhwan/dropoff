import { usePriceStore } from "../../utils/priceStore";

interface CalcDisplayProps {
  setCalculated: (value: boolean) => void;
}

function CalcDisplay({ setCalculated }: CalcDisplayProps) {
  const price = usePriceStore((state) => state.price);
  const origins = usePriceStore((state) => state.origins);
  const destinations = usePriceStore((state) => state.destinations);
  const distance = usePriceStore((state) => state.distance);

  const handleTelegramGroup = () => {
    window.open("https://t.me/dropoffsg", "_blank"); // Open external link in a new tab
  };

  return (
    <div className="flex flex-col items-start w-full gap-3">
      <h2 className="text-2xl font-semibold">Calculated Details</h2>
      <div className="flex flex-col gap-1">
        <p>Recommended Price: ${price.toFixed(2)}</p>
        <p>Pick Up: {origins.join(", ")}</p>
        <p>Drop Off: {destinations.join(", ")}</p>
        <p>Distance: {distance.toFixed(2)} km</p>
      </div>

      <p className="text-xs italic font-semibold opacity-45 text-pretty">
        The amount is calculated closely based on Lalamove's prices for the car
        and motorcycle modes. This calculator is intended to provide an estimate
        of the price, and in no way can be enforced by any party.
      </p>

      <button
        className="w-full border border-white/25 hover:bg-white hover:border-white-600 hover:text-black hover:border-2 bg-sky-600"
        onClick={handleTelegramGroup}
      >
        <span className="flex items-center justify-center w-full gap-3">
          <img src="/assets/telegram.png" className="w-8" />
          Click here to provide feedback
        </span>
      </button>
      <button
        className="w-full border border-white/25 hover:bg-white hover:border-sky-600 hover:text-black hover:border-2 bg-emerald-600"
        onClick={() => setCalculated(false)}
      >
        Go Back
      </button>
    </div>
  );
}

export default CalcDisplay;
