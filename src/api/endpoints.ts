const BASE = "https://www.thesportsdb.com/api/v1/json/3";

export const endpoints = {
  fixtures: (teamId: string) => `${BASE}/eventsnext.php?id=${teamId}`,

  matchDetails: (eventId: string) => `${BASE}/lookupevent.php?id=${eventId}`,
};
