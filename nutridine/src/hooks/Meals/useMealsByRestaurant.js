import { useState, useEffect, } from "react";
import axios from "axios";
import mockMeals from "../../constants/mockData/meals";

const useMealsByRestaurant = (selectedRestaurant) => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Fetching meals for:", selectedRestaurant);
    // Directly check if selectedRestaurant is null or if brandId/name are missing
    if (!selectedRestaurant || !selectedRestaurant.brandId || !selectedRestaurant.name) {
      setLoading(false);
      setMeals([]); 
      return;
    }

    const { brandId, name } = selectedRestaurant;

    const fetchMeals = async () => {
      setLoading(true);
      setError(null);
      try {
        // If in testing mode, use mock data
        const IS_TESTING = process.env.REACT_APP_DEVELOPMENT_MODE !== "false";
        if (IS_TESTING) {
          setMeals(mockMeals.filter((meal) => meal.nix_brand_id === brandId));
          setLoading(false);
        } else {
          const apiKey = process.env.REACT_APP_NUTRITIONIX_API_KEY;
          const appId = process.env.REACT_APP_NUTRITIONIX_APP_ID;
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
          setLoading(false);
        }
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchMeals();
  }, [selectedRestaurant]);

  return { meals, loading, error };
};

export default useMealsByRestaurant;
