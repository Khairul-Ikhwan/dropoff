import { usePriceStore } from "../utils/priceStore";

interface CalcDisplayProps {
  setCalculated: (value: boolean) => void;
}

function CalcDisplay({ setCalculated }: CalcDisplayProps) {
  const price = usePriceStore((state) => state.price);
  const origins = usePriceStore((state) => state.origins);
  const destinations = usePriceStore((state) => state.destinations);
  const distance = usePriceStore((state) => state.distance);

  const handleTelegramGroup = () => {
    window.location.href = "https://t.me/dropoffsg"; // Open external link
  };

  return (
    <div className="flex flex-col items-start w-full gap-3">
      <h2 className="text-2xl font-semibold">Calculated Details</h2>
      <p>Recommended Price: ${price.toFixed(2)}</p>
      <p>Pick Up: {origins.join(", ")}</p>
      <p>Drop Off: {destinations.join(", ")}</p>
      <p>Distance: {distance.toFixed(2)} km</p>

      <p className="text-xs italic opacity-30 text-pretty">
        The price displayed here is a recommendation. The amount is calculated
        closely based on Lalamove's prices for the car and motorcycle modes.
      </p>

      <button
        className="w-full border border-white/25 hover:bg-white hover:border-white-600 hover:text-black hover:border-2 bg-sky-600"
        onClick={handleTelegramGroup}
      >
        Join Our Telegram Group
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
