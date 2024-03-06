import { useState, useEffect } from "react";
import axios from "axios";
import brandIds from "../constants/brandIds";

export const fetchMealsByMacros = async ({
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
  const apiKey = process.env.REACT_APP_NUTRITIONIX_API_KEY;
  const appId = process.env.REACT_APP_NUTRITIONIX_APP_ID;

  try {
    console.log("useMealsByMacros is fetching...");
    let response = await axios.post(
      "https://trackapi.nutritionix.com/v2/search/instant",
      {
        query: Object.keys(brandIds).join(" ") + " " + query,
        brand_ids: Object.values(brandIds),
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

    return { data: response.data.branded, error: null };
  } catch (error) {
    console.log("caught an error:", error);
    return { data: null, error: error };
  }
};

// Hook using the fetch function
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
    const fetchData = async () => {
      const { data, error } = await fetchMealsByMacros({
        query,
        minCalories,
        maxCalories,
        minProtein,
        maxProtein,
        minCarbs,
        maxCarbs,
        minFat,
        maxFat,
      });
      if (data) {
        setMeals(data);
        setError(null);
      } else {
        setError(error);
      }
      setLoading(false);
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
