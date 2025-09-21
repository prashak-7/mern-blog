import { useEffect, useState } from "react";

export const useFetch = (url, options = {}, dependencies = []) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const response = await fetch(url, options);
        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}, ${response.status}`);
        }
        setData(responseData);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, dependencies);

  return { data, isLoading, error };
};
