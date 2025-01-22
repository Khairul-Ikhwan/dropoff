import { useState, useEffect } from "react";
import { apiURL } from "../../../utils/consts";

function InputAutocomplete({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const [inputValue, setInputValue] = useState(value);
  const [debouncedValue, setDebouncedValue] = useState("");
  interface AutocompleteResult {
    description: string;
  }
  const [showAutocompleteResults, setShowAutocompleteResults] = useState(false);
  const [autocompleteResults, setAutocompleteResults] = useState<
    AutocompleteResult[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userSelected, setUserSelected] = useState(false);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setUserSelected(false);
    onChange(e.target.value); // Notify parent about input changes
  };

  useEffect(() => {
    if (userSelected) return;

    const timer = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [inputValue, userSelected]);

  useEffect(() => {
    if (debouncedValue) {
      setLoading(true);
      setError(null);

      const fetchAutocomplete = async () => {
        try {
          const response = await fetch(
            `${apiURL}/calculate-distance/complete-search`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ input: debouncedValue }),
            }
          );
          if (!response.ok) {
            throw new Error("Failed to fetch autocomplete data");
          }

          const data = await response.json();
          setAutocompleteResults(data.predictions || []);
          setShowAutocompleteResults(true);
        } catch (error) {
          setError((error as Error).message);
        } finally {
          setLoading(false);
        }
      };

      fetchAutocomplete();
    } else {
      setAutocompleteResults([]);
    }
  }, [debouncedValue]);

  return (
    <div className="relative w-full p-2">
      <input
        className="w-full p-2 rounded-lg min-w-64"
        placeholder="Search location"
        value={inputValue}
        onChange={handleInput}
      />
      {!loading &&
        showAutocompleteResults &&
        autocompleteResults.length > 0 && (
          <span>
            <ul
              className="absolute z-10 w-[96%] divide-y mx-auto mt-1 overflow-y-auto border border-gray-300 rounded shadow bg-slate-400 h-fit max-h-48 text-white"
              style={{ top: "100%" }}
            >
              {autocompleteResults.map((result, index) => (
                <li
                  key={index}
                  className="p-2 text-sm text-white cursor-pointer hover:bg-gray-200 hover:text-black"
                  onClick={() => {
                    setInputValue(result.description);
                    setShowAutocompleteResults(false);
                    setDebouncedValue("");
                    setUserSelected(true);
                    onChange(result.description); // Notify parent when a value is selected
                  }}
                >
                  {result.description}
                </li>
              ))}
            </ul>
            {showAutocompleteResults && error && (
              <p className="mt-2 text-sm text-red-500 ">{error}</p>
            )}
          </span>
        )}
    </div>
  );
}

export default InputAutocomplete;
