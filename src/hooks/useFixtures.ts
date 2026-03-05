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
