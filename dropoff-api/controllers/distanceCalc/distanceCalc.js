import { GOOGLE_MAPS_API_KEY } from "../../utils/consts.js";

const calculatePrice = (distance, jobType) => {
  const priceList = {
    bike: {
      base: 9, // under 1km
      first10Km: 0.3, // 1-10km
      perKm: 0.4, // subsequent km
      platformFee: 0.5,
    },
    car: {
      base: 12, // under 1km
      first3Km: 1, // 1-3km
      perKm: 0.45, // subsequent km
      platformFee: 0.5,
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
      `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${origin}&destinations=${destination}&key=${GOOGLE_MAPS_API_KEY}`
    );
    const response = await data.json();

    if (response.status === "OK") {
      const distance = response.rows[0].elements[0].distance.value / 1000; // Convert meters to km
      const price = calculatePrice(distance, jobType);

      return res.status(200).json({
        startLocation: response.origin_addresses[0],
        endLocation: response.destination_addresses[0],
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
