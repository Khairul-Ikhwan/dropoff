import {
  GOOGLE_MAPS_API_KEY,
  GOOGLE_MAPS_JAVASCRIPT_API_KEY,
} from "../../utils/consts.js";
import axios from "axios";

export const calcDistance = async (req, res) => {
  const { destinations } = req.body;

  // Sort destinations by locationIndex
  destinations.sort((a, b) => a.locationIndex - b.locationIndex); // To make sure that the order is correct

  const totalLocations = destinations.length;
  try {
    let totalDistance = 0;
    let uniqueLocations = new Map(); // Use a Map to store indexed locations

    for (let i = 0; i < totalLocations - 1; i++) {
      const data = await fetch(
        `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${
          destinations[i].address
        }&destinations=${
          destinations[i + 1].address
        }&key=${GOOGLE_MAPS_API_KEY}&region=sg`
      );
      const response = await data.json();

      // Add origin and destination to the map with their indices
      if (!uniqueLocations.has(response.origin_addresses[0])) {
        uniqueLocations.set(response.origin_addresses[0], uniqueLocations.size);
      }
      if (!uniqueLocations.has(response.destination_addresses[0])) {
        uniqueLocations.set(
          response.destination_addresses[0],
          uniqueLocations.size
        );
      }

      totalDistance += response.rows[0].elements[0].distance.value / 1000;
    }

    return res.status(200).json({
      totalLocations: totalLocations,
      dist: totalDistance,
      allDestinations: Array.from(uniqueLocations.entries()).map(
        ([location, index]) => ({ location, locationIndex: index })
      ), // Convert map to array of objects with location and index
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
