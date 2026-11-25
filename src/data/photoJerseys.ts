import type { JerseyEdition } from "./jerseys";

/** A real photographed jersey model for a specific team. */
export interface PhotoJerseySpec {
  key: string;
  image: string;
  edition: JerseyEdition;
  editionLabel: string;
  playerName: string;
  playerNumber: string;
  price: number;
  originalPrice?: number;
  primaryColor: string;
  secondaryColor: string;
  fabricNote: string;
  onRequest?: boolean;
  featured?: boolean;
}

const BASE = "/images/jerseys";

const NIKE_VAPOR = "Nike Vapor F.U.S.E. Limited com números termocolados";
const NIKE_GAME = "Nike Game com tecido leve e números estampados";
const MITCHELL = "Mitchell & Ness Legacy com números bordados em twill";

/** Teams listed here use real photos instead of the generated illustrations. */
export const PHOTO_JERSEYS: Record<string, PhotoJerseySpec[]> = {
  "arizona-cardinals": [
    { key: "hopkins-10-home-red", image: `${BASE}/arizona-cardinals/hopkins-10-home-red.jpg`, edition: "Home", editionLabel: "Vapor Limited Home", playerName: "Hopkins", playerNumber: "10", price: 399.9, primaryColor: "#97233F", secondaryColor: "#FFFFFF", fabricNote: NIKE_VAPOR },
    { key: "hopkins-10-away-white", image: `${BASE}/arizona-cardinals/hopkins-10-away-white.jpg`, edition: "Home", editionLabel: "Vapor Limited Away", playerName: "Hopkins", playerNumber: "10", price: 399.9, primaryColor: "#FFFFFF", secondaryColor: "#97233F", fabricNote: NIKE_VAPOR },
    { key: "murray-1-home-red", image: `${BASE}/arizona-cardinals/murray-1-home-red.jpg`, edition: "Home", editionLabel: "Game Home", playerName: "Murray", playerNumber: "1", price: 349.9, primaryColor: "#97233F", secondaryColor: "#FFFFFF", fabricNote: NIKE_GAME },
    { key: "hopkins-10-classic-white", image: `${BASE}/arizona-cardinals/hopkins-10-classic-white.jpg`, edition: "Throwback", editionLabel: "Game Clássica Away", playerName: "Hopkins", playerNumber: "10", price: 369.9, primaryColor: "#FFFFFF", secondaryColor: "#97233F", fabricNote: NIKE_GAME },
    { key: "hopkins-10-alternate-black", image: `${BASE}/arizona-cardinals/hopkins-10-alternate-black.jpg`, edition: "Throwback", editionLabel: "Game Alternate Black", playerName: "Hopkins", playerNumber: "10", price: 369.9, primaryColor: "#111317", secondaryColor: "#97233F", fabricNote: NIKE_GAME },
    { key: "watt-99-color-rush-black", image: `${BASE}/arizona-cardinals/watt-99-color-rush-black.jpg`, edition: "Throwback", editionLabel: "Color Rush Black", playerName: "Watt", playerNumber: "99", price: 389.9, primaryColor: "#111317", secondaryColor: "#97233F", fabricNote: NIKE_GAME },
  ],
  "atlanta-falcons": [
    { key: "london-5-2026-home-red", image: `${BASE}/atlanta-falcons/london-5-2026-home-red.jpg`, edition: "Home", editionLabel: "Game Home 2026", playerName: "London", playerNumber: "5", price: 349.9, primaryColor: "#A71930", secondaryColor: "#FFFFFF", fabricNote: NIKE_GAME, featured: true },
    { key: "london-5-2026-away-white", image: `${BASE}/atlanta-falcons/london-5-2026-away-white.jpg`, edition: "Home", editionLabel: "Game Away 2026", playerName: "London", playerNumber: "5", price: 349.9, primaryColor: "#FFFFFF", secondaryColor: "#A71930", fabricNote: NIKE_GAME },
    { key: "robinson-7-home-black", image: `${BASE}/atlanta-falcons/robinson-7-home-black.jpg`, edition: "Home", editionLabel: "Vapor Limited Home", playerName: "Robinson", playerNumber: "7", price: 399.9, originalPrice: 459.9, primaryColor: "#111317", secondaryColor: "#A71930", fabricNote: NIKE_VAPOR },
    { key: "robinson-7-away-white", image: `${BASE}/atlanta-falcons/robinson-7-away-white.jpg`, edition: "Home", editionLabel: "Vapor Limited Away", playerName: "Robinson", playerNumber: "7", price: 399.9, primaryColor: "#FFFFFF", secondaryColor: "#111317", fabricNote: NIKE_VAPOR },
    { key: "london-5-away-white", image: `${BASE}/atlanta-falcons/london-5-away-white.jpg`, edition: "Home", editionLabel: "Game Away", playerName: "London", playerNumber: "5", price: 349.9, primaryColor: "#FFFFFF", secondaryColor: "#111317", fabricNote: NIKE_GAME },
    { key: "london-5-alternate-gradient", image: `${BASE}/atlanta-falcons/london-5-alternate-gradient.jpg`, edition: "Home", editionLabel: "Vapor Alternate Gradient", playerName: "London", playerNumber: "5", price: 419.9, primaryColor: "#A71930", secondaryColor: "#111317", fabricNote: NIKE_VAPOR },
    { key: "london-5-throwback-black", image: `${BASE}/atlanta-falcons/london-5-throwback-black.jpg`, edition: "Throwback", editionLabel: "Vapor Throwback", playerName: "London", playerNumber: "5", price: 419.9, primaryColor: "#111317", secondaryColor: "#A71930", fabricNote: NIKE_VAPOR },
    { key: "ryan-2-classic-red", image: `${BASE}/atlanta-falcons/ryan-2-classic-red.jpg`, edition: "Throwback", editionLabel: "Game Clássica Home", playerName: "Ryan", playerNumber: "2", price: 369.9, primaryColor: "#A71930", secondaryColor: "#111317", fabricNote: NIKE_GAME },
    { key: "ryan-2-classic-white", image: `${BASE}/atlanta-falcons/ryan-2-classic-white.jpg`, edition: "Throwback", editionLabel: "Limited Clássica Away", playerName: "Ryan", playerNumber: "2", price: 369.9, primaryColor: "#FFFFFF", secondaryColor: "#A71930", fabricNote: NIKE_GAME },
    { key: "jones-11-classic-red", image: `${BASE}/atlanta-falcons/jones-11-classic-red.jpg`, edition: "Throwback", editionLabel: "Game Clássica Home", playerName: "Jones", playerNumber: "11", price: 369.9, primaryColor: "#A71930", secondaryColor: "#111317", fabricNote: NIKE_GAME },
    { key: "vick-7-2002-black", image: `${BASE}/atlanta-falcons/vick-7-2002-black.jpg`, edition: "Throwback", editionLabel: "Legacy 2002", playerName: "Vick", playerNumber: "7", price: 429.9, primaryColor: "#111317", secondaryColor: "#A71930", fabricNote: MITCHELL, featured: true },
    { key: "vick-7-2003-red", image: `${BASE}/atlanta-falcons/vick-7-2003-red.jpg`, edition: "Throwback", editionLabel: "Authentic 2003", playerName: "Vick", playerNumber: "7", price: 449.9, primaryColor: "#A71930", secondaryColor: "#111317", fabricNote: MITCHELL },
    { key: "vick-7-reebok-vintage", image: `${BASE}/atlanta-falcons/vick-7-reebok-vintage.jpg`, edition: "Throwback", editionLabel: "Reebok Vintage", playerName: "Vick", playerNumber: "7", price: 459.9, primaryColor: "#111317", secondaryColor: "#A71930", fabricNote: "Peça vintage Reebok On Field, unidade de coleção", onRequest: true },
    { key: "sanders-21-1992-white", image: `${BASE}/atlanta-falcons/sanders-21-1992-white.jpg`, edition: "Throwback", editionLabel: "Legacy 1992", playerName: "Sanders", playerNumber: "21", price: 429.9, primaryColor: "#FFFFFF", secondaryColor: "#111317", fabricNote: MITCHELL },
  ],
  "baltimore-ravens": [
    { key: "jackson-8-home-purple", image: `${BASE}/baltimore-ravens/jackson-8-home-purple.jpg`, edition: "Home", editionLabel: "Game Home", playerName: "Jackson", playerNumber: "8", price: 349.9, primaryColor: "#241773", secondaryColor: "#9E7C0C", fabricNote: NIKE_GAME, featured: true },
    { key: "jackson-8-away-white", image: `${BASE}/baltimore-ravens/jackson-8-away-white.jpg`, edition: "Home", editionLabel: "Vapor Limited Away", playerName: "Jackson", playerNumber: "8", price: 399.9, primaryColor: "#FFFFFF", secondaryColor: "#241773", fabricNote: NIKE_VAPOR },
    { key: "jackson-8-alternate-black", image: `${BASE}/baltimore-ravens/jackson-8-alternate-black.jpg`, edition: "Home", editionLabel: "Game Alternate Black", playerName: "Jackson", playerNumber: "8", price: 369.9, primaryColor: "#111317", secondaryColor: "#9E7C0C", fabricNote: NIKE_GAME },
    { key: "henry-22-home-purple", image: `${BASE}/baltimore-ravens/henry-22-home-purple.jpg`, edition: "Home", editionLabel: "Game Home", playerName: "Henry", playerNumber: "22", price: 349.9, primaryColor: "#241773", secondaryColor: "#9E7C0C", fabricNote: NIKE_GAME },
    { key: "flowers-4-home-purple", image: `${BASE}/baltimore-ravens/flowers-4-home-purple.jpg`, edition: "Home", editionLabel: "Game Home", playerName: "Flowers", playerNumber: "4", price: 349.9, primaryColor: "#241773", secondaryColor: "#9E7C0C", fabricNote: NIKE_GAME },
  ],
  "buffalo-bills": [
    { key: "allen-17-home-blue", image: `${BASE}/buffalo-bills/allen-17-home-blue.jpg`, edition: "Home", editionLabel: "Game Home", playerName: "Allen", playerNumber: "17", price: 349.9, primaryColor: "#00338D", secondaryColor: "#C60C30", fabricNote: NIKE_GAME, featured: true },
    { key: "allen-17-away-white", image: `${BASE}/buffalo-bills/allen-17-away-white.jpg`, edition: "Home", editionLabel: "Vapor Limited Away", playerName: "Allen", playerNumber: "17", price: 399.9, primaryColor: "#FFFFFF", secondaryColor: "#00338D", fabricNote: NIKE_VAPOR },
    { key: "allen-17-alternate-red", image: `${BASE}/buffalo-bills/allen-17-alternate-red.jpg`, edition: "Home", editionLabel: "Color Rush Alternate", playerName: "Allen", playerNumber: "17", price: 369.9, primaryColor: "#C60C30", secondaryColor: "#00338D", fabricNote: NIKE_GAME },
  ],
  "carolina-panthers": [
    { key: "young-9-home-black", image: `${BASE}/carolina-panthers/young-9-home-black.jpg`, edition: "Home", editionLabel: "Vapor Limited Home", playerName: "Young", playerNumber: "9", price: 399.9, primaryColor: "#101820", secondaryColor: "#0085CA", fabricNote: NIKE_VAPOR },
    { key: "young-9-alternate-blue", image: `${BASE}/carolina-panthers/young-9-alternate-blue.jpg`, edition: "Home", editionLabel: "Vapor Alternate Blue", playerName: "Young", playerNumber: "9", price: 399.9, primaryColor: "#0085CA", secondaryColor: "#101820", fabricNote: NIKE_VAPOR },
    { key: "young-9-away-white", image: `${BASE}/carolina-panthers/young-9-away-white.jpg`, edition: "Home", editionLabel: "Vapor Limited Away", playerName: "Young", playerNumber: "9", price: 399.9, primaryColor: "#FFFFFF", secondaryColor: "#0085CA", fabricNote: NIKE_VAPOR },
  ],
  "chicago-bears": [
    { key: "williams-18-home-navy", image: `${BASE}/chicago-bears/williams-18-home-navy.jpg`, edition: "Home", editionLabel: "Game Home", playerName: "Williams", playerNumber: "18", price: 349.9, primaryColor: "#0B162A", secondaryColor: "#C83803", fabricNote: NIKE_GAME },
  ],
  "cincinnati-bengals": [
    { key: "burrow-9-home-black", image: `${BASE}/cincinnati-bengals/burrow-9-home-black.jpg`, edition: "Home", editionLabel: "Game Home", playerName: "Burrow", playerNumber: "9", price: 349.9, primaryColor: "#111317", secondaryColor: "#FB4F14", fabricNote: NIKE_GAME },
    { key: "burrow-9-away-white", image: `${BASE}/cincinnati-bengals/burrow-9-away-white.jpg`, edition: "Home", editionLabel: "Vapor Limited Away", playerName: "Burrow", playerNumber: "9", price: 399.9, primaryColor: "#FFFFFF", secondaryColor: "#FB4F14", fabricNote: NIKE_VAPOR },
    { key: "burrow-9-alternate-orange", image: `${BASE}/cincinnati-bengals/burrow-9-alternate-orange.jpg`, edition: "Home", editionLabel: "Game Alternate Orange", playerName: "Burrow", playerNumber: "9", price: 369.9, primaryColor: "#FB4F14", secondaryColor: "#111317", fabricNote: NIKE_GAME },
    { key: "johnson-85-2004-black", image: `${BASE}/cincinnati-bengals/johnson-85-2004-black.jpg`, edition: "Throwback", editionLabel: "Legacy 2004 Ring of Honor", playerName: "C. Johnson", playerNumber: "85", price: 429.9, primaryColor: "#111317", secondaryColor: "#FB4F14", fabricNote: MITCHELL },
  ],
  "cleveland-browns": [
    { key: "watson-4-home-brown", image: `${BASE}/cleveland-browns/watson-4-home-brown.jpg`, edition: "Home", editionLabel: "Game Home", playerName: "Watson", playerNumber: "4", price: 349.9, primaryColor: "#311D00", secondaryColor: "#FF3C00", fabricNote: NIKE_GAME },
    { key: "watson-4-away-white", image: `${BASE}/cleveland-browns/watson-4-away-white.jpg`, edition: "Home", editionLabel: "Game Away", playerName: "Watson", playerNumber: "4", price: 349.9, primaryColor: "#FFFFFF", secondaryColor: "#311D00", fabricNote: NIKE_GAME },
    { key: "watson-4-1946-throwback", image: `${BASE}/cleveland-browns/watson-4-1946-throwback.jpg`, edition: "Throwback", editionLabel: "Vapor Throwback 1946", playerName: "Watson", playerNumber: "4", price: 419.9, primaryColor: "#FFFFFF", secondaryColor: "#FF3C00", fabricNote: NIKE_VAPOR },
  ],
  "dallas-cowboys": [
    { key: "prescott-4-home-white", image: `${BASE}/dallas-cowboys/prescott-4-home-white.jpg`, edition: "Home", editionLabel: "Vapor Limited Home", playerName: "Prescott", playerNumber: "4", price: 399.9, primaryColor: "#FFFFFF", secondaryColor: "#003594", fabricNote: NIKE_VAPOR },
    { key: "lamb-88-away-navy", image: `${BASE}/dallas-cowboys/lamb-88-away-navy.jpg`, edition: "Home", editionLabel: "Vapor Limited Away", playerName: "Lamb", playerNumber: "88", price: 399.9, originalPrice: 459.9, primaryColor: "#041E42", secondaryColor: "#869397", fabricNote: NIKE_VAPOR, featured: true },
    { key: "prescott-4-throwback-white", image: `${BASE}/dallas-cowboys/prescott-4-throwback-white.jpg`, edition: "Throwback", editionLabel: "Vapor Throwback", playerName: "Prescott", playerNumber: "4", price: 419.9, primaryColor: "#FFFFFF", secondaryColor: "#041E42", fabricNote: NIKE_VAPOR },
  ],
  "denver-broncos": [
    { key: "nix-10-home-orange", image: `${BASE}/denver-broncos/nix-10-home-orange.jpg`, edition: "Home", editionLabel: "Vapor Limited Home", playerName: "Nix", playerNumber: "10", price: 399.9, primaryColor: "#FB4F14", secondaryColor: "#002244", fabricNote: NIKE_VAPOR },
    { key: "nix-10-away-white", image: `${BASE}/denver-broncos/nix-10-away-white.jpg`, edition: "Home", editionLabel: "Vapor Limited Away", playerName: "Nix", playerNumber: "10", price: 399.9, primaryColor: "#FFFFFF", secondaryColor: "#FB4F14", fabricNote: NIKE_VAPOR },
    { key: "nix-10-alternate-navy", image: `${BASE}/denver-broncos/nix-10-alternate-navy.jpg`, edition: "Home", editionLabel: "Vapor Alternate Navy", playerName: "Nix", playerNumber: "10", price: 399.9, primaryColor: "#002244", secondaryColor: "#FB4F14", fabricNote: NIKE_VAPOR },
    { key: "manning-18-2015-white", image: `${BASE}/denver-broncos/manning-18-2015-white.jpg`, edition: "Throwback", editionLabel: "Legacy 2015", playerName: "Manning", playerNumber: "18", price: 429.9, primaryColor: "#FFFFFF", secondaryColor: "#002244", fabricNote: MITCHELL },
  ],
  "detroit-lions": [
    { key: "goff-16-home-blue", image: `${BASE}/detroit-lions/goff-16-home-blue.jpg`, edition: "Home", editionLabel: "Vapor Limited Home", playerName: "Goff", playerNumber: "16", price: 399.9, primaryColor: "#0076B6", secondaryColor: "#B0B7BC", fabricNote: NIKE_VAPOR },
    { key: "goff-16-away-white", image: `${BASE}/detroit-lions/goff-16-away-white.jpg`, edition: "Home", editionLabel: "Vapor Limited Away", playerName: "Goff", playerNumber: "16", price: 399.9, primaryColor: "#FFFFFF", secondaryColor: "#0076B6", fabricNote: NIKE_VAPOR },
    { key: "goff-16-alternate-black", image: `${BASE}/detroit-lions/goff-16-alternate-black.jpg`, edition: "Home", editionLabel: "Vapor Alternate Motor City", playerName: "Goff", playerNumber: "16", price: 419.9, primaryColor: "#111317", secondaryColor: "#0076B6", fabricNote: NIKE_VAPOR },
  ],
  "green-bay-packers": [
    { key: "love-10-home-green", image: `${BASE}/green-bay-packers/love-10-home-green.jpg`, edition: "Home", editionLabel: "Game Home", playerName: "Love", playerNumber: "10", price: 349.9, primaryColor: "#203731", secondaryColor: "#FFB612", fabricNote: NIKE_GAME },
    { key: "rodgers-12-home-green", image: `${BASE}/green-bay-packers/rodgers-12-home-green.jpg`, edition: "Home", editionLabel: "Game Home", playerName: "Rodgers", playerNumber: "12", price: 349.9, primaryColor: "#203731", secondaryColor: "#FFB612", fabricNote: NIKE_GAME },
    { key: "rodgers-12-away-white", image: `${BASE}/green-bay-packers/rodgers-12-away-white.jpg`, edition: "Home", editionLabel: "Vapor Elite Away", playerName: "Rodgers", playerNumber: "12", price: 419.9, primaryColor: "#FFFFFF", secondaryColor: "#203731", fabricNote: NIKE_VAPOR },
    { key: "rodgers-12-vapor-green", image: `${BASE}/green-bay-packers/rodgers-12-vapor-green.jpg`, edition: "Throwback", editionLabel: "Vapor Clássica Home", playerName: "Rodgers", playerNumber: "12", price: 399.9, primaryColor: "#203731", secondaryColor: "#FFB612", fabricNote: NIKE_VAPOR },
  ],
  "houston-texans": [
    { key: "stroud-7-home-navy", image: `${BASE}/houston-texans/stroud-7-home-navy.jpg`, edition: "Home", editionLabel: "Vapor Limited Home", playerName: "Stroud", playerNumber: "7", price: 399.9, primaryColor: "#03202F", secondaryColor: "#A71930", fabricNote: NIKE_VAPOR },
    { key: "stroud-7-away-white", image: `${BASE}/houston-texans/stroud-7-away-white.jpg`, edition: "Home", editionLabel: "Vapor Limited Away", playerName: "Stroud", playerNumber: "7", price: 399.9, primaryColor: "#FFFFFF", secondaryColor: "#03202F", fabricNote: NIKE_VAPOR },
    { key: "stroud-7-alternate-red", image: `${BASE}/houston-texans/stroud-7-alternate-red.jpg`, edition: "Home", editionLabel: "Vapor Battle Red", playerName: "Stroud", playerNumber: "7", price: 399.9, primaryColor: "#A71930", secondaryColor: "#03202F", fabricNote: NIKE_VAPOR },
  ],
  "indianapolis-colts": [
    { key: "richardson-5-home-blue", image: `${BASE}/indianapolis-colts/richardson-5-home-blue.jpg`, edition: "Home", editionLabel: "Game Home", playerName: "Richardson", playerNumber: "5", price: 349.9, primaryColor: "#002C5F", secondaryColor: "#FFFFFF", fabricNote: NIKE_GAME },
    { key: "taylor-28-away-white", image: `${BASE}/indianapolis-colts/taylor-28-away-white.jpg`, edition: "Home", editionLabel: "Game Away", playerName: "Taylor", playerNumber: "28", price: 349.9, primaryColor: "#FFFFFF", secondaryColor: "#002C5F", fabricNote: NIKE_GAME },
    { key: "ryan-2-home-blue", image: `${BASE}/indianapolis-colts/ryan-2-home-blue.jpg`, edition: "Home", editionLabel: "Game Home", playerName: "Ryan", playerNumber: "2", price: 349.9, primaryColor: "#002C5F", secondaryColor: "#FFFFFF", fabricNote: NIKE_GAME },
    { key: "manning-18-1998-blue", image: `${BASE}/indianapolis-colts/manning-18-1998-blue.jpg`, edition: "Throwback", editionLabel: "Legacy 1998", playerName: "Manning", playerNumber: "18", price: 429.9, primaryColor: "#002C5F", secondaryColor: "#FFFFFF", fabricNote: MITCHELL },
  ],
  "jacksonville-jaguars": [
    { key: "lawrence-16-home-teal", image: `${BASE}/jacksonville-jaguars/lawrence-16-home-teal.jpg`, edition: "Home", editionLabel: "Game Home", playerName: "Lawrence", playerNumber: "16", price: 349.9, primaryColor: "#006778", secondaryColor: "#101820", fabricNote: NIKE_GAME },
    { key: "lawrence-16-away-white", image: `${BASE}/jacksonville-jaguars/lawrence-16-away-white.jpg`, edition: "Home", editionLabel: "Vapor Limited Away", playerName: "Lawrence", playerNumber: "16", price: 399.9, primaryColor: "#FFFFFF", secondaryColor: "#101820", fabricNote: NIKE_VAPOR },
    { key: "lawrence-16-alternate-black", image: `${BASE}/jacksonville-jaguars/lawrence-16-alternate-black.jpg`, edition: "Home", editionLabel: "Game Alternate Black", playerName: "Lawrence", playerNumber: "16", price: 369.9, primaryColor: "#101820", secondaryColor: "#006778", fabricNote: NIKE_GAME },
  ],
  "kansas-city-chiefs": [
    { key: "mahomes-15-home-red", image: `${BASE}/kansas-city-chiefs/mahomes-15-home-red.jpg`, edition: "Home", editionLabel: "Game Home", playerName: "Mahomes", playerNumber: "15", price: 349.9, originalPrice: 409.9, primaryColor: "#E31837", secondaryColor: "#FFB81C", fabricNote: NIKE_GAME, featured: true },
    { key: "mahomes-15-away-white", image: `${BASE}/kansas-city-chiefs/mahomes-15-away-white.jpg`, edition: "Home", editionLabel: "Game Away", playerName: "Mahomes", playerNumber: "15", price: 349.9, primaryColor: "#FFFFFF", secondaryColor: "#E31837", fabricNote: NIKE_GAME },
    { key: "kelce-87-home-red", image: `${BASE}/kansas-city-chiefs/kelce-87-home-red.jpg`, edition: "Home", editionLabel: "Game Home", playerName: "Kelce", playerNumber: "87", price: 349.9, primaryColor: "#E31837", secondaryColor: "#FFB81C", fabricNote: NIKE_GAME },
    { key: "kelce-87-away-white", image: `${BASE}/kansas-city-chiefs/kelce-87-away-white.jpg`, edition: "Home", editionLabel: "Vapor Limited Away", playerName: "Kelce", playerNumber: "87", price: 399.9, primaryColor: "#FFFFFF", secondaryColor: "#E31837", fabricNote: NIKE_VAPOR },
  ],
  "las-vegas-raiders": [
    { key: "adams-17-home-black", image: `${BASE}/las-vegas-raiders/adams-17-home-black.jpg`, edition: "Home", editionLabel: "Game Home", playerName: "Adams", playerNumber: "17", price: 349.9, primaryColor: "#111317", secondaryColor: "#A5ACAF", fabricNote: NIKE_GAME },
    { key: "adams-17-color-rush-white", image: `${BASE}/las-vegas-raiders/adams-17-color-rush-white.jpg`, edition: "Home", editionLabel: "Color Rush Away", playerName: "Adams", playerNumber: "17", price: 369.9, primaryColor: "#FFFFFF", secondaryColor: "#A5ACAF", fabricNote: NIKE_GAME },
  ],
  "los-angeles-chargers": [
    { key: "herbert-10-home-blue", image: `${BASE}/los-angeles-chargers/herbert-10-home-blue.jpg`, edition: "Home", editionLabel: "Game Home", playerName: "Herbert", playerNumber: "10", price: 349.9, primaryColor: "#0080C6", secondaryColor: "#FFC20E", fabricNote: NIKE_GAME },
    { key: "herbert-10-away-white", image: `${BASE}/los-angeles-chargers/herbert-10-away-white.jpg`, edition: "Home", editionLabel: "Vapor Limited Away", playerName: "Herbert", playerNumber: "10", price: 399.9, primaryColor: "#FFFFFF", secondaryColor: "#0080C6", fabricNote: NIKE_VAPOR },
  ],
  "los-angeles-rams": [
    { key: "stafford-9-home-blue", image: `${BASE}/los-angeles-rams/stafford-9-home-blue.jpg`, edition: "Home", editionLabel: "Game Home", playerName: "Stafford", playerNumber: "9", price: 349.9, primaryColor: "#003594", secondaryColor: "#FFA300", fabricNote: NIKE_GAME },
    { key: "stafford-9-throwback-white", image: `${BASE}/los-angeles-rams/stafford-9-throwback-white.jpg`, edition: "Throwback", editionLabel: "Modern Throwback Away", playerName: "Stafford", playerNumber: "9", price: 389.9, primaryColor: "#FFFFFF", secondaryColor: "#003594", fabricNote: NIKE_GAME },
    { key: "donald-99-throwback-white", image: `${BASE}/los-angeles-rams/donald-99-throwback-white.jpg`, edition: "Throwback", editionLabel: "Modern Throwback Away", playerName: "Donald", playerNumber: "99", price: 389.9, primaryColor: "#FFFFFF", secondaryColor: "#003594", fabricNote: NIKE_GAME },
  ],
  "miami-dolphins": [
    { key: "marino-13-home-aqua", image: `${BASE}/miami-dolphins/marino-13-home-aqua.jpg`, edition: "Home", editionLabel: "Game Home", playerName: "Marino", playerNumber: "13", price: 349.9, primaryColor: "#008E97", secondaryColor: "#FC4C02", fabricNote: NIKE_GAME },
    { key: "marino-13-throwback-white", image: `${BASE}/miami-dolphins/marino-13-throwback-white.jpg`, edition: "Throwback", editionLabel: "Game Throwback Away", playerName: "Marino", playerNumber: "13", price: 389.9, primaryColor: "#FFFFFF", secondaryColor: "#008E97", fabricNote: NIKE_GAME },
  ],
  "minnesota-vikings": [
    { key: "cousins-8-home-purple", image: `${BASE}/minnesota-vikings/cousins-8-home-purple.jpg`, edition: "Home", editionLabel: "Game Home", playerName: "Cousins", playerNumber: "8", price: 349.9, primaryColor: "#4F2683", secondaryColor: "#FFC62F", fabricNote: NIKE_GAME },
    { key: "jefferson-18-away-white", image: `${BASE}/minnesota-vikings/jefferson-18-away-white.jpg`, edition: "Home", editionLabel: "Vapor Limited Away", playerName: "Jefferson", playerNumber: "18", price: 399.9, primaryColor: "#FFFFFF", secondaryColor: "#4F2683", fabricNote: NIKE_VAPOR },
  ],
  "new-england-patriots": [
    { key: "maye-10-home-navy", image: `${BASE}/new-england-patriots/maye-10-home-navy.jpg`, edition: "Home", editionLabel: "Vapor Limited Home", playerName: "Maye", playerNumber: "10", price: 399.9, primaryColor: "#002244", secondaryColor: "#C60C30", fabricNote: NIKE_VAPOR },
    { key: "maye-10-away-white", image: `${BASE}/new-england-patriots/maye-10-away-white.jpg`, edition: "Home", editionLabel: "Game Away", playerName: "Maye", playerNumber: "10", price: 349.9, primaryColor: "#FFFFFF", secondaryColor: "#002244", fabricNote: NIKE_GAME },
    { key: "maye-10-throwback-red", image: `${BASE}/new-england-patriots/maye-10-throwback-red.jpg`, edition: "Throwback", editionLabel: "Game Throwback Red", playerName: "Maye", playerNumber: "10", price: 389.9, primaryColor: "#C60C30", secondaryColor: "#FFFFFF", fabricNote: NIKE_GAME },
    { key: "brady-12-home-navy", image: `${BASE}/new-england-patriots/brady-12-home-navy.jpg`, edition: "Home", editionLabel: "Game Home", playerName: "Brady", playerNumber: "12", price: 349.9, primaryColor: "#002244", secondaryColor: "#C60C30", fabricNote: NIKE_GAME },
    { key: "brady-12-away-white", image: `${BASE}/new-england-patriots/brady-12-away-white.jpg`, edition: "Home", editionLabel: "Game Away", playerName: "Brady", playerNumber: "12", price: 349.9, primaryColor: "#FFFFFF", secondaryColor: "#002244", fabricNote: NIKE_GAME },
    { key: "brady-12-throwback-red", image: `${BASE}/new-england-patriots/brady-12-throwback-red.jpg`, edition: "Throwback", editionLabel: "Game Throwback Red", playerName: "Brady", playerNumber: "12", price: 389.9, primaryColor: "#C60C30", secondaryColor: "#FFFFFF", fabricNote: NIKE_GAME },
  ],
  "new-orleans-saints": [
    { key: "kamara-41-home-black", image: `${BASE}/new-orleans-saints/kamara-41-home-black.jpg`, edition: "Home", editionLabel: "Game Home", playerName: "Kamara", playerNumber: "41", price: 349.9, primaryColor: "#101820", secondaryColor: "#D3BC8D", fabricNote: NIKE_GAME },
    { key: "kamara-41-color-rush-white", image: `${BASE}/new-orleans-saints/kamara-41-color-rush-white.jpg`, edition: "Throwback", editionLabel: "Color Rush Away", playerName: "Kamara", playerNumber: "41", price: 389.9, primaryColor: "#FFFFFF", secondaryColor: "#D3BC8D", fabricNote: NIKE_GAME },
    { key: "thomas-13-home-black", image: `${BASE}/new-orleans-saints/thomas-13-home-black.jpg`, edition: "Home", editionLabel: "Game Home", playerName: "Thomas", playerNumber: "13", price: 349.9, primaryColor: "#101820", secondaryColor: "#D3BC8D", fabricNote: NIKE_GAME },
  ],
  "new-york-giants": [
    { key: "dart-6-home-blue", image: `${BASE}/new-york-giants/dart-6-home-blue.jpg`, edition: "Home", editionLabel: "Vapor Limited Home", playerName: "Dart", playerNumber: "6", price: 399.9, primaryColor: "#0B2265", secondaryColor: "#FFFFFF", fabricNote: NIKE_VAPOR },
    { key: "dart-6-away-white", image: `${BASE}/new-york-giants/dart-6-away-white.jpg`, edition: "Home", editionLabel: "Vapor Limited Away", playerName: "Dart", playerNumber: "6", price: 399.9, primaryColor: "#FFFFFF", secondaryColor: "#0B2265", fabricNote: NIKE_VAPOR },
    { key: "dart-6-throwback-blue", image: `${BASE}/new-york-giants/dart-6-throwback-blue.jpg`, edition: "Throwback", editionLabel: "Legacy Throwback Blue", playerName: "Dart", playerNumber: "6", price: 419.9, primaryColor: "#0B2265", secondaryColor: "#A71930", fabricNote: NIKE_VAPOR },
  ],
  "new-york-jets": [
    { key: "rodgers-8-home-green", image: `${BASE}/new-york-jets/rodgers-8-home-green.jpg`, edition: "Home", editionLabel: "Game Home", playerName: "Rodgers", playerNumber: "8", price: 349.9, primaryColor: "#125740", secondaryColor: "#FFFFFF", fabricNote: NIKE_GAME },
    { key: "rodgers-8-away-white", image: `${BASE}/new-york-jets/rodgers-8-away-white.jpg`, edition: "Home", editionLabel: "Vapor Legacy Away", playerName: "Rodgers", playerNumber: "8", price: 399.9, primaryColor: "#FFFFFF", secondaryColor: "#125740", fabricNote: NIKE_VAPOR },
  ],
  "philadelphia-eagles": [
    { key: "hurts-1-home-green", image: `${BASE}/philadelphia-eagles/hurts-1-home-green.jpg`, edition: "Home", editionLabel: "Game Home", playerName: "Hurts", playerNumber: "1", price: 349.9, primaryColor: "#004C54", secondaryColor: "#A5ACAF", fabricNote: NIKE_GAME },
    { key: "hurts-1-away-white", image: `${BASE}/philadelphia-eagles/hurts-1-away-white.jpg`, edition: "Home", editionLabel: "Vapor Limited Away", playerName: "Hurts", playerNumber: "1", price: 399.9, primaryColor: "#FFFFFF", secondaryColor: "#004C54", fabricNote: NIKE_VAPOR },
    { key: "hurts-1-alternate-black", image: `${BASE}/philadelphia-eagles/hurts-1-alternate-black.jpg`, edition: "Home", editionLabel: "Vapor Alternate Black", playerName: "Hurts", playerNumber: "1", price: 399.9, primaryColor: "#111317", secondaryColor: "#004C54", fabricNote: NIKE_VAPOR },
    { key: "hurts-1-kelly-green", image: `${BASE}/philadelphia-eagles/hurts-1-kelly-green.jpg`, edition: "Throwback", editionLabel: "Vapor Kelly Green Throwback", playerName: "Hurts", playerNumber: "1", price: 419.9, primaryColor: "#008000", secondaryColor: "#FFFFFF", fabricNote: NIKE_VAPOR },
    { key: "barkley-26-away-white", image: `${BASE}/philadelphia-eagles/barkley-26-away-white.jpg`, edition: "Home", editionLabel: "Vapor Limited Away", playerName: "Barkley", playerNumber: "26", price: 399.9, primaryColor: "#FFFFFF", secondaryColor: "#004C54", fabricNote: NIKE_VAPOR },
  ],
  "pittsburgh-steelers": [
    { key: "watt-90-home-black", image: `${BASE}/pittsburgh-steelers/watt-90-home-black.jpg`, edition: "Home", editionLabel: "Vapor Limited Home", playerName: "Watt", playerNumber: "90", price: 399.9, primaryColor: "#101820", secondaryColor: "#FFB612", fabricNote: NIKE_VAPOR },
    { key: "polamalu-43-2005-black", image: `${BASE}/pittsburgh-steelers/polamalu-43-2005-black.jpg`, edition: "Throwback", editionLabel: "Legacy 2005", playerName: "Polamalu", playerNumber: "43", price: 429.9, primaryColor: "#101820", secondaryColor: "#FFB612", fabricNote: MITCHELL },
  ],
  "san-francisco-49ers": [
    { key: "purdy-13-home-red", image: `${BASE}/san-francisco-49ers/purdy-13-home-red.jpg`, edition: "Home", editionLabel: "Game Home", playerName: "Purdy", playerNumber: "13", price: 349.9, primaryColor: "#AA0000", secondaryColor: "#B3995D", fabricNote: NIKE_GAME },
    { key: "purdy-13-away-white", image: `${BASE}/san-francisco-49ers/purdy-13-away-white.jpg`, edition: "Home", editionLabel: "Game Away", playerName: "Purdy", playerNumber: "13", price: 349.9, primaryColor: "#FFFFFF", secondaryColor: "#AA0000", fabricNote: NIKE_GAME },
    { key: "mccaffrey-23-home-red", image: `${BASE}/san-francisco-49ers/mccaffrey-23-home-red.jpg`, edition: "Home", editionLabel: "Game Home", playerName: "McCaffrey", playerNumber: "23", price: 349.9, primaryColor: "#AA0000", secondaryColor: "#B3995D", fabricNote: NIKE_GAME },
    { key: "mccaffrey-23-away-white", image: `${BASE}/san-francisco-49ers/mccaffrey-23-away-white.jpg`, edition: "Home", editionLabel: "Game Away", playerName: "McCaffrey", playerNumber: "23", price: 349.9, primaryColor: "#FFFFFF", secondaryColor: "#AA0000", fabricNote: NIKE_GAME },
    { key: "kittle-85-home-red", image: `${BASE}/san-francisco-49ers/kittle-85-home-red.jpg`, edition: "Home", editionLabel: "Vapor Limited Home", playerName: "Kittle", playerNumber: "85", price: 399.9, primaryColor: "#AA0000", secondaryColor: "#B3995D", fabricNote: NIKE_VAPOR },
    { key: "kittle-85-away-white", image: `${BASE}/san-francisco-49ers/kittle-85-away-white.jpg`, edition: "Home", editionLabel: "Game Away", playerName: "Kittle", playerNumber: "85", price: 349.9, primaryColor: "#FFFFFF", secondaryColor: "#AA0000", fabricNote: NIKE_GAME },
    { key: "montana-16-1990-white", image: `${BASE}/san-francisco-49ers/montana-16-1990-white.jpg`, edition: "Throwback", editionLabel: "Legacy 1990", playerName: "Montana", playerNumber: "16", price: 429.9, primaryColor: "#FFFFFF", secondaryColor: "#AA0000", fabricNote: MITCHELL },
  ],
  "seattle-seahawks": [
    { key: "smith-njigba-11-home-navy", image: `${BASE}/seattle-seahawks/smith-njigba-11-home-navy.jpg`, edition: "Home", editionLabel: "Game Home", playerName: "Smith-Njigba", playerNumber: "11", price: 349.9, primaryColor: "#002244", secondaryColor: "#69BE28", fabricNote: NIKE_GAME },
    { key: "smith-njigba-11-throwback-blue", image: `${BASE}/seattle-seahawks/smith-njigba-11-throwback-blue.jpg`, edition: "Throwback", editionLabel: "Vapor Throwback Blue", playerName: "Smith-Njigba", playerNumber: "11", price: 419.9, primaryColor: "#005596", secondaryColor: "#69BE28", fabricNote: NIKE_VAPOR },
    { key: "metcalf-14-action-green", image: `${BASE}/seattle-seahawks/metcalf-14-action-green.jpg`, edition: "Home", editionLabel: "Vapor Action Green", playerName: "Metcalf", playerNumber: "14", price: 399.9, primaryColor: "#69BE28", secondaryColor: "#002244", fabricNote: NIKE_VAPOR },
  ],
  "tampa-bay-buccaneers": [
    { key: "mayfield-6-home-red", image: `${BASE}/tampa-bay-buccaneers/mayfield-6-home-red.jpg`, edition: "Home", editionLabel: "Vapor Limited Home", playerName: "Mayfield", playerNumber: "6", price: 399.9, primaryColor: "#D50A0A", secondaryColor: "#34302B", fabricNote: NIKE_VAPOR },
    { key: "mayfield-6-away-white", image: `${BASE}/tampa-bay-buccaneers/mayfield-6-away-white.jpg`, edition: "Home", editionLabel: "Game Away", playerName: "Mayfield", playerNumber: "6", price: 349.9, primaryColor: "#FFFFFF", secondaryColor: "#D50A0A", fabricNote: NIKE_GAME },
    { key: "mayfield-6-creamsicle-orange", image: `${BASE}/tampa-bay-buccaneers/mayfield-6-creamsicle-orange.jpg`, edition: "Throwback", editionLabel: "Vapor Creamsicle Throwback", playerName: "Mayfield", playerNumber: "6", price: 419.9, primaryColor: "#FF7900", secondaryColor: "#D50A0A", fabricNote: NIKE_VAPOR },
    { key: "brady-12-home-red", image: `${BASE}/tampa-bay-buccaneers/brady-12-home-red.jpg`, edition: "Home", editionLabel: "Vapor Limited Home", playerName: "Brady", playerNumber: "12", price: 399.9, primaryColor: "#D50A0A", secondaryColor: "#34302B", fabricNote: NIKE_VAPOR },
    { key: "brady-12-alternate-pewter", image: `${BASE}/tampa-bay-buccaneers/brady-12-alternate-pewter.jpg`, edition: "Home", editionLabel: "Game Alternate Pewter", playerName: "Brady", playerNumber: "12", price: 369.9, primaryColor: "#34302B", secondaryColor: "#D50A0A", fabricNote: NIKE_GAME },
  ],
  "tennessee-titans": [
    { key: "tate-14-home-blue", image: `${BASE}/tennessee-titans/tate-14-home-blue.jpg`, edition: "Home", editionLabel: "Game Home", playerName: "Tate", playerNumber: "14", price: 349.9, primaryColor: "#4B92DB", secondaryColor: "#C8102E", fabricNote: NIKE_GAME },
  ],
  "washington-commanders": [
    { key: "daniels-5-home-burgundy", image: `${BASE}/washington-commanders/daniels-5-home-burgundy.jpg`, edition: "Home", editionLabel: "Vapor Limited Home", playerName: "Daniels", playerNumber: "5", price: 399.9, primaryColor: "#5A1414", secondaryColor: "#FFB612", fabricNote: NIKE_VAPOR },
    { key: "daniels-5-away-white", image: `${BASE}/washington-commanders/daniels-5-away-white.jpg`, edition: "Home", editionLabel: "Game Away", playerName: "Daniels", playerNumber: "5", price: 349.9, primaryColor: "#FFFFFF", secondaryColor: "#5A1414", fabricNote: NIKE_GAME },
  ],
};
