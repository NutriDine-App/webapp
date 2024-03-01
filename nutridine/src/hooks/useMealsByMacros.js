import { useState, useEffect } from "react";
import axios from "axios";

// DOCS: https://docx.syndigo.com/developers/docs/instant-endpoint
/** All parameters of type number (except "query", which is a string). Assumed units for all macros are grams */
const useMealsByMacros = ({
  query,
  minCalories,
  maxCalories,
  minProtein,
  maxProtein,
  minCarbs,
  maxCarbs,
  minFat,
  maxFat,
}) => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiKey = process.env.REACT_APP_NUTRITIONIX_API_KEY;
    const appId = process.env.REACT_APP_NUTRITIONIX_APP_ID;

    const fetchData = async () => {
      try {
        // Requires a POST request to filter by calories.
        // Cannot inject variables in json field (for nutritionIX food ids)
        // If you omit the query, nutritionIX rejects the request.
        let response = await axios.post(
          "https://trackapi.nutritionix.com/v2/search/instant",
          {
            query: query,
            detailed: true,
            common: false,
            full_nutrients: {
              208: {
                lte: maxCalories,
                gte: minCalories,
              },
              203: {
                lte: maxProtein,
                gte: minProtein,
              },
              204: {
                lte: maxFat,
                gte: minFat,
              },
              205: {
                lte: maxCarbs,
                gte: minCarbs,
              },
            },
          },

          {
            headers: {
              "Content-Type": "application/json",
              "x-app-id": appId,
              "x-app-key": apiKey,
            },
          }
        );

        setMeals(response.data.branded);
        setError(null);
        setLoading(false);
      } catch (error) {
        console.log("caught an error:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [
    query,
    minCalories,
    maxCalories,
    minProtein,
    maxProtein,
    minCarbs,
    maxCarbs,
    minFat,
    maxFat,
  ]);

  return { meals, loading, error };
};

export default useMealsByMacros;
