import { useState, useEffect } from "react";
import axios from "axios";

// To be used in the event that the Nutritionix API is not available (or we have exceeded rate limit)
const placeholderDetailedMeal = {
  food_name: "Placeholder Meal Name",
  brand_name: "Placeholder Brand Name",
  serving_qty: 1,
  serving_unit: "bottle",
  serving_weight_grams: 226,
  nf_metric_qty: 591,
  nf_metric_uom: "ml",
  nf_calories: 348,
  nf_total_fat: 2,
  nf_saturated_fat: null,
  nf_cholesterol: null,
  nf_sodium: 70,
  nf_total_carbohydrate: 39,
  nf_dietary_fiber: null,
  nf_sugars: null,
  nf_protein: 0,
  nf_potassium: null,
  nf_p: null,
  full_nutrients: [
    {
      attr_id: 203,
      value: 1,
    },
    {
      attr_id: 204,
      value: 2,
    },
    {
      attr_id: 205,
      value: 3,
    },
    {
      attr_id: 208,
      value: 4,
    },
    {
      attr_id: 307,
      value: 70,
    },
  ],
  nix_brand_name: "Coke",
  nix_brand_id: "51db3801176fe9790a89ae0b",
  nix_item_name: "Diet Cola",
  nix_item_id: "51d2fae7cc9bff111580d8d8",
  metadata: {},
  source: 8,
  ndb_no: null,
  tags: null,
  alt_measures: null,
  lat: null,
  lng: null,
  photo: {
    thumb:
      "https://nutritionix-api.s3.amazonaws.com/5b5c17c429f162275dc922b0.jpeg",
    highres: null,
    is_user_uploaded: false,
  },
  note: null,
  class_code: null,
  brick_code: null,
  tag_id: null,
  updated_at: "2022-06-22T03:14:26+00:00",
  nf_ingredient_statement:
    "Carbonated Water, Caramel Color, Aspartame, Phosphoric Acid, Potassium Benzoate (to Protect Taste), Natural Flavors, Citric Acid, Caffeine.",
};

const useMealById = ({ nix_item_id }) => {
  const [detailedMeal, setDetailedMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* NutritionIX gives us very limited /search/item endpoint calls. To prevent wasting
  API calls, set IS_TESTING=true while in dev mode to skip the api call and use 
  the placeholder data (which is the same structure)*/
  const IS_TESTING = true;

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
              "x-remote-user-id": 0,
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
      setDetailedMeal(placeholderDetailedMeal);
      setLoading(false);
      setError(false);
    } else {
      fetchData();
    }
  }, [nix_item_id, IS_TESTING]);

  return { detailedMeal, loading, error };
};

export default useMealById;
