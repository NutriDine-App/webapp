import { useState, useEffect } from "react";
import axios from "axios";
import mockMeals from "../../constants/mockData/meals";

const useMealsByRestaurant = ({ brandId, name }) => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiKey = process.env.REACT_APP_NUTRITIONIX_API_KEY;
    const appId = process.env.REACT_APP_NUTRITIONIX_APP_ID;
    const IS_TESTING = process.env.REACT_APP_DEVELOPMENT_MODE !== "false";

    const fetchMeals = async () => {
      if (IS_TESTING) {
        setMeals(mockMeals.filter((meal) => meal.nix_brand_id === brandId));
        setLoading(false);
        return;
      }
      try {
        const response = await axios.post(
          `https://trackapi.nutritionix.com/v2/search/instant`,
          {
            query: name,
            brand_ids: [brandId],
            detailed: true,
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
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (brandId && name) {
      fetchMeals();
    }
  }, [brandId, name]);

  return { meals, loading, error };
};

export default useMealsByRestaurant;
