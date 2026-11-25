export type LeagueId = "nfl" | "nba";

export interface TeamInfo {
  id: string;
  name: string;
  city: string;
  nickname: string;
  abbr: string;
  league: LeagueId;
  conferenceId: string;
  conferenceName: string;
  divisionId: string;
  divisionName: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  throwbackColor: string;
  throwbackAccent: string;
  homePlayer: string;
  homeNumber: string;
  throwbackPlayer: string;
  throwbackNumber: string;
}

export interface DivisionGroup {
  id: string;
  name: string;
  teams: TeamInfo[];
}

export interface ConferenceGroup {
  id: string;
  name: string;
  divisions: DivisionGroup[];
}

export interface LeagueStructure {
  id: LeagueId;
  name: string;
  fullName: string;
  conferences: ConferenceGroup[];
}

function makeTeam(
  league: LeagueId,
  conferenceId: string,
  conferenceName: string,
  divisionId: string,
  divisionName: string,
  name: string,
  city: string,
  nickname: string,
  abbr: string,
  primaryColor: string,
  secondaryColor: string,
  accentColor: string,
  throwbackColor: string,
  throwbackAccent: string,
  homePlayer: string,
  homeNumber: string,
  throwbackPlayer: string,
  throwbackNumber: string
): TeamInfo {
  const id = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return {
    id,
    name,
    city,
    nickname,
    abbr,
    league,
    conferenceId,
    conferenceName,
    divisionId,
    divisionName,
    primaryColor,
    secondaryColor,
    accentColor,
    throwbackColor,
    throwbackAccent,
    homePlayer,
    homeNumber,
    throwbackPlayer,
    throwbackNumber,
  };
}

