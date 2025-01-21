import { usePriceStore } from "../../utils/priceStore.tsx";
import { useState } from "react";
import CalcDisplay from "./CalcDisplay";
import { apiURL } from "../../utils/consts.ts";
import InputAutocomplete from "./components/InputAutocomplete.tsx";

function CalcForm() {
  const [calculated, setCalculated] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formValues = {
      origin,
      destination,
      jobType: e.currentTarget.jobType.value, // Extract jobType from form
    };

    setError(null);

    try {
      const response = await fetch(`${apiURL}/calculate-distance/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });

      if (!response.ok) {
        setLoading(false);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      usePriceStore.getState().setAll(data);

      setLoading(false);
      setCalculated(true);
    } catch (error) {
      setLoading(false);
      setError("Something went wrong. Please try again later.");
      console.error(error);
    }
  };

  return (
    <div className="w-full p-8 sm:shadow-2xl sm:max-w-[40rem] sm:border sm:rounded-lg sm:border-white/55 sm:bg-slate-800 flex flex-col gap-4">
      <h2 className="text-2xl">Welcome to Dropoff!</h2>
      <span className="text-sm">
        <p>Fill in the details and we'll calculate it for you!</p>

        <p className="text-xs italic opacity-45 text-pretty">
          This calculator is intended to provide an estimate of the price, and
          in no way can be enforced by any party.
        </p>
      </span>

      {!calculated ? (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col items-start w-full gap-1">
            <label htmlFor="origin">Pickup Location:</label>
            <InputAutocomplete value={origin} onChange={setOrigin} />
          </div>

          <div className="flex flex-col items-start w-full gap-1">
            <label htmlFor="destination">Dropoff Location:</label>
            <InputAutocomplete value={destination} onChange={setDestination} />
          </div>

          <div className="flex flex-col items-start w-full gap-1">
            <label htmlFor="jobType">Job Type:</label>

            <div className="w-full px-2">
              <select
                className="w-full p-2 rounded-lg"
                name="jobType"
                id="jobType"
              >
                <option value="bike">Motorcycle</option>
                <option value="car">Car</option>
                <option value="van">Van</option>
              </select>
            </div>
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            className="border border-white/25 hover:bg-white hover:border-sky-600 hover:text-black hover:border-2 bg-emerald-600"
            type="submit"
            disabled={loading}
          >
            {loading ? "Checking Price..." : "Submit"}
          </button>
        </form>
      ) : (
        <CalcDisplay
          setCalculated={(value: boolean) => {
            setCalculated(value);
            setOrigin(""); // Clear the input value for origin
            setDestination(""); // Clear the input value for destination
          }}
        />
      )}
    </div>
  );
}

export default CalcForm;
