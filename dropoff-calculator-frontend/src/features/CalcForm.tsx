import { usePriceStore } from "../utils/priceStore";
import { useState } from "react";
import CalcDisplay from "./CalcDisplay";

function CalcForm() {
  const [calculated, setCalculated] = useState(false);
  const [error, setError] = useState<string | null>(null); // State to hold error message

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    // Use FormData to extract form values
    const formData = new FormData(form);
    const formValues: { [key: string]: string } = {};
    formData.forEach((value, key) => {
      formValues[key] = value.toString();
    });

    // Clear any previous errors
    setError(null);

    try {
      const response = await fetch(
        "http://localhost:5050/calculate-distance/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formValues),
        }
      );

      if (!response.ok) {
        // Handle HTTP errors
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const validOrigins = Array.isArray(data.origins)
        ? data.origins
        : [data.origins];
      const validDestinations = Array.isArray(data.destinations)
        ? data.destinations
        : [data.destinations];
      const validDistance =
        typeof data.distance === "number" ? data.distance : 0;

      const { price, origins, destinations, distance } =
        usePriceStore.getState();
      if (
        price !== data.price ||
        JSON.stringify(origins) !== JSON.stringify(data.origins) ||
        JSON.stringify(destinations) !== JSON.stringify(data.destinations) ||
        distance !== data.distance
      ) {
        usePriceStore.getState().setAll({
          price: data.price,
          origins: validOrigins,
          destinations: validDestinations,
          distance: validDistance,
        });
      }

      console.log("Response JSON:", data);
      setCalculated(true); // Proceed to CalcDisplay on success
    } catch (error) {
      console.error("Error:", error);
      setError("Something went wrong. Please try again later."); // Set error message
      setTimeout(() => {
        setError(null);
      }, 2000); // Clear error message after 5 seconds
    }

    // Log form values to console
    console.log("Form Values:", formValues);
  };

  return (
    <div className="w-full p-8 sm:shadow-2xl sm:border sm:rounded-lg sm:border-white/55 sm:bg-slate-800">
      {!calculated ? (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-bold">Welcome to Dropoff!</h2>
            <p className="text-sm font-light opacity-80">
              Fill in the details and we'll calculate it for you!
            </p>
            <p className="text-xs italic font-light opacity-80">
              This calculator is intended to provide an estimate of the price,
              and in no way can be enforced by any party.
            </p>
          </div>

          <div className="flex flex-col items-start w-full gap-1">
            <label htmlFor="origin">Pickup Location:</label>
            <input
              type="text"
              id="origin"
              name="origin"
              className="w-full p-2 rounded-lg"
              placeholder="550 Ang Mo Kio Ave 10, Singapore 569655"
            />
          </div>

          <div className="flex flex-col items-start w-full gap-1">
            <label htmlFor="dropoff">Dropoff Location:</label>
            <input
              type="text"
              id="destination"
              name="destination"
              className="w-full p-2 rounded-lg"
              placeholder="55 Robinson Road, Singapore 068897"
            />
          </div>

          <div className="flex flex-col items-start w-full gap-1">
            <label htmlFor="dropoff">Job Type:</label>
            <select
              className="w-full p-2 rounded-lg"
              name="jobType"
              id="jobType"
            >
              <option value="bike">Motorcycle</option>
              <option value="car">Car</option>
            </select>
          </div>

          {/* Display error message if there's an error */}
          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            className="border border-white/25 hover:bg-white hover:border-sky-600 hover:text-black hover:border-2 bg-emerald-600"
            type="submit"
          >
            Submit
          </button>
        </form>
      ) : (
        <CalcDisplay setCalculated={setCalculated} />
      )}
    </div>
  );
}

export default CalcForm;
