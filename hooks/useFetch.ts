import { useEffect, useState } from "react";

interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
  reset: () => void;
}

function useFetch<T>({
  fetchFunction,
  autoFetch = true,
}: {
  fetchFunction: () => Promise<T>;
  autoFetch?: boolean;
}): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await fetchFunction();

      setData(result);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("An unknown error occurred")
      );
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, []);

  const refetch = async () => {
    await fetchData();
  };

  const reset = () => {
    setData(null);
    setLoading(true);
    setError(null);
  };

  return { data, loading, error, refetch, reset };
}

export default useFetch;
