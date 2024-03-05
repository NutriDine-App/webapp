import { useState, useEffect } from "react";
import axios from "axios";
import mockDetailedMeal from "../constants/mockData/detailedMeal";

const useMealById = ({ nix_item_id }) => {
  const [detailedMeal, setDetailedMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* NutritionIX gives us very limited /search/item endpoint calls. To prevent wasting
  API calls, set IS_TESTING=true while in dev mode to skip the api call and use 
  the placeholder data (which is the same structure)*/

  /** Due to limited NutritionIX API calls, this will make our app consumer fake data
   * while in development mode. The production app wll use the actual API call. */
  const IS_TESTING = process.env.REACT_APP_DEVELOPMENT_MODE ?? true;

  useEffect(() => {
    const apiKey = process.env.REACT_APP_NUTRITIONIX_API_KEY;
    const appId = process.env.REACT_APP_NUTRITIONIX_APP_ID;

    const fetchData = async () => {
      console.log("useMealById is fetching...");
      try {
        const response = await axios.get(
          `https://trackapi.nutritionix.com/v2/search/item?nix_item_id=${nix_item_id}`,
          {
            headers: {
              "Content-Type": "application/json",
              "x-app-id": appId,
              "x-app-key": apiKey,
            },
          }
        );
        setDetailedMeal(response.data.foods[0]);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    if (IS_TESTING) {
      setDetailedMeal(mockDetailedMeal);
      setLoading(false);
      setError(false);
    } else {
      fetchData();
    }
  }, [nix_item_id, IS_TESTING]);

  return { detailedMeal, loading, error };
};

export default useMealById;
