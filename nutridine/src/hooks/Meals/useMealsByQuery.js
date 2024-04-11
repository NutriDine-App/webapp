import { useState, useEffect } from "react";
import axios from "axios";
import brandIds from "../../constants/brandIds";
import mockMeals from "../../constants/mockData/meals";
import { set } from "lodash";

export const useMealsByQuery = (query) => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const apiKey = process.env.REACT_APP_NUTRITIONIX_API_KEY;
      const appId = process.env.REACT_APP_NUTRITIONIX_APP_ID;

      // Switch between mock data in development and API call in production
      const IS_TESTING = process.env.REACT_APP_DEVELOPMENT_MODE !== "false";

      if (IS_TESTING) {
        // Use mock data in development
        setMeals(mockMeals);
        setError(null);
        setLoading(false);
      } else {
        try {
          console.log("Fetching data with query:", query);
          const response = await axios.post(
            "https://trackapi.nutritionix.com/v2/search/instant",
            {
              query: !query ? Object.keys(brandIds).join(" ") : query,
              brand_ids: Object.values(brandIds),
              detailed: true,
              common: false,
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
        } catch (error) {
          console.error("Caught an error during fetch:", error);
          setError(error);
          setMeals([]);
        } finally {
          setLoading(false);
        }
      }
    };

    setLoading(true);
    fetchData();
  }, [query]);

  return { meals, loading, error };
};

export default useMealsByQuery;
