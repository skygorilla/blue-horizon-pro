import { Globe } from 'lucide-react';
import type { ReactNode } from 'react';

export interface MenuItemData {
  name: string;
  icon?: ReactNode;
  dropdown?: MenuItemData[];
  price?: number;
}

// We'll create the icon in the component instead of storing JSX in the data
export const menuData: MenuItemData[] = [
  {
    name: "Meal Type",
    dropdown: [
      { name: "Appetizer" },
      { name: "Main Course" },
      { name: "Soup" },
      { name: "Side Dish" },
      { name: "Dessert" },
      { name: "Breakfast" },
      { name: "Brunch" },
      { name: "Lunch" },
      { name: "Dinner" },
      { name: "Light Dinner" },
      { name: "Beverage" },
      { name: "Snack" },
      { name: "Sauce" },
      { name: "Bakery Product" },
      { name: "Cocktail" },
      { name: "Salad" }
    ]
  },
  {
    name: "Continental Structure",
    dropdown: [
      {
        name: "Asia",
        dropdown: [
          { name: "Afghanistan", dropdown: [ { name: "Pashtun" }, { name: "Herati" }, { name: "Kandahari" }, { name: "Kabuli" } ] },
          { name: "Armenia", dropdown: [ { name: "Yerevan" }, { name: "Shirak" }, { name: "Ararat" }, { name: "Gyumri" } ] },
          { name: "Azerbaijan", dropdown: [ { name: "Baku" }, { name: "Shirvan" }, { name: "Nakhchivan" }, { name: "Ganja" } ] },
          { name: "Bahrain", dropdown: [ { name: "Manama" }, { name: "Muharraq" }, { name: "Riffa" } ] },
          { name: "Bangladesh", dropdown: [ { name: "Dhaka" }, { name: "Chittagong" }, { name: "Sylhet" }, { name: "Khulna" } ] },
          { name: "Bhutan", dropdown: [ { name: "Thimphu" }, { name: "Paro" }, { name: "Punakha" } ] },
          { name: "Brunei", dropdown: [ { name: "Bandar Seri Begawan" }, { name: "Kampong Ayer" }, { name: "Temburong" } ] },
          { name: "Cambodia", dropdown: [ { name: "Phnom Penh" }, { name: "Siem Reap" }, { name: "Battambang" }, { name: "Kampot" } ] },
          { name: "China", dropdown: [ { name: "Cantonese" }, { name: "Sichuan" }, { name: "Shanghainese" }, { name: "Hunan" }, { name: "Beijing" }, { name: "Fujian" }, { name: "Anhui" }, { name: "Zhejiang" } ] },
          { name: "Cyprus", dropdown: [ { name: "Nicosia" }, { name: "Limassol" }, { name: "Paphos" }, { name: "Larnaca" } ] },
          { name: "Georgia", dropdown: [ { name: "Tbilisi" }, { name: "Kakheti" }, { name: "Imereti" }, { name: "Adjara" } ] },
          { name: "India", dropdown: [ { name: "Punjabi" }, { name: "Tamil" }, { name: "Bengali" }, { name: "Gujarati" }, { name: "Rajasthani" }, { name: "Kashmiri" }, { name: "Hyderabadi" }, { name: "Goan" }, { name: "Mughlai" }, { name: "Keralite" } ] },
          { name: "Indonesia", dropdown: [ { name: "Javanese" }, { name: "Sundanese" }, { name: "Balinese" }, { name: "Padang" }, { name: "Manado" } ] },
          { name: "Iran", dropdown: [ { name: "Tehran" }, { name: "Isfahan" }, { name: "Shiraz" }, { name: "Gilan" }, { name: "Azeri" } ] },
          { name: "Iraq", dropdown: [ { name: "Baghdad" }, { name: "Mosul" }, { name: "Basra" }, { name: "Kurdish" } ] },
          { name: "Israel", dropdown: [ { name: "Jerusalem" }, { name: "Tel Aviv" }, { name: "Galilee" }, { name: "Negev" } ] },
          { name: "Japan", dropdown: [ { name: "Tokyo" }, { name: "Kyoto" }, { name: "Osaka" }, { name: "Hokkaido" }, { name: "Okinawan" } ] },
          { name: "Jordan", dropdown: [ { name: "Amman" }, { name: "Petra" }, { name: "Bedouin" }, { name: "Aqaba" } ] },
          { name: "Kazakhstan", dropdown: [ { name: "Almaty" }, { name: "Astana" }, { name: "Nomadic" }, { name: "Uzbek" } ] },
          { name: "Kuwait", dropdown: [ { name: "Kuwait City" }, { name: "Bedouin" }, { name: "Hawalli" } ] },
          { name: "Kyrgyzstan", dropdown: [ { name: "Bishkek" }, { name: "Osh" }, { name: "Nomadic" }, { name: "Chuy" } ] },
          { name: "Laos", dropdown: [ { name: "Vientiane" }, { name: "Luang Prabang" }, { name: "Pakse" } ] },
          { name: "Lebanon", dropdown: [ { name: "Beirut" }, { name: "Tripoli" }, { name: "Bekaa" }, { name: "Sidon" } ] },
          { name: "Malaysia", dropdown: [ { name: "Malay" }, { name: "Chinese" }, { name: "Indian" }, { name: "Peranakan" }, { name: "Sarawak" } ] },
          { name: "Maldives", dropdown: [ { name: "Malé" }, { name: "Atoll" }, { name: "Dhivehi" } ] },
          { name: "Mongolia", dropdown: [ { name: "Ulaanbaatar" }, { name: "Gobi" }, { name: "Nomadic" }, { name: "Khövsgöl" } ] },
          { name: "Myanmar", dropdown: [ { name: "Yangon" }, { name: "Mandalay" }, { name: "Shan" }, { name: "Rakhine" } ] },
          { name: "Nepal", dropdown: [ { name: "Kathmandu" }, { name: "Pokhara" }, { name: "Terai" }, { name: "Himalayan" } ] },
          { name: "North Korea", dropdown: [ { name: "Pyongyang" }, { name: "Hamhung" }, { name: "Kaesong" } ] },
          { name: "Oman", dropdown: [ { name: "Muscat" }, { name: "Dhofar" }, { name: "Bedouin" }, { name: "Nizwa" } ] },
          { name: "Pakistan", dropdown: [ { name: "Punjabi" }, { name: "Sindhi" }, { name: "Baloch" }, { name: "Pashtun" }, { name: "Karachi" } ] },
          { name: "Palestine", dropdown: [ { name: "Gaza" }, { name: "West Bank" }, { name: "Jerusalem" }, { name: "Hebron" } ] },
          { name: "Philippines", dropdown: [ { name: "Luzon" }, { name: "Visayan" }, { name: "Mindanao" }, { name: "Bicol" }, { name: "Ilocano" } ] },
          { name: "Qatar", dropdown: [ { name: "Doha" }, { name: "Bedouin" }, { name: "Al Khor" } ] },
          { name: "Saudi Arabia", dropdown: [ { name: "Riyadh" }, { name: "Hejaz" }, { name: "Najd" }, { name: "Asir" } ] },
          { name: "Singapore", dropdown: [ { name: "Chinese" }, { name: "Malay" }, { name: "Indian" }, { name: "Peranakan" } ] },
          { name: "South Korea", dropdown: [ { name: "Seoul" }, { name: "Jeju" }, { name: "Busan" }, { name: "Gyeongsang" } ] },
          { name: "Sri Lanka", dropdown: [ { name: "Colombo" }, { name: "Kandy" }, { name: "Jaffna" }, { name: "Galle" } ] },
          { name: "Syria", dropdown: [ { name: "Damascus" }, { name: "Aleppo" }, { name: "Homs" }, { name: "Latakia" } ] },
          { name: "Taiwan", dropdown: [ { name: "Taipei" }, { name: "Tainan" }, { name: "Hakka" }, { name: "Indigenous" } ] },
          { name: "Tajikistan", dropdown: [ { name: "Dushanbe" }, { name: "Pamiri" }, { name: "Khujand" } ] },
          { name: "Thailand", dropdown: [ { name: "Bangkok" }, { name: "Northern" }, { name: "Isan" }, { name: "Southern" } ] },
          { name: "Timor-Leste", dropdown: [ { name: "Dili" }, { name: "Baucau" }, { name: "Tetum" } ] },
          { name: "Turkey", dropdown: [ { name: "Istanbul" }, { name: "Anatolian" }, { name: "Black Sea" }, { name: "Aegean" }, { name: "Kurdish" } ] },
          { name: "Turkmenistan", dropdown: [ { name: "Ashgabat" }, { name: "Balkan" }, { name: "Nomadic" } ] },
          { name: "United Arab Emirates", dropdown: [ { name: "Dubai" }, { name: "Abu Dhabi" }, { name: "Bedouin" }, { name: "Sharjah" } ] },
          { name: "Uzbekistan", dropdown: [ { name: "Tashkent" }, { name: "Samarkand" }, { name: "Bukhara" }, { name: "Fergana" } ] },
          { name: "Vietnam", dropdown: [ { name: "Hanoi" }, { name: "Ho Chi Minh" }, { name: "Hue" }, { name: "Mekong Delta" } ] },
          { name: "Yemen", dropdown: [ { name: "Sana’a" }, { name: "Aden" }, { name: "Hadramaut" } ] }
        ]
      },
      {
        name: "Europe",
        dropdown: [
          { name: "Albania", dropdown: [ { name: "Tirana" }, { name: "Northern" }, { name: "Southern" }, { name: "Korça" } ] },
          { name: "Andorra", dropdown: [ { name: "Andorra la Vella" }, { name: "Escaldes" }, { name: "Canillo" } ] },
          { name: "Austria", dropdown: [ { name: "Viennese" }, { name: "Tyrolean" }, { name: "Styrian" }, { name: "Carinthian" } ] },
          { name: "Belarus", dropdown: [ { name: "Minsk" }, { name: "Brest" }, { name: "Grodno" }, { name: "Vitebsk" } ] },
          { name: "Belgium", dropdown: [ { name: "Flemish" }, { name: "Walloon" }, { name: "Brussels" }, { name: "Liège" } ] },
          { name: "Bosnia and Herzegovina", dropdown: [ { name: "Sarajevo" }, { name: "Mostar" }, { name: "Banja Luka" } ] },
          { name: "Bulgaria", dropdown: [ { name: "Sofia" }, { name: "Plovdiv" }, { name: "Rhodope" }, { name: "Black Sea" } ] },
          { name: "Croatia", dropdown: [ { name: "Dalmatian" }, { name: "Zagorje" }, { name: "Istrian" }, { name: "Slavonian" }, { name: "Lika" }, { name: "Međimurje" } ] },
          { name: "Czech Republic", dropdown: [ { name: "Prague" }, { name: "Bohemian" }, { name: "Moravian" }, { name: "Silesian" } ] },
          { name: "Denmark", dropdown: [ { name: "Copenhagen" }, { name: "Jutland" }, { name: "Funen" }, { name: "Zealand" } ] },
          { name: "Estonia", dropdown: [ { name: "Tallinn" }, { name: "Saaremaa" }, { name: "Tartu" } ] },
          { name: "Finland", dropdown: [ { name: "Helsinki" }, { name: "Lapland" }, { name: "Karelian" }, { name: "Ostrobothnian" } ] },
          { name: "France", dropdown: [ { name: "Provençal" }, { name: "Breton" }, { name: "Alsatian" }, { name: "Lyonnaise" }, { name: "Normandy" }, { name: "Parisian" } ] },
          { name: "Germany", dropdown: [ { name: "Bavarian" }, { name: "Swabian" }, { name: "Saxon" }, { name: "Rhenish" }, { name: "Franconian" } ] },
          { name: "Greece", dropdown: [ { name: "Athenian" }, { name: "Cretan" }, { name: "Macedonian" }, { name: "Ionian" }, { name: "Peloponnesian" } ] },
          { name: "Hungary", dropdown: [ { name: "Budapest" }, { name: "Transdanubian" }, { name: "Great Plain" }, { name: "Tisza" } ] },
          { name: "Iceland", dropdown: [ { name: "Reykjavik" }, { name: "Northern" }, { name: "Eastern" } ] },
          { name: "Ireland", dropdown: [ { name: "Dublin" }, { name: "Cork" }, { name: "Galway" }, { name: "Connemara" } ] },
          { name: "Italy", dropdown: [ { name: "Tuscan" }, { name: "Sicilian" }, { name: "Emilian" }, { name: "Venetian" }, { name: "Piedmontese" }, { name: "Neapolitan" } ] },
          { name: "Kosovo", dropdown: [ { name: "Pristina" }, { name: "Prizren" }, { name: "Peja" } ] },
          { name: "Latvia", dropdown: [ { name: "Riga" }, { name: "Latgale" }, { name: "Kurzeme" }, { name: "Vidzeme" } ] },
          { name: "Liechtenstein", dropdown: [ { name: "Vaduz" }, { name: "Triesenberg" } ] },
          { name: "Lithuania", dropdown: [ { name: "Vilnius" }, { name: "Samogitian" }, { name: "Aukštaitian" } ] },
          { name: "Luxembourg", dropdown: [ { name: "Luxembourg City" }, { name: "Moselle" }, { name: "Ardennes" } ] },
          { name: "Malta", dropdown: [ { name: "Valletta" }, { name: "Gozo" }, { name: "Mdina" } ] },
          { name: "Moldova", dropdown: [ { name: "Chișinău" }, { name: "Gagauz" }, { name: "Transnistrian" } ] },
          { name: "Monaco", dropdown: [ { name: "Monte Carlo" }, { name: "La Condamine" } ] },
          { name: "Montenegro", dropdown: [ { name: "Podgorica" }, { name: "Coastal" }, { name: "Northern" } ] },
          { name: "Netherlands", dropdown: [ { name: "Amsterdam" }, { name: "Frisian" }, { name: "Limburg" }, { name: "Zeeland" } ] },
          { name: "North Macedonia", dropdown: [ { name: "Skopje" }, { name: "Ohrid" }, { name: "Bitola" } ] },
          { name: "Norway", dropdown: [ { name: "Oslo" }, { name: "Western" }, { name: "Northern" }, { name: "Trøndelag" } ] },
          { name: "Poland", dropdown: [ { name: "Warsaw" }, { name: "Krakow" }, { name: "Gdansk" }, { name: "Silesian" } ] },
          { name: "Portugal", dropdown: [ { name: "Lisbon" }, { name: "Porto" }, { name: "Algarve" }, { name: "Madeira" } ] },
          { name: "Romania", dropdown: [ { name: "Bucharest" }, { name: "Transylvania" }, { name: "Moldavia" }, { name: "Dobruja" } ] },
          { name: "Russia", dropdown: [ { name: "Moscow" }, { name: "Saint Petersburg" }, { name: "Siberian" }, { name: "Caucasian" } ] },
          { name: "San Marino", dropdown: [ { name: "San Marino City" }, { name: "Monte Titano" } ] },
          { name: "Serbia", dropdown: [ { name: "Belgrade" }, { name: "Vojvodina" }, { name: "Šumadija" } ] },
          { name: "Slovakia", dropdown: [ { name: "Bratislava" }, { name: "Tatras" }, { name: "Eastern" } ] },
          { name: "Slovenia", dropdown: [ { name: "Ljubljana" }, { name: "Alpine" }, { name: "Karst" } ] },
          { name: "Spain", dropdown: [ { name: "Madrid" }, { name: "Catalonia" }, { name: "Basque" }, { name: "Andalusian" } ] },
          { name: "Sweden", dropdown: [ { name: "Stockholm" }, { name: "Gothenburg" }, { name: "Northern" }, { name: "Skåne" } ] },
          { name: "Switzerland", dropdown: [ { name: "Zurich" }, { name: "Geneva" }, { name: "Bernese" }, { name: "Ticino" } ] },
          { name: "Ukraine", dropdown: [ { name: "Kyiv" }, { name: "Lviv" }, { name: "Odessa" }, { name: "Crimean" } ] },
          { name: "United Kingdom", dropdown: [ { name: "London" }, { name: "Scottish" }, { name: "Welsh" }, { name: "Northern Irish" } ] },
          { name: "Vatican City", dropdown: [ { name: "Vatican" } ] }
        ]
      },
      {
        name: "Africa",
        dropdown: [
          { name: "Algeria", dropdown: [ { name: "Algiers" }, { name: "Kabyle" }, { name: "Saharan" }, { name: "Oran" } ] },
          { name: "Angola", dropdown: [ { name: "Luanda" }, { name: "Benguela" }, { name: "Cabinda" } ] },
          { name: "Benin", dropdown: [ { name: "Porto-Novo" }, { name: "Cotonou" }, { name: "Dahomey" } ] },
          { name: "Botswana", dropdown: [ { name: "Gaborone" }, { name: "Kalahari" }, { name: "Okavango" } ] },
          { name: "Burkina Faso", dropdown: [ { name: "Ouagadougou" }, { name: "Bobo-Dioulasso" } ] },
          { name: "Burundi", dropdown: [ { name: "Bujumbura" }, { name: "Gitega" } ] },
          { name: "Cameroon", dropdown: [ { name: "Yaoundé" }, { name: "Douala" }, { name: "Bamenda" } ] },
          { name: "Cape Verde", dropdown: [ { name: "Praia" }, { name: "Mindelo" } ] },
          { name: "Central African Republic", dropdown: [ { name: "Bangui" }, { name: "Berbérati" } ] },
          { name: "Chad", dropdown: [ { name: "N'Djamena" }, { name: "Abeche" } ] },
          { name: "Comoros", dropdown: [ { name: "Moroni" }, { name: "Anjouan" } ] },
          { name: "Congo", dropdown: [ { name: "Brazzaville" }, { name: "Pointe-Noire" } ] },
          { name: "Djibouti", dropdown: [ { name: "Djibouti City" }, { name: "Ali Sabieh" } ] },
          { name: "Egypt", dropdown: [ { name: "Cairo" }, { name: "Alexandria" }, { name: "Luxor" }, { name: "Aswan" } ] },
          { name: "Equatorial Guinea", dropdown: [ { name: "Malabo" }, { name: "Bata" } ] },
          { name: "Eritrea", dropdown: [ { name: "Asmara" }, { name: "Massawa" } ] },
          { name: "Eswatini", dropdown: [ { name: "Mbabane" }, { name: "Manzini" } ] },
          { name: "Ethiopia", dropdown: [ { name: "Addis Ababa" }, { name: "Gondar" }, { name: "Axum" } ] },
          { name: "Gabon", dropdown: [ { name: "Libreville" }, { name: "Port-Gentil" } ] },
          { name: "Gambia", dropdown: [ { name: "Banjul" }, { name: "Serekunda" } ] },
          { name: "Ghana", dropdown: [ { name: "Accra" }, { name: "Kumasi" }, { name: "Tamale" } ] },
          { name: "Guinea", dropdown: [ { name: "Conakry" }, { name: "Kankan" } ] },
          { name: "Guinea-Bissau", dropdown: [ { name: "Bissau" }, { name: "Cacheu" } ] },
          { name: "Ivory Coast", dropdown: [ { name: "Abidjan" }, { name: "Yamoussoukro" } ] },
          { name: "Kenya", dropdown: [ { name: "Nairobi" }, { name: "Mombasa" }, { name: "Kisumu" } ] },
          { name: "Lesotho", dropdown: [ { name: "Maseru" }, { name: "Teyateyaneng" } ] },
          { name: "Liberia", dropdown: [ { name: "Monrovia" }, { name: "Gbarnga" } ] },
          { name: "Libya", dropdown: [ { name: "Tripoli" }, { name: "Benghazi" } ] },
          { name: "Madagascar", dropdown: [ { name: "Antananarivo" }, { name: "Toamasina" } ] },
          { name: "Malawi", dropdown: [ { name: "Lilongwe" }, { name: "Blantyre" } ] },
          { name: "Mali", dropdown: [ { name: "Bamako" }, { name: "Timbuktu" } ] },
          { name: "Mauritania", dropdown: [ { name: "Nouakchott" }, { name: "Nouadhibou" } ] },
          { name: "Mauritius", dropdown: [ { name: "Port Louis" }, { name: "Curepipe" } ] },
          { name: "Morocco", dropdown: [ { name: "Rabat" }, { name: "Casablanca" }, { name: "Marrakech" } ] },
          { name: "Mozambique", dropdown: [ { name: "Maputo" }, { name: "Beira" } ] },
          { name: "Namibia", dropdown: [ { name: "Windhoek" }, { name: "Swakopmund" } ] },
          { name: "Niger", dropdown: [ { name: "Niamey" }, { name: "Zinder" } ] },
          { name: "Nigeria", dropdown: [ { name: "Lagos" }, { name: "Abuja" }, { name: "Kano" } ] },
          { name: "Rwanda", dropdown: [ { name: "Kigali" }, { name: "Butare" } ] },
          { name: "Sao Tome and Principe", dropdown: [ { name: "Sao Tome" }, { name: "Principe" } ] },
          { name: "Senegal", dropdown: [ { name: "Dakar" }, { name: "Saint-Louis" } ] },
          { name: "Seychelles", dropdown: [ { name: "Victoria" }, { name: "Mahe" } ] },
          { name: "Sierra Leone", dropdown: [ { name: "Freetown" }, { name: "Bo" } ] },
          { name: "Somalia", dropdown: [ { name: "Mogadishu" }, { name: "Hargeisa" } ] },
          { name: "South Africa", dropdown: [ { name: "Cape Town" }, { name: "Johannesburg" }, { name: "Durban" } ] },
          { name: "South Sudan", dropdown: [ { name: "Juba" }, { name: "Malakal" } ] },
          { name: "Sudan", dropdown: [ { name: "Khartoum" }, { name: "Omdurman" } ] },
          { name: "Tanzania", dropdown: [ { name: "Dar es Salaam" }, { name: "Dodoma" } ] },
          { name: "Togo", dropdown: [ { name: "Lome" }, { name: "Sokode" } ] },
          { name: "Tunisia", dropdown: [ { name: "Tunis" }, { name: "Sfax" } ] },
          { name: "Uganda", dropdown: [ { name: "Kampala" }, { name: "Entebbe" } ] },
          { name: "Zambia", dropdown: [ { name: "Lusaka" }, { name: "Livingstone" } ] },
          { name: "Zimbabwe", dropdown: [ { name: "Harare" }, { name: "Bulawayo" } ] }
        ]
      },
      {
        name: "North America",
        dropdown: [
          { name: "Antigua and Barbuda", dropdown: [ { name: "Antigua" }, { name: "Barbuda" } ] },
          { name: "Bahamas", dropdown: [ { name: "Nassau" }, { name: "Freeport" } ] },
          { name: "Barbados", dropdown: [ { name: "Bridgetown" }, { name: "Speightstown" } ] },
          { name: "Belize", dropdown: [ { name: "Belize City" }, { name: "San Ignacio" } ] },
          { name: "Canada", dropdown: [ { name: "Toronto" }, { name: "Vancouver" }, { name: "Montreal" }, { name: "Calgary" } ] },
          { name: "Costa Rica", dropdown: [ { name: "San Jose" }, { name: "Limon" } ] },
          { name: "Cuba", dropdown: [ { name: "Havana" }, { name: "Santiago de Cuba" } ] },
          { name: "Dominica", dropdown: [ { name: "Roseau" }, { name: "Portsmouth" } ] },
          { name: "Dominican Republic", dropdown: [ { name: "Santo Domingo" }, { name: "Punta Cana" } ] },
          { name: "El Salvador", dropdown: [ { name: "San Salvador" }, { name: "Santa Ana" } ] },
          { name: "Grenada", dropdown: [ { name: "St. George's" }, { name: "Gouyave" } ] },
          { name: "Guatemala", dropdown: [ { name: "Guatemala City" }, { name: "Antigua Guatemala" } ] },
          { name: "Haiti", dropdown: [ { name: "Port-au-Prince" }, { name: "Cap-Haitien" } ] },
          { name: "Honduras", dropdown: [ { name: "Tegucigalpa" }, { name: "San Pedro Sula" } ] },
          { name: "Jamaica", dropdown: [ { name: "Kingston" }, { name: "Montego Bay" } ] },
          { name: "Mexico", dropdown: [ { name: "Mexico City" }, { name: "Guadalajara" }, { name: "Monterrey" }, { name: "Cancun" } ] },
          { name: "Nicaragua", dropdown: [ { name: "Managua" }, { name: "Granada" } ] },
          { name: "Panama", dropdown: [ { name: "Panama City" }, { name: "Colon" } ] },
          { name: "Saint Kitts and Nevis", dropdown: [ { name: "Basseterre" }, { name: "Charlestown" } ] },
          { name: "Saint Lucia", dropdown: [ { name: "Castries" }, { name: "Soufriere" } ] },
          { name: "Saint Vincent and the Grenadines", dropdown: [ { name: "Kingstown" }, { name: "Bequia" } ] },
          { name: "Trinidad and Tobago", dropdown: [ { name: "Port of Spain" }, { name: "San Fernando" } ] },
          { name: "United States", dropdown: [ { name: "New York" }, { name: "Los Angeles" }, { name: "Chicago" }, { name: "Houston" } ] }
        ]
      },
      {
        name: "South America",
        dropdown: [
          { name: "Argentina", dropdown: [ { name: "Buenos Aires" }, { name: "Pampas" }, { name: "Patagonian" }, { name: "Andean" } ] },
          { name: "Bolivia", dropdown: [ { name: "La Paz" }, { name: "Santa Cruz" } ] },
          { name: "Brazil", dropdown: [ { name: "Rio de Janeiro" }, { name: "Sao Paulo" }, { name: "Amazonian" }, { name: "Bahian" } ] },
          { name: "Chile", dropdown: [ { name: "Santiago" }, { name: "Valparaiso" } ] },
          { name: "Colombia", dropdown: [ { name: "Bogota" }, { name: "Medellin" } ] },
          { name: "Ecuador", dropdown: [ { name: "Quito" }, { name: "Guayaquil" } ] },
          { name: "Guyana", dropdown: [ { name: "Georgetown" }, { name: "Bartica" } ] },
          { name: "Paraguay", dropdown: [ { name: "Asuncion" }, { name: "Ciudad del Este" } ] },
          { name: "Peru", dropdown: [ { name: "Lima" }, { name: "Cusco" } ] },
          { name: "Suriname", dropdown: [ { name: "Paramaribo" }, { name: "Nieuw Nickerie" } ] },
          { name: "Uruguay", dropdown: [ { name: "Montevideo" }, { name: "Punta del Este" } ] },
          { name: "Venezuela", dropdown: [ { name: "Caracas" }, { name: "Maracaibo" } ] }
        ]
      },
      {
        name: "Oceania",
        dropdown: [
          { name: "Australia", dropdown: [ { name: "Sydney" }, { name: "Melbourne" }, { name: "Queensland" }, { name: "Tasmanian" }, { name: "Outback" } ] },
          { name: "Fiji", dropdown: [ { name: "Suva" }, { name: "Nadi" } ] },
          { name: "Kiribati", dropdown: [ { name: "Tarawa" }, { name: "Kiritimati" } ] },
          { name: "Marshall Islands", dropdown: [ { name: "Majuro" }, { name: "Ebeye" } ] },
          { name: "Micronesia", dropdown: [ { name: "Palikir" }, { name: "Chuuk" } ] },
          { name: "Nauru", dropdown: [ { name: "Yaren" }, { name: "Aiwo" } ] },
          { name: "New Zealand", dropdown: [ { name: "Auckland" }, { name: "Wellington" }, { name: "Christchurch" } ] },
          { name: "Palau", dropdown: [ { name: "Ngerulmud" }, { name: "Koror" } ] },
          { name: "Papua New Guinea", dropdown: [ { name: "Port Moresby" }, { name: "Lae" } ] },
          { name: "Samoa", dropdown: [ { name: "Apia" }, { name: "Savai'i" } ] },
          { name: "Solomon Islands", dropdown: [ { name: "Honiara" }, { name: "Malaita" } ] },
          { name: "Tonga", dropdown: [ { name: "Nuku'alofa" }, { name: "Vava'u" } ] },
          { name: "Tuvalu", dropdown: [ { name: "Funafuti" }, { name: "Nanumea" } ] },
          { name: "Vanuatu", dropdown: [ { name: "Port Vila" }, { name: "Espiritu Santo" } ] }
        ]
      },
      {
        name: "Antarctica",
        dropdown: [ { name: "Antarctica", dropdown: [ { name: "Research Station" } ] } ]
      }
    ]
  },
  {
    name: "Dietary Preference",
    dropdown: [
      { name: "Vegetarian" },{ name: "Vegan" },{ name: "Gluten Free" },{ name: "High Protein" },{ name: "Low Carb" },{ name: "Lactose Free" },{ name: "Keto" },{ name: "Paleo" },{ name: "Diabetic" },{ name: "Halal" },{ name: "Kosher" },{ name: "Kid Friendly" },{ name: "Zero Waste" },{ name: "Fermented" },{ name: "Spicy" },{ name: "Traditional" }
    ]
  },
  {
    name: "Culinary Style",
    dropdown: [
      { name: "Traditional" },{ name: "Street Food" },{ name: "Fusion" },{ name: "Gourmet" },{ name: "Slow Cooked" },{ name: "Quick" },{ name: "Raw" }
    ]
  },
  {
    name: "Difficulty",
    dropdown: [ { name: "Easy" }, { name: "Medium" }, { name: "Hard" } ]
  }
];