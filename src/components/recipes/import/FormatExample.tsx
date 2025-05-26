
import React from 'react';

export const FormatExample: React.FC = () => {
  return (
    <div className="text-sm text-neutral-700">
      <p className="font-medium mb-2">Example Recipe Format:</p>
      <pre className="bg-neutral-100 text-xs rounded p-2 overflow-x-auto">
{`{
  "name": "Shakshuka",
  "title": "Mediterranean Shakshuka",
  "continent": "Africa",
  "region": "North African",
  "local": "Maghreb",
  "mealType": "breakfast",
  "guestType": "both",
  "tags": ["vegetarian", "spicy"],
  "prepTime": 15,
  "cookTime": 20,
  "servings": 4,
  "ingredients": "2 tbsp olive oil\\n1 onion, chopped\\n1 red bell pepper\\n4 garlic cloves\\n2 tsp paprika\\n1 tsp cumin\\n1/4 tsp chili flakes\\n28 oz canned tomatoes\\n6 eggs\\nSalt and pepper to taste\\nFresh herbs for garnish",
  "instructions": "1. Heat oil in a large skillet.\\n2. Cook onion and pepper until soft.\\n3. Add garlic and spices, cook 1 minute.\\n4. Pour in tomatoes, simmer 10 minutes.\\n5. Make wells in the sauce, crack eggs into them.\\n6. Cover and cook until eggs are set.\\n7. Garnish with herbs and serve with bread."
}`}
      </pre>
      <p className="mt-2 text-xs text-neutral-500">
        For multiple recipes, use a JSON array [&#123;recipe1&#125;, &#123;recipe2&#125;] or JSONL format (one JSON object per line).
      </p>
    </div>
  );
};