export const NFL_STRUCTURE: LeagueStructure = {
  id: "nfl",
  name: "NFL",
  fullName: "National Football League",
  conferences: [
    {
      id: "afc",
      name: "AFC",
      divisions: [
        {
          id: "afc-east",
          name: "AFC East",
          teams: [
            makeTeam("nfl", "afc", "AFC", "afc-east", "AFC East", "Buffalo Bills", "Buffalo", "Bills", "BUF", "#00338D", "#C60C30", "#FFFFFF", "#F4F5F7", "#00338D", "Allen", "17", "Kelly", "12"),
            makeTeam("nfl", "afc", "AFC", "afc-east", "AFC East", "Miami Dolphins", "Miami", "Dolphins", "MIA", "#008E97", "#FC4C02", "#FFFFFF", "#FFFFFF", "#008E97", "Hill", "10", "Marino", "13"),
            makeTeam("nfl", "afc", "AFC", "afc-east", "AFC East", "New England Patriots", "New England", "Patriots", "NE", "#002244", "#C60C30", "#B0B7BC", "#C60C30", "#FFFFFF", "Maye", "10", "Brady", "12"),
            makeTeam("nfl", "afc", "AFC", "afc-east", "AFC East", "New York Jets", "New York", "Jets", "NYJ", "#125740", "#FFFFFF", "#000000", "#111317", "#125740", "Wilson", "5", "Namath", "12"),
          ],
        },
        {
          id: "afc-north",
          name: "AFC North",
          teams: [
            makeTeam("nfl", "afc", "AFC", "afc-north", "AFC North", "Baltimore Ravens", "Baltimore", "Ravens", "BAL", "#241773", "#9E7C0C", "#FFFFFF", "#111317", "#9E7C0C", "Jackson", "8", "Lewis", "52"),
            makeTeam("nfl", "afc", "AFC", "afc-north", "AFC North", "Cincinnati Bengals", "Cincinnati", "Bengals", "CIN", "#FB4F14", "#111317", "#FFFFFF", "#F4F5F7", "#111317", "Burrow", "9", "Chase", "1"),
            makeTeam("nfl", "afc", "AFC", "afc-north", "AFC North", "Cleveland Browns", "Cleveland", "Browns", "CLE", "#311D00", "#FF3C00", "#FFFFFF", "#F4F5F7", "#FF3C00", "Garrett", "95", "Brown", "32"),
            makeTeam("nfl", "afc", "AFC", "afc-north", "AFC North", "Pittsburgh Steelers", "Pittsburgh", "Steelers", "PIT", "#101820", "#FFB612", "#FFFFFF", "#FFB612", "#101820", "Watt", "90", "Polamalu", "43"),
          ],
        },
        {
          id: "afc-south",
          name: "AFC South",
          teams: [
            makeTeam("nfl", "afc", "AFC", "afc-south", "AFC South", "Houston Texans", "Houston", "Texans", "HOU", "#03202F", "#A71930", "#FFFFFF", "#A71930", "#03202F", "Stroud", "7", "Watt", "99"),
            makeTeam("nfl", "afc", "AFC", "afc-south", "AFC South", "Indianapolis Colts", "Indianapolis", "Colts", "IND", "#002C5F", "#A2AAAD", "#FFFFFF", "#111317", "#002C5F", "Richardson", "5", "Manning", "18"),
            makeTeam("nfl", "afc", "AFC", "afc-south", "AFC South", "Jacksonville Jaguars", "Jacksonville", "Jaguars", "JAX", "#006778", "#D7A22A", "#101820", "#101820", "#006778", "Lawrence", "16", "Taylor", "28"),
            makeTeam("nfl", "afc", "AFC", "afc-south", "AFC South", "Tennessee Titans", "Tennessee", "Titans", "TEN", "#0C2340", "#4B92DB", "#C8102E", "#4B92DB", "#FFFFFF", "Simmons", "98", "McNair", "9"),
          ],
        },
        {
          id: "afc-west",
          name: "AFC West",
          teams: [
            makeTeam("nfl", "afc", "AFC", "afc-west", "AFC West", "Denver Broncos", "Denver", "Broncos", "DEN", "#FB4F14", "#002244", "#FFFFFF", "#002244", "#FB4F14", "Surtain", "2", "Elway", "7"),
            makeTeam("nfl", "afc", "AFC", "afc-west", "AFC West", "Kansas City Chiefs", "Kansas City", "Chiefs", "KC", "#E31837", "#FFB81C", "#FFFFFF", "#F4F5F7", "#E31837", "Mahomes", "15", "Kelce", "87"),
            makeTeam("nfl", "afc", "AFC", "afc-west", "AFC West", "Las Vegas Raiders", "Las Vegas", "Raiders", "LV", "#111317", "#A5ACAF", "#FFFFFF", "#F4F5F7", "#111317", "Crosby", "98", "Bo Jackson", "34"),
            makeTeam("nfl", "afc", "AFC", "afc-west", "AFC West", "Los Angeles Chargers", "Los Angeles", "Chargers", "LAC", "#0080C6", "#FFC20E", "#FFFFFF", "#002A5E", "#FFC20E", "Herbert", "10", "Tomlinson", "21"),
          ],
        },
      ],
    },
    {
      id: "nfc",
      name: "NFC",
      divisions: [
        {
          id: "nfc-east",
          name: "NFC East",
          teams: [
            makeTeam("nfl", "nfc", "NFC", "nfc-east", "NFC East", "Dallas Cowboys", "Dallas", "Cowboys", "DAL", "#003594", "#869397", "#FFFFFF", "#041E42", "#FFFFFF", "Lamb", "88", "Prescott", "4"),
            makeTeam("nfl", "nfc", "NFC", "nfc-east", "NFC East", "New York Giants", "New York", "Giants", "NYG", "#0B2265", "#A71930", "#FFFFFF", "#F4F5F7", "#0B2265", "Nabers", "1", "Taylor", "56"),
            makeTeam("nfl", "nfc", "NFC", "nfc-east", "NFC East", "Philadelphia Eagles", "Philadelphia", "Eagles", "PHI", "#004C54", "#A5ACAF", "#FFFFFF", "#111317", "#004C54", "Hurts", "1", "Barkley", "26"),
            makeTeam("nfl", "nfc", "NFC", "nfc-east", "NFC East", "Washington Commanders", "Washington", "Commanders", "WAS", "#5A1414", "#FFB612", "#FFFFFF", "#111317", "#FFB612", "Daniels", "5", "Taylor", "21"),
          ],
        },
        {
          id: "nfc-north",
          name: "NFC North",
          teams: [
            makeTeam("nfl", "nfc", "NFC", "nfc-north", "NFC North", "Chicago Bears", "Chicago", "Bears", "CHI", "#0B162A", "#C83803", "#FFFFFF", "#C83803", "#0B162A", "Williams", "18", "Payton", "34"),
            makeTeam("nfl", "nfc", "NFC", "nfc-north", "NFC North", "Detroit Lions", "Detroit", "Lions", "DET", "#0076B6", "#B0B7BC", "#FFFFFF", "#111317", "#0076B6", "St. Brown", "14", "Sanders", "20"),
            makeTeam("nfl", "nfc", "NFC", "nfc-north", "NFC North", "Green Bay Packers", "Green Bay", "Packers", "GB", "#203731", "#FFB612", "#FFFFFF", "#F4F5F7", "#203731", "Love", "10", "Favre", "4"),
            makeTeam("nfl", "nfc", "NFC", "nfc-north", "NFC North", "Minnesota Vikings", "Minnesota", "Vikings", "MIN", "#4F2683", "#FFC62F", "#FFFFFF", "#F4F5F7", "#4F2683", "Jefferson", "18", "Moss", "84"),
          ],
        },
        {
          id: "nfc-south",
          name: "NFC South",
          teams: [
            makeTeam("nfl", "nfc", "NFC", "nfc-south", "NFC South", "Atlanta Falcons", "Atlanta", "Falcons", "ATL", "#A71930", "#111317", "#FFFFFF", "#111317", "#A71930", "Robinson", "7", "Vick", "7"),
            makeTeam("nfl", "nfc", "NFC", "nfc-south", "NFC South", "Carolina Panthers", "Carolina", "Panthers", "CAR", "#0085CA", "#101820", "#BFC0BF", "#101820", "#0085CA", "Young", "9", "Newton", "1"),
            makeTeam("nfl", "nfc", "NFC", "nfc-south", "NFC South", "New Orleans Saints", "New Orleans", "Saints", "NO", "#101820", "#D3BC8D", "#FFFFFF", "#F4F5F7", "#D3BC8D", "Kamara", "41", "Brees", "9"),
            makeTeam("nfl", "nfc", "NFC", "nfc-south", "NFC South", "Tampa Bay Buccaneers", "Tampa Bay", "Buccaneers", "TB", "#D50A0A", "#34302B", "#FFFFFF", "#FF7900", "#FFFFFF", "Evans", "13", "Alstott", "40"),
          ],
        },
        {
          id: "nfc-west",
          name: "NFC West",
          teams: [
            makeTeam("nfl", "nfc", "NFC", "nfc-west", "NFC West", "Arizona Cardinals", "Arizona", "Cardinals", "ARI", "#97233F", "#111317", "#FFB612", "#111317", "#97233F", "Harrison Jr.", "18", "Fitzgerald", "11"),
            makeTeam("nfl", "nfc", "NFC", "nfc-west", "NFC West", "Los Angeles Rams", "Los Angeles", "Rams", "LAR", "#003594", "#FFA300", "#FFFFFF", "#F4F5F7", "#003594", "Nacua", "17", "Donald", "99"),
            makeTeam("nfl", "nfc", "NFC", "nfc-west", "NFC West", "San Francisco 49ers", "San Francisco", "49ers", "SF", "#AA0000", "#B3995D", "#FFFFFF", "#111317", "#AA0000", "Purdy", "13", "Rice", "80"),
            makeTeam("nfl", "nfc", "NFC", "nfc-west", "NFC West", "Seattle Seahawks", "Seattle", "Seahawks", "SEA", "#002244", "#69BE28", "#A5ACAF", "#005596", "#69BE28", "Smith-Njigba", "11", "Lynch", "24"),
          ],
        },
      ],
    },
  ],
};

export const NBA_STRUCTURE: LeagueStructure = {
  id: "nba",
  name: "NBA",
  fullName: "National Basketball Association",
  conferences: [
    {
      id: "leste",
      name: "Conferência Leste",
      divisions: [
        {
          id: "atlantic",
          name: "Atlantic",
          teams: [
            makeTeam("nba", "leste", "Conferência Leste", "atlantic", "Atlantic", "Boston Celtics", "Boston", "Celtics", "BOS", "#007A33", "#BA9653", "#FFFFFF", "#111317", "#007A33", "Tatum", "0", "Bird", "33"),
            makeTeam("nba", "leste", "Conferência Leste", "atlantic", "Atlantic", "Brooklyn Nets", "Brooklyn", "Nets", "BKN", "#111317", "#FFFFFF", "#707271", "#F4F5F7", "#111317", "Thomas", "24", "Kidd", "5"),
            makeTeam("nba", "leste", "Conferência Leste", "atlantic", "Atlantic", "New York Knicks", "New York", "Knicks", "NYK", "#006BB6", "#F58426", "#FFFFFF", "#111317", "#F58426", "Brunson", "11", "Ewing", "33"),
            makeTeam("nba", "leste", "Conferência Leste", "atlantic", "Atlantic", "Philadelphia 76ers", "Philadelphia", "76ers", "PHI", "#006BB6", "#ED174C", "#FFFFFF", "#111317", "#ED174C", "Embiid", "21", "Iverson", "3"),
            makeTeam("nba", "leste", "Conferência Leste", "atlantic", "Atlantic", "Toronto Raptors", "Toronto", "Raptors", "TOR", "#CE1141", "#111317", "#A1A1A4", "#4E2A84", "#CE1141", "Barnes", "4", "Carter", "15"),
          ],
        },
        {
          id: "central",
          name: "Central",
          teams: [
            makeTeam("nba", "leste", "Conferência Leste", "central", "Central", "Chicago Bulls", "Chicago", "Bulls", "CHI", "#CE1141", "#111317", "#FFFFFF", "#111317", "#CE1141", "White", "0", "Jordan", "23"),
            makeTeam("nba", "leste", "Conferência Leste", "central", "Central", "Cleveland Cavaliers", "Cleveland", "Cavaliers", "CLE", "#860038", "#FDBB30", "#041E42", "#F4F5F7", "#860038", "Mitchell", "45", "James", "23"),
            makeTeam("nba", "leste", "Conferência Leste", "central", "Central", "Detroit Pistons", "Detroit", "Pistons", "DET", "#C8102E", "#1D42BA", "#FFFFFF", "#006271", "#C8102E", "Cunningham", "2", "Thomas", "11"),
            makeTeam("nba", "leste", "Conferência Leste", "central", "Central", "Indiana Pacers", "Indiana", "Pacers", "IND", "#002D62", "#FDBB30", "#FFFFFF", "#FDBB30", "#002D62", "Haliburton", "0", "Miller", "31"),
            makeTeam("nba", "leste", "Conferência Leste", "central", "Central", "Milwaukee Bucks", "Milwaukee", "Bucks", "MIL", "#00471B", "#EEE1C6", "#FFFFFF", "#111317", "#00471B", "Antetokounmpo", "34", "Abdul-Jabbar", "33"),
          ],
        },
        {
          id: "southeast",
          name: "Southeast",
          teams: [
            makeTeam("nba", "leste", "Conferência Leste", "southeast", "Southeast", "Atlanta Hawks", "Atlanta", "Hawks", "ATL", "#E03A3E", "#C1D32F", "#111317", "#111317", "#E03A3E", "Young", "11", "Wilkins", "21"),
            makeTeam("nba", "leste", "Conferência Leste", "southeast", "Southeast", "Charlotte Hornets", "Charlotte", "Hornets", "CHA", "#00788C", "#1D1160", "#FFFFFF", "#F4F5F7", "#00788C", "Ball", "1", "Johnson", "2"),
            makeTeam("nba", "leste", "Conferência Leste", "southeast", "Southeast", "Miami Heat", "Miami", "Heat", "MIA", "#98002E", "#F9A01B", "#111317", "#111317", "#98002E", "Adebayo", "13", "Wade", "3"),
            makeTeam("nba", "leste", "Conferência Leste", "southeast", "Southeast", "Orlando Magic", "Orlando", "Magic", "ORL", "#0077C0", "#111317", "#C4CED4", "#111317", "#0077C0", "Banchero", "5", "O'Neal", "32"),
            makeTeam("nba", "leste", "Conferência Leste", "southeast", "Southeast", "Washington Wizards", "Washington", "Wizards", "WAS", "#002B5C", "#E31837", "#C4CED4", "#E31837", "#002B5C", "Sarr", "20", "Arenas", "0"),
          ],
        },
      ],
    },
    {
      id: "oeste",
      name: "Conferência Oeste",
      divisions: [
        {
          id: "northwest",
          name: "Northwest",
          teams: [
            makeTeam("nba", "oeste", "Conferência Oeste", "northwest", "Northwest", "Denver Nuggets", "Denver", "Nuggets", "DEN", "#0E2240", "#FEC524", "#8B2131", "#5091CD", "#FEC524", "Jokic", "15", "Anthony", "15"),
            makeTeam("nba", "oeste", "Conferência Oeste", "northwest", "Northwest", "Minnesota Timberwolves", "Minnesota", "Timberwolves", "MIN", "#0C2340", "#78BE20", "#236192", "#111317", "#78BE20", "Edwards", "5", "Garnett", "21"),
            makeTeam("nba", "oeste", "Conferência Oeste", "northwest", "Northwest", "Oklahoma City Thunder", "Oklahoma City", "Thunder", "OKC", "#007AC1", "#EF3B24", "#FDBB30", "#002D62", "#EF3B24", "Gilgeous-Alexander", "2", "Westbrook", "0"),
            makeTeam("nba", "oeste", "Conferência Oeste", "northwest", "Northwest", "Portland Trail Blazers", "Portland", "Trail Blazers", "POR", "#E03A3E", "#111317", "#FFFFFF", "#111317", "#E03A3E", "Sharpe", "17", "Drexler", "22"),
            makeTeam("nba", "oeste", "Conferência Oeste", "northwest", "Northwest", "Utah Jazz", "Utah", "Jazz", "UTA", "#002B5C", "#F9A01B", "#FFFFFF", "#3E2680", "#00A9E0", "Markkanen", "23", "Stockton", "12"),
          ],
        },
        {
          id: "pacific",
          name: "Pacific",
          teams: [
            makeTeam("nba", "oeste", "Conferência Oeste", "pacific", "Pacific", "Golden State Warriors", "Golden State", "Warriors", "GSW", "#1D428A", "#FFC72C", "#FFFFFF", "#111317", "#FFC72C", "Curry", "30", "Thompson", "11"),
            makeTeam("nba", "oeste", "Conferência Oeste", "pacific", "Pacific", "LA Clippers", "Los Angeles", "Clippers", "LAC", "#C8102E", "#1D428A", "#FFFFFF", "#111317", "#C8102E", "Leonard", "2", "Griffin", "32"),
            makeTeam("nba", "oeste", "Conferência Oeste", "pacific", "Pacific", "Los Angeles Lakers", "Los Angeles", "Lakers", "LAL", "#552583", "#FDB927", "#FFFFFF", "#FDB927", "#552583", "Doncic", "77", "Bryant", "24"),
            makeTeam("nba", "oeste", "Conferência Oeste", "pacific", "Pacific", "Phoenix Suns", "Phoenix", "Suns", "PHX", "#1D1160", "#E56020", "#FFFFFF", "#111317", "#E56020", "Booker", "1", "Nash", "13"),
            makeTeam("nba", "oeste", "Conferência Oeste", "pacific", "Pacific", "Sacramento Kings", "Sacramento", "Kings", "SAC", "#5A2D81", "#63727A", "#FFFFFF", "#111317", "#5A2D81", "Sabonis", "11", "Webber", "4"),
          ],
        },
        {
          id: "southwest",
          name: "Southwest",
          teams: [
            makeTeam("nba", "oeste", "Conferência Oeste", "southwest", "Southwest", "Dallas Mavericks", "Dallas", "Mavericks", "DAL", "#00538C", "#B8C4CA", "#FFFFFF", "#002B5E", "#007A33", "Irving", "11", "Nowitzki", "41"),
            makeTeam("nba", "oeste", "Conferência Oeste", "southwest", "Southwest", "Houston Rockets", "Houston", "Rockets", "HOU", "#CE1141", "#111317", "#C4CED4", "#111317", "#CE1141", "Sengun", "28", "Olajuwon", "34"),
            makeTeam("nba", "oeste", "Conferência Oeste", "southwest", "Southwest", "Memphis Grizzlies", "Memphis", "Grizzlies", "MEM", "#5D76A9", "#12173F", "#F5B112", "#00B2A9", "#C8102E", "Morant", "12", "Gasol", "33"),
            makeTeam("nba", "oeste", "Conferência Oeste", "southwest", "Southwest", "New Orleans Pelicans", "New Orleans", "Pelicans", "NOP", "#0C2340", "#C8102E", "#85714D", "#111317", "#85714D", "Williamson", "1", "Paul", "3"),
            makeTeam("nba", "oeste", "Conferência Oeste", "southwest", "Southwest", "San Antonio Spurs", "San Antonio", "Spurs", "SAS", "#111317", "#C4CED4", "#FFFFFF", "#F4F5F7", "#00B2A9", "Wembanyama", "1", "Duncan", "21"),
          ],
        },
      ],
    },
  ],
};

export const ALL_NFL_TEAMS: TeamInfo[] = NFL_STRUCTURE.conferences.flatMap((c) =>
  c.divisions.flatMap((d) => d.teams)
);

export const ALL_NBA_TEAMS: TeamInfo[] = NBA_STRUCTURE.conferences.flatMap((c) =>
  c.divisions.flatMap((d) => d.teams)
);
