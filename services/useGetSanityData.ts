import { useRef, useState, useEffect } from "react";
import imageUrlBuilder from "@sanity/image-url";

const sanityClient = require("@sanity/client");

const client = sanityClient({
  projectId: "jgtmwbuh",
  dataset: "production",
  apiVersion: "2022-04-20",
});

export default function useGetSanityData(
  query: string,
  params: any,
  needsRefresh: boolean
) {
  const isMounted = useRef(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Use ref to check whether component is mounted before setting state
    isMounted.current = true;
    async function getData() {
      try {
        if (isMounted.current) setLoading(true);
        const response = await client.fetch(query, params);
        if (isMounted.current) setData(response);
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

const imageBuilder = imageUrlBuilder(client);

export function getSanityImage(source) {
  return imageBuilder.image(source);
}
