import { useRef, useState, useEffect } from 'react';

export default function useFetch(url, needsRefresh) {
  const isMounted = useRef(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Use ref to check whether component is mounted before setting state
    isMounted.current = true;
    async function getData() {
      try {
        const response = await fetch(`/api/${url}`);
        if (response.ok) {
          const json = await response.json();
          if (isMounted.current) setData(json);
        } else {
          throw response;
        }
      } catch (e) {
        if (isMounted.current) setError(e);
      } finally {
        if (isMounted.current) setLoading(false);
      }
    }
    getData();
    // Function will run when component unmounts
    return () => {
      isMounted.current = false;
    };
  }, [needsRefresh]);

  return { data, error, loading };
}
