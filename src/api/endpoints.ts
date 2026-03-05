export const SPORTSDB_BASE = "https://www.thesportsdb.com/api/v1/json/3";

export const endpoints = {
  nextEvents: (leagueId: string) => `${SPORTSDB_BASE}/eventsnext.php?id=${leagueId}`,
  lookupEvent: (eventId: string) => `${SPORTSDB_BASE}/lookupevent.php?id=${eventId}`,
};