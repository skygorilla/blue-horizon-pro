import React, { useState } from 'react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { CONTINENTS, COUNTRIES, REGIONS, TOWNS, Continent } from '@/types/recipe/geography';
import { RECIPES } from '@/data/recipes';

const AccordionNav = () => {
  const [expandedContinent, setExpandedContinent] = useState<Continent | null>(null);
  const [expandedCountry, setExpandedCountry] = useState<string | null>(null);
  const [expandedRegion, setExpandedRegion] = useState<string | null>(null);

  const getRecipesByTown = (town: string) => {
    return RECIPES.filter(recipe => recipe.town === town);
  };

  return (
    <Accordion type="single" collapsible>
      {CONTINENTS.map(continent => (
        <AccordionItem key={continent.value} value={continent.value}>
          <AccordionTrigger
            onClick={() => setExpandedContinent(continent.value)}
            className="no-underline"
          >
            {continent.label}
          </AccordionTrigger>
          <AccordionContent>
            {expandedContinent === continent.value && (
              <Accordion type="single" collapsible>
                {COUNTRIES.filter(c => c.continent === continent.value).map(country => (
                  <AccordionItem key={country.value} value={country.value}>
                    <AccordionTrigger
                      onClick={() => setExpandedCountry(country.value)}
                      className="no-underline"
                    >
                      {country.label}
                    </AccordionTrigger>
                    <AccordionContent>
                      {expandedCountry === country.value && (
                        <Accordion type="single" collapsible>
                          {REGIONS[country.value]?.map(region => (
                            <AccordionItem key={region.value} value={region.value}>
                              <AccordionTrigger
                                onClick={() => setExpandedRegion(region.value)}
                                className="no-underline"
                              >
                                {region.label}
                              </AccordionTrigger>
                              <AccordionContent>
                                {expandedRegion === region.value && (
                                  <ul>
                                    {TOWNS[region.value]?.map(town => (
                                      <li key={town.value}>
                                        <strong>{town.label}</strong>
                                        <ul>
                                          {getRecipesByTown(town.value).map(recipe => (
                                            <li key={recipe.id}>{recipe.name}</li>
                                          ))}
                                        </ul>
                                      </li>
                                    ))}
                                  </ul>
                                )}
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default AccordionNav;