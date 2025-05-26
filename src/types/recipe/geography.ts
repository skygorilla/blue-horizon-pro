// Define the global geography hierarchy
export enum Continent {
  Asia = "Asia",
  Europe = "Europe",
  Africa = "Africa",
  NorthAmerica = "North America",
  SouthAmerica = "South America",
  Oceania = "Oceania",
  Antarctica = "Antarctica"
}

export const CONTINENTS: { value: Continent; label: string }[] =
  Object.values(Continent).map(c => ({ value: c, label: c }));

export interface Country {
  value: string;
  label: string;
  continent: Continent;
}

export const COUNTRIES: Country[] = [
  { value: "Afghanistan", label: "Afghanistan", continent: Continent.Asia },
  { value: "Armenia", label: "Armenia", continent: Continent.Asia },
  { value: "Azerbaijan", label: "Azerbaijan", continent: Continent.Asia },
  { value: "Bahrain", label: "Bahrain", continent: Continent.Asia },
  { value: "Bangladesh", label: "Bangladesh", continent: Continent.Asia },
  { value: "Bhutan", label: "Bhutan", continent: Continent.Asia },
  { value: "Brunei", label: "Brunei", continent: Continent.Asia },
  { value: "Cambodia", label: "Cambodia", continent: Continent.Asia },
  { value: "China", label: "China", continent: Continent.Asia },
  { value: "Cyprus", label: "Cyprus", continent: Continent.Asia },
  { value: "Georgia", label: "Georgia", continent: Continent.Asia },
  { value: "India", label: "India", continent: Continent.Asia },
  { value: "Indonesia", label: "Indonesia", continent: Continent.Asia },
  { value: "Iran", label: "Iran", continent: Continent.Asia },
  { value: "Iraq", label: "Iraq", continent: Continent.Asia },
  { value: "Israel", label: "Israel", continent: Continent.Asia },
  { value: "Japan", label: "Japan", continent: Continent.Asia },
  { value: "Jordan", label: "Jordan", continent: Continent.Asia },
  { value: "Kazakhstan", label: "Kazakhstan", continent: Continent.Asia },
  { value: "Kuwait", label: "Kuwait", continent: Continent.Asia },
  { value: "Kyrgyzstan", label: "Kyrgyzstan", continent: Continent.Asia },
  { value: "Laos", label: "Laos", continent: Continent.Asia },
  { value: "Lebanon", label: "Lebanon", continent: Continent.Asia },
  { value: "Malaysia", label: "Malaysia", continent: Continent.Asia },
  { value: "Maldives", label: "Maldives", continent: Continent.Asia },
  { value: "Mongolia", label: "Mongolia", continent: Continent.Asia },
  { value: "Myanmar", label: "Myanmar", continent: Continent.Asia },
  { value: "Nepal", label: "Nepal", continent: Continent.Asia },
  { value: "North Korea", label: "North Korea", continent: Continent.Asia },
  { value: "Oman", label: "Oman", continent: Continent.Asia },
  { value: "Pakistan", label: "Pakistan", continent: Continent.Asia },
  { value: "Palestine", label: "Palestine", continent: Continent.Asia },
  { value: "Philippines", label: "Philippines", continent: Continent.Asia },
  { value: "Qatar", label: "Qatar", continent: Continent.Asia },
  { value: "Saudi Arabia", label: "Saudi Arabia", continent: Continent.Asia },
  { value: "Singapore", label: "Singapore", continent: Continent.Asia },
  { value: "South Korea", label: "South Korea", continent: Continent.Asia },
  { value: "Sri Lanka", label: "Sri Lanka", continent: Continent.Asia },
  { value: "Syria", label: "Syria", continent: Continent.Asia },
  { value: "Taiwan", label: "Taiwan", continent: Continent.Asia },
  { value: "Tajikistan", label: "Tajikistan", continent: Continent.Asia },
  { value: "Thailand", label: "Thailand", continent: Continent.Asia },
  { value: "Timor-Leste", label: "Timor-Leste", continent: Continent.Asia },
  { value: "Turkey", label: "Turkey", continent: Continent.Asia },
  { value: "Turkmenistan", label: "Turkmenistan", continent: Continent.Asia },
  { value: "United Arab Emirates", label: "United Arab Emirates", continent: Continent.Asia },
  { value: "Uzbekistan", label: "Uzbekistan", continent: Continent.Asia },
  { value: "Vietnam", label: "Vietnam", continent: Continent.Asia },
  { value: "Yemen", label: "Yemen", continent: Continent.Asia },
  // ... Add other continents and countries here ...
];

export interface Region {
  value: string;
  label: string;
  country: string;
}

export const REGIONS: Record<string, Region[]> = {
  India: [
    { value: "Punjab", label: "Punjab", country: "India" },
    { value: "Tamil Nadu", label: "Tamil Nadu", country: "India" },
  ],
  France: [
    { value: "Île-de-France", label: "Île-de-France", country: "France" },
    { value: "Provence", label: "Provence", country: "France" },
  ],
  Kenya: [
    { value: "Nairobi", label: "Nairobi", country: "Kenya" },
    { value: "Mombasa", label: "Mombasa", country: "Kenya" },
  ],
  "United States": [
    { value: "California", label: "California", country: "United States" },
    { value: "Texas", label: "Texas", country: "United States" },
  ],
  Brazil: [
    { value: "São Paulo", label: "São Paulo", country: "Brazil" },
    { value: "Rio de Janeiro", label: "Rio de Janeiro", country: "Brazil" },
  ],
  Australia: [
    { value: "New South Wales", label: "New South Wales", country: "Australia" },
    { value: "Victoria", label: "Victoria", country: "Australia" },
  ],
};

export interface Town {
  value: string;
  label: string;
  region: string;
}

export const TOWNS: Record<string, Town[]> = {
  Punjab: [
    { value: "Amritsar", label: "Amritsar", region: "Punjab" },
    { value: "Ludhiana", label: "Ludhiana", region: "Punjab" },
  ],
  "Île-de-France": [
    { value: "Paris", label: "Paris", region: "Île-de-France" },
    { value: "Versailles", label: "Versailles", region: "Île-de-France" },
  ],
  Nairobi: [
    { value: "Westlands", label: "Westlands", region: "Nairobi" },
    { value: "Karen", label: "Karen", region: "Nairobi" },
  ],
  California: [
    { value: "Los Angeles", label: "Los Angeles", region: "California" },
    { value: "San Francisco", label: "San Francisco", region: "California" },
  ],
  "São Paulo": [
    { value: "Campinas", label: "Campinas", region: "São Paulo" },
    { value: "Santos", label: "Santos", region: "São Paulo" },
  ],
  "New South Wales": [
    { value: "Sydney", label: "Sydney", region: "New South Wales" },
    { value: "Newcastle", label: "Newcastle", region: "New South Wales" },
  ],
};
