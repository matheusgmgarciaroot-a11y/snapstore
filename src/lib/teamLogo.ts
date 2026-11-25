/**
 * Returns the public path to a team logo image, or null if not yet available.
 * Logo files live at /images/teams/{teamId}.{ext}
 *
 * As the user uploads more logos, add entries to TEAM_LOGO_MAP below.
 */

/** Map of teamId → filename (relative to /images/teams/) */
const TEAM_LOGO_MAP: Record<string, string> = {
  // NFL (all 32 teams)
  "washington-commanders": "washington-commanders.webp",
  "tennessee-titans": "tennessee-titans.png",
  "tampa-bay-buccaneers": "tampa-bay-buccaneers.png",
  "seattle-seahawks": "seattle-seahawks.png",
  "san-francisco-49ers": "san-francisco-49ers.png",
  "pittsburgh-steelers": "pittsburgh-steelers.png",
  "philadelphia-eagles": "philadelphia-eagles.png",
  "new-york-jets": "new-york-jets.png",
  "new-york-giants": "new-york-giants.png",
  "new-orleans-saints": "new-orleans-saints.png",
  "new-england-patriots": "new-england-patriots.png",
  "minnesota-vikings": "minnesota-vikings.png",
  "miami-dolphins": "miami-dolphins.png",
  "los-angeles-rams": "los-angeles-rams.png",
  "los-angeles-chargers": "los-angeles-chargers.png",
  "buffalo-bills": "buffalo-bills.png",
  "baltimore-ravens": "baltimore-ravens.png",
  "cincinnati-bengals": "cincinnati-bengals.png",
  "cleveland-browns": "cleveland-browns.png",
  "dallas-cowboys": "dallas-cowboys.png",
  "green-bay-packers": "green-bay-packers.png",
  "detroit-lions": "detroit-lions.png",
  "chicago-bears": "chicago-bears.png",
  "indianapolis-colts": "indianapolis-colts.png",
  "houston-texans": "houston-texans.png",
  "jacksonville-jaguars": "jacksonville-jaguars.png",
  "las-vegas-raiders": "las-vegas-raiders.png",
  "kansas-city-chiefs": "kansas-city-chiefs.png",
  "denver-broncos": "denver-broncos.png",
  "atlanta-falcons": "atlanta-falcons.png",
  "carolina-panthers": "carolina-panthers.png",
  "arizona-cardinals": "arizona-cardinals.png",
  // NBA (all 30 teams)
  "atlanta-hawks": "atlanta-hawks.png",
  "boston-celtics": "boston-celtics.png",
  "brooklyn-nets": "brooklyn-nets.png",
  "charlotte-hornets": "charlotte-hornets.png",
  "chicago-bulls": "chicago-bulls.png",
  "cleveland-cavaliers": "cleveland-cavaliers.png",
  "dallas-mavericks": "dallas-mavericks.png",
  "denver-nuggets": "denver-nuggets.png",
  "detroit-pistons": "detroit-pistons.png",
  "golden-state-warriors": "golden-state-warriors.png",
  "houston-rockets": "houston-rockets.png",
  "indiana-pacers": "indiana-pacers.png",
  "la-clippers": "la-clippers.png",
  "los-angeles-lakers": "los-angeles-lakers.png",
  "memphis-grizzlies": "memphis-grizzlies.png",
  "miami-heat": "miami-heat.png",
  "milwaukee-bucks": "milwaukee-bucks.png",
  "minnesota-timberwolves": "minnesota-timberwolves.png",
  "new-orleans-pelicans": "new-orleans-pelicans.png",
  "new-york-knicks": "new-york-knicks.png",
  "oklahoma-city-thunder": "oklahoma-city-thunder.png",
  "orlando-magic": "orlando-magic.png",
  "philadelphia-76ers": "philadelphia-76ers.png",
  "phoenix-suns": "phoenix-suns.png",
  "portland-trail-blazers": "portland-trail-blazers.png",
  "sacramento-kings": "sacramento-kings.png",
  "san-antonio-spurs": "san-antonio-spurs.png",
  "toronto-raptors": "toronto-raptors.png",
  "utah-jazz": "utah-jazz.png",
  "washington-wizards": "washington-wizards.png",
};

export function getTeamLogoSrc(teamId: string): string | null {
  const filename = TEAM_LOGO_MAP[teamId];
  if (!filename) return null;
  return `/images/teams/${filename}`;
}
