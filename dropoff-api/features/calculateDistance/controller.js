import {
  GOOGLE_MAPS_API_KEY,
  GOOGLE_MAPS_JAVASCRIPT_API_KEY,
} from "../../utils/consts.js";
import axios from "axios";

export const calcDistance = async (req, res) => {
  // Input validation
  const { destinations } = req.body;
  if (
    !destinations ||
    !Array.isArray(destinations) ||
    destinations.length < 2
  ) {
    return res
      .status(400)
      .json({ error: "At least two destinations are required" });
  }

  try {
    // Sort destinations by locationIndex
    const sortedDestinations = [...destinations].sort(
      (a, b) => a.locationIndex - b.locationIndex
    );

    let totalDistance = 0;
    const uniqueLocations = new Map();

    for (let i = 0; i < sortedDestinations.length - 1; i++) {
      const origin = encodeURIComponent(sortedDestinations[i].address);
      const destination = encodeURIComponent(sortedDestinations[i + 1].address);

      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric` +
          `&origins=${origin}&destinations=${destination}` +
          `&key=${GOOGLE_MAPS_API_KEY}&region=sg`
      );

      if (response.data.status !== "OK") {
        throw new Error(`Google API error: ${response.data.status}`);
      }

      const element = response.data.rows[0].elements[0];
      if (element.status !== "OK") {
        throw new Error(
          `Could not calculate distance between locations ${i} and ${i + 1}`
        );
      }

      // Track unique locations
      const originAddress = response.data.origin_addresses[0];
      const destAddress = response.data.destination_addresses[0];

      if (!uniqueLocations.has(originAddress)) {
        uniqueLocations.set(originAddress, uniqueLocations.size);
      }
      if (!uniqueLocations.has(destAddress)) {
        uniqueLocations.set(destAddress, uniqueLocations.size);
      }

      totalDistance += element.distance.value / 1000;
    }

    return res.status(200).json({
      totalLocations: destinations.length,
      dist: totalDistance,
      allDestinations: Array.from(uniqueLocations.entries()).map(
        ([location, index]) => ({ location, locationIndex: index })
      ),
    });
  } catch (error) {
    console.error("Distance calculation error:", error);
    return res.status(500).json({
      error: "Failed to calculate distances",
      details: error.message,
    });
  }
};
