import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

const useFetch = (url) => {
  const [data, setData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!url) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(url);

        if (response.status === 429) {
          const errorData = await response.json();
          navigate("/", {
            state: {
              message: errorData.message || "Too many requests.",
              type: "error",
            },
          });
          return;
        }

        if (!response.ok) {
          throw new Error(
            `HTTP Error: ${response.status}: ${response.statusText}`
          );
        }

        const data = await response.json();
        setData(data);
      } catch (err) {
        setError(err.message || "Error: Something unexpected happened.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, error, loading };
};

export default useFetch;
