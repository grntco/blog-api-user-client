import { useState } from "react";

const useMutation = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const mutate = async (url, method, data, options = {}) => {
    if (!url) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        body: JSON.stringify(data),
        ...options,
      });

      console.log(response);

      if (!response.ok) {
        throw new Error(
          `HTTP Error: ${response.status}: ${response.statusText}`
        );
      }

      const result = await response.json();

      console.log(result);

      if (!result.success) {
        throw new Error(data.message || "Failed to mutate data.");
      }

      return result.data;
    } catch (err) {
      setError(err.message || "Error: Something unexpected happened.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return { mutate, error, loading };
};

export default useMutation;
