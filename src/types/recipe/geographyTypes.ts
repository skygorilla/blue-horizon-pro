export type Continent = 
  | 'europe' 
  | 'asia' 
  | 'africa' 
  | 'north-america' 
  | 'south-america' 
  | 'australia-oceania' 
  | 'antarctica';

export type Region =
  | 'mediterranean' 
  | 'balkan' 
  | 'scandinavian' 
  | 'eastern-european' 
  | 'central-european' 
  | 'western-european'
  | 'south-asian' 
  | 'east-asian' 
  | 'southeast-asian' 
  | 'middle-eastern' 
  | 'central-asian'
  | 'north-african' 
  | 'west-african' 
  | 'east-african' 
  | 'south-african'
  | 'american' 
  | 'canadian' 
  | 'mexican'
  | 'brazilian' 
  | 'peruvian' 
  | 'argentinian' 
  | 'andean'
  | 'australian' 
  | 'maori' 
  | 'polynesian';

export const CONTINENTS = [
  { value: 'europe' as Continent, label: 'Europa' },
  { value: 'asia' as Continent, label: 'Azija' },
  { value: 'africa' as Continent, label: 'Afrika' },
  { value: 'north-america' as Continent, label: 'Sjeverna Amerika' },
  { value: 'south-america' as Continent, label: 'South America' },
  { value: 'australia-oceania' as Continent, label: 'Australija i Oceanija' },
  { value: 'antarctica' as Continent, label: 'Antarktika' }
];

export const REGIONS: Record<Continent, Array<{ value: Region, label: string }>> = {
  'europe': [
    { value: 'mediterranean', label: 'Mediteranska' },
    { value: 'balkan', label: 'Balkanska' },
    { value: 'scandinavian', label: 'Skandinavska' },
    { value: 'eastern-european', label: 'Istočnoeuropska' },
    { value: 'central-european', label: 'Srednjoeuropska' },
    { value: 'western-european', label: 'Zapadnoeuropska' }
  ],
  'asia': [
    { value: 'south-asian', label: 'South Asian' },
    { value: 'east-asian', label: 'Istočnoazijska' },
    { value: 'southeast-asian', label: 'Jugoistočna azijska' },
    { value: 'middle-eastern', label: 'Bliskoistočna' },
    { value: 'central-asian', label: 'Centralna azijska' }
  ],
  'africa': [
    { value: 'north-african', label: 'Sjevernoafrička' },
    { value: 'west-african', label: 'Zapadnoafrička' },
    { value: 'east-african', label: 'Istočnoafrička' },
    { value: 'south-african', label: 'Southern African' }
  ],
  'north-america': [
    { value: 'american', label: 'Američka' },
    { value: 'canadian', label: 'Kanadska' },
    { value: 'mexican', label: 'Meksička' }
  ],
  'south-america': [
    { value: 'brazilian', label: 'Brazil' },
    { value: 'peruvian', label: 'Peru' },
    { value: 'argentinian', label: 'Argentina' },
    { value: 'andean', label: 'Andska regija' }
  ],
  'australia-oceania': [
    { value: 'australian', label: 'Australija moderna' },
    { value: 'maori', label: 'Maorska (NZ)' },
    { value: 'polynesian', label: 'Polinezijska' }
  ],
  'antarctica': []
};

export const LOCAL_CUISINES = [
  { value: 'dalmatian', label: 'Dalmatinska' },
  { value: 'istrian', label: 'Istarska' },
  { value: 'sicilian', label: 'Sicilijanska' },
  { value: 'roman', label: 'Rimska' },
  { value: 'neapolitan', label: 'Napuljska' },
  { value: 'provencal', label: 'Provansalska' },
  { value: 'basque', label: 'Baskijska' },
  { value: 'istanbul', label: 'Istanbulska' },
  { value: 'punjabi', label: 'Punjabska' },
  { value: 'kerala', label: 'Keralanska' },
  { value: 'sichuan', label: 'Sečuanska' },
  { value: 'cantonese', label: 'Kantonska' },
  { value: 'tokyo', label: 'Tokijska' },
  { value: 'oaxaca', label: 'Oaxaca' },
  { value: 'yucatan', label: 'Yucatán' },
  { value: 'fes', label: 'Marokanska (Fes)' },
  { value: 'ethiopian', label: 'Etiopska' },
  { value: 'new-orleans', label: 'New Orleans (Cajun)' },
  { value: 'tex-mex', label: 'Tex-Mex' },
  { value: 'california', label: 'Kalifornijska' }
];

export const getContinentDisplayName = (continent: Continent): string => {
  switch (continent) {
    case 'europe': return 'Europa';
    case 'asia': return 'Azija';
    case 'africa': return 'Afrika';
    case 'north-america': return 'Sjeverna Amerika';
    case 'south-america': return 'South America';
    case 'australia-oceania': return 'Australija i Oceanija';
    case 'antarctica': return 'Antarktika';
    default: return continent;
  }
};
