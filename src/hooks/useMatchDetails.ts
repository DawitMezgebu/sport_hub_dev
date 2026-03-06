import { useEffect, useState } from "react";
import { endpoints } from "../api/endpoints";

export function useMatchDetails(eventId: string) {
  const [data, setData] = useState<any>(null);
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);
  const [error, setErrorObj] = useState<any>(null);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      try {
        setLoading(true);
        setError(false);

        const res = await fetch(endpoints.matchDetails(eventId));
        const json = await res.json();

        if (!cancelled) setData(json);
      } catch (e) {
        if (!cancelled) {
          setError(true);
          setErrorObj(e);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    if (eventId) run();

    return () => {
      cancelled = true;
    };
  }, [eventId]);

  return { data, isLoading, isError, error };
}
