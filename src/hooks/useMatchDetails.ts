import { useEffect, useRef, useState } from "react";
import { endpoints } from "../api/endpoints";
import { fetchJson } from "../api/client";
import { MATCH_SAMPLE } from "../mock/fixtures.sample";

type MatchDetailsResponse = { events: any[] | null };

const USE_MOCK = true;

export function useMatchDetails(eventId: string) {
  const [data, setData] = useState<MatchDetailsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (!eventId) return;

    // MOCK MODE
    if (USE_MOCK) {
      setIsLoading(true);

      setTimeout(() => {
        setData(MATCH_SAMPLE);
        setIsLoading(false);
      }, 300);

      return;
    }

    // API MODE
    abortRef.current?.abort();
    const ac = new AbortController();
    abortRef.current = ac;

    setIsLoading(true);

    (async () => {
      try {
        setIsError(false);
        setError(null);

        const res = await fetchJson<MatchDetailsResponse>(
          endpoints.lookupEvent(eventId),
          ac.signal,
        );

        setData(res);
      } catch (e) {
        if ((e as any)?.name !== "AbortError") {
          setIsError(true);
          setError(e);
        }
      } finally {
        setIsLoading(false);
      }
    })();

    return () => ac.abort();
  }, [eventId]);

  return { data, isLoading, isError, error };
}
