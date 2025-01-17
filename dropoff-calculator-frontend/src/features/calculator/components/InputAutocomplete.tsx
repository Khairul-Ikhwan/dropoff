import { useState, useEffect } from "react";
import { apiURL } from "../../../utils/consts";

function InputAutocomplete() {
  const [inputValue, setInputValue] = useState("");
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
          console.log(data);
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
    <div className="p-2 outline">
      <input
        className="w-full p-2 rounded-lg min-w-64"
        placeholder="eg. 550 Ang Mo Kio Ave 10, Singapore 569655"
        value={inputValue}
        onChange={handleInput}
      />
      {!loading && showAutocompleteResults && (
        <>
          <ul className="fixed flex flex-col w-64 h-32 mt-2 overflow-y-auto divide-y-2 bg-slate-400">
            {autocompleteResults.map((result, index) => (
              <li
                key={index}
                className="p-2 text-sm hover:bg-gray-200 hover:text-black hover:cursor-pointer"
                onClick={() => {
                  setInputValue(result.description);
                  setShowAutocompleteResults(false);
                  setDebouncedValue("");
                  setUserSelected(true);
                }}
              >
                {result.description}
              </li>
            ))}
          </ul>
          {showAutocompleteResults && error && (
            <p className="text-sm opacity-35">{error}</p>
          )}
        </>
      )}
    </div>
  );
}

export default InputAutocomplete;
