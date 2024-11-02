import { useState, useEffect } from 'react';

const useRestaurants = (latitude, longitude, radius = 10000, limit = 50) => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      setLoading(true);
      setError(null);
      const apiKey = process.env.REACT_APP_GEOAPIFY_AUTH_KEY;
      try {
        const response = await fetch(`https://api.geoapify.com/v2/places?categories=catering.restaurant&filter=circle:${longitude},${latitude},${radius}&bias=proximity:${longitude},${latitude}&limit=${limit}&apiKey=${apiKey}`);
        const data = await response.json();

        const filteredRestaurants = data.features.map(feature => ({
          name: feature.properties.name,
          lat: feature.geometry.coordinates[1],
          lon: feature.geometry.coordinates[0],
        }));

        setRestaurants(filteredRestaurants);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, [latitude, longitude, radius]);

  return { restaurants, loading, error };
};

export default useRestaurants;
