export type TimelineSide = "home" | "away" | "center";

export type TimelineType =
  | "goal"
  | "yellow"
  | "red"
  | "sub"
  | "corner"
  | "injury"
  | "shoot"
  | "info";

export interface TimelineEvent {
  id: string;
  minuteLabel: string;
  side: TimelineSide;
  type: TimelineType;
  primary: string;
  secondary?: string;
}

function formatMinute(min?: string) {
  if (!min) return "";
  return min.includes("'") ? min : `${min}'`;
}

function parseMinute(label: string) {
  const cleaned = label.replace("'", "");
  if (cleaned.includes("+")) {
    const [base, extra] = cleaned.split("+").map(Number);
    return base + extra;
  }
  return Number(cleaned);
}

export function normalizeMatchEvents(raw: any): TimelineEvent[] {
  if (!raw) return [];

  const events: TimelineEvent[] = [];

  // GOALS
  if (raw.strHomeGoalDetails) {
    raw.strHomeGoalDetails.split(";").forEach((g: string, i: number) => {
      const [player, minute] = g.split(" ");
      events.push({
        id: `home-goal-${i}`,
        minuteLabel: formatMinute(minute),
        side: "home",
        type: "goal",
        primary: player,
      });
    });
  }

  if (raw.strAwayGoalDetails) {
    raw.strAwayGoalDetails.split(";").forEach((g: string, i: number) => {
      const [player, minute] = g.split(" ");
      events.push({
        id: `away-goal-${i}`,
        minuteLabel: formatMinute(minute),
        side: "away",
        type: "goal",
        primary: player,
      });
    });
  }

  // YELLOW CARDS
  if (raw.strHomeYellowCards) {
    raw.strHomeYellowCards.split(";").forEach((c: string, i: number) => {
      const [player, minute] = c.split(" ");
      events.push({
        id: `home-yellow-${i}`,
        minuteLabel: formatMinute(minute),
        side: "home",
        type: "yellow",
        primary: player,
      });
    });
  }

  if (raw.strAwayYellowCards) {
    raw.strAwayYellowCards.split(";").forEach((c: string, i: number) => {
      const [player, minute] = c.split(" ");
      events.push({
        id: `away-yellow-${i}`,
        minuteLabel: formatMinute(minute),
        side: "away",
        type: "yellow",
        primary: player,
      });
    });
  }

  // RED CARDS
  if (raw.strHomeRedCards) {
    raw.strHomeRedCards.split(";").forEach((c: string, i: number) => {
      const [player, minute] = c.split(" ");
      events.push({
        id: `home-red-${i}`,
        minuteLabel: formatMinute(minute),
        side: "home",
        type: "red",
        primary: player,
      });
    });
  }

  if (raw.strAwayRedCards) {
    raw.strAwayRedCards.split(";").forEach((c: string, i: number) => {
      const [player, minute] = c.split(" ");
      events.push({
        id: `away-red-${i}`,
        minuteLabel: formatMinute(minute),
        side: "away",
        type: "red",
        primary: player,
      });
    });
  }

  return events.sort(
    (a, b) => parseMinute(b.minuteLabel) - parseMinute(a.minuteLabel),
  );
}
