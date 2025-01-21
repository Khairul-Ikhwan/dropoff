import {
  GOOGLE_MAPS_API_KEY,
  GOOGLE_MAPS_JAVASCRIPT_API_KEY,
} from "../../utils/consts.js";
import axios from "axios";

const calculatePrice = (distance, jobType) => {
  const priceList = {
    bike: {
      base: 9, // under 1km
      first10Km: 0.3, // 1-10km
      perKm: 0.4, // subsequent km
      platformFee: 0.5,
      additionalStop: 3,
    },
    car: {
      base: 12, // under 1km
      first3Km: 1, // 1-3km
      perKm: 0.45, // subsequent km
      platformFee: 0.5,
      additionalStop: 5,
    },
    van: {
      base: 19,
      perKm: 0.5,
      platformFee: 0.5,
      additionalStop: 6,
    },
  };

  const rates = priceList[jobType];
  if (!rates) {
    throw new Error("Invalid job type");
  }

  let price = rates.base;

  if (jobType === "bike") {
    if (distance > 1 && distance <= 10) {
      price += (distance - 1) * rates.first10Km;
    } else if (distance > 10) {
      price += 9 * rates.first10Km + (distance - 10) * rates.perKm;
    }
  } else if (jobType === "car") {
    if (distance > 1 && distance <= 3) {
      price += (distance - 1) * rates.first3Km;
    } else if (distance > 3) {
      price += 2 * rates.first3Km + (distance - 3) * rates.perKm;
    }
  } else if (jobType === "van") {
    price += distance * rates.perKm;
  }

  price += rates.platformFee;

  // Round to 1 decimal point
  return Math.round(((price * 10) / 10) * 0.83);
};

export const calculateDistance = async (req, res) => {
  try {
    const { origin, destination, jobType } = req.body;

    // Validate input
    if (!origin || !destination || !jobType) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Fetch distance from Google Maps API
    const data = await fetch(
      `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${origin}&destinations=${destination}&key=${GOOGLE_MAPS_API_KEY}&region=sg`
    );
    const response = await data.json();

    if (response.status === "OK") {
      const distance = response.rows[0].elements[0].distance.value / 1000; // Convert meters to km
      const price = calculatePrice(distance, jobType);

      return res.status(200).json({
        origins: response.origin_addresses[0],
        destinations: response.destination_addresses[0],
        distance: response.rows[0].elements[0].distance.value / 1000,
        price,
      });
    } else {
      return res
        .status(500)
        .json({ error: "Failed to fetch distance from Google Maps API" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const placeAutoComplete = async (req, res) => {
  const { input } = req.body;

  if (!input) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // Check if the input is a postal code (6 digits for Singapore)
    const isPostalCode = /^[0-9]{6}$/.test(input);

    if (isPostalCode) {
      // Step 1: Geocode the postal code to get coordinates
      const geoResponse = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json`,
        {
          params: {
            address: input,
            key: GOOGLE_MAPS_API_KEY,
            region: "sg", // Limit results to Singapore
          },
        }
      );

      const geoResults = geoResponse.data.results;

      if (geoResults.length > 0) {
        const location = geoResults[0].geometry.location;

        // Step 2: Reverse geocode the coordinates to get detailed address
        const reverseResponse = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json`,
          {
            params: {
              latlng: `${location.lat},${location.lng}`,
              key: GOOGLE_MAPS_API_KEY,
              region: "sg",
            },
          }
        );

        const reverseResults = reverseResponse.data.results;

        if (reverseResults.length > 0) {
          return res.status(200).json({
            type: "postal_code",
            postalCode: input,
            address: reverseResults[0].formatted_address,
            location,
          });
        } else {
          return res
            .status(404)
            .json({ error: "Reverse geocoding failed for the postal code" });
        }
      } else {
        return res.status(404).json({ error: "Invalid postal code" });
      }
    }

    // Fallback: Query Place Autocomplete API for non-postal code inputs
    const autoResponse = await axios.get(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json`,
      {
        params: {
          input,
          key: GOOGLE_MAPS_JAVASCRIPT_API_KEY,
          region: "sg",
          types: "address",
          components: "country:sg",
        },
      }
    );

    const predictions = autoResponse.data.predictions.map((prediction) => ({
      description: prediction.description,
      placeId: prediction.place_id,
    }));

    res.status(200).json({
      type: "autocomplete",
      predictions,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
