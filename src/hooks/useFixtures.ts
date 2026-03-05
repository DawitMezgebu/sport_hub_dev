// import { useEffect, useRef, useState } from "react";
// import { endpoints } from "../api/endpoints";
// import { fetchJson } from "../api/client";

// type FixturesResponse = { events: any[] | null };

// export function useFixtures(leagueId: string) {
//   const [data, setData] = useState<FixturesResponse | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isError, setIsError] = useState(false);
//   const [error, setError] = useState<unknown>(null);
//   const [lastUpdatedAt, setLastUpdatedAt] = useState<number | null>(null);

//   const intervalRef = useRef<number | null>(null);
//   const fetchingRef = useRef(false);
//   const abortRef = useRef<AbortController | null>(null);

//   const fetchOnce = async () => {
//     if (fetchingRef.current) return;
//     fetchingRef.current = true;

//     abortRef.current?.abort();
//     const ac = new AbortController();
//     abortRef.current = ac;

//     try {
//       setIsError(false);
//       setError(null);

//       const res = await fetchJson<FixturesResponse>(
//         endpoints.nextEvents(leagueId),
//         ac.signal,
//       );
//       setData(res);
//       setLastUpdatedAt(Date.now());
//     } catch (e) {
//       if ((e as any)?.name !== "AbortError") {
//         setIsError(true);
//         setError(e);
//       }
//     } finally {
//       setIsLoading(false);
//       fetchingRef.current = false;
//     }
//   };

//   useEffect(() => {
//     setIsLoading(true);
//     fetchOnce();

//     intervalRef.current = window.setInterval(fetchOnce, 18000);

//     return () => {
//       abortRef.current?.abort();
//       if (intervalRef.current) window.clearInterval(intervalRef.current);
//     };
//   }, [leagueId]);

//   return { data, isLoading, isError, error, lastUpdatedAt, refetch: fetchOnce };
// }

import { useEffect, useState } from "react";
import { fixturesSample } from "../mock/fixtures.sample";
import { USE_MOCK_FIXTURES } from "../mock/config/env";

export function useFixtures(leagueId: string) {
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

        if (USE_MOCK_FIXTURES) {
          // ✅ Return same shape as API
          const mock = { events: fixturesSample };
          if (!cancelled) setData(mock);
          return;
        }

        const res = await fetch(
          `https://www.thesportsdb.com/api/v1/json/3/eventsnext.php?id=${leagueId}`,
        );
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

    run();

    return () => {
      cancelled = true;
    };
  }, [leagueId]);

  return { data, isLoading, isError, error };
}
