
export type GuestTypeCode = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'both';
export type GuestTypeCategory = 'Recreation' | 'Sport' | 'Crew' | 'Kids' | 'Dietary' | 'Travel';
export type MealPattern = 'breakfast' | 'lunch' | 'dinner' | 'snack';

export interface GuestType {
  code: GuestTypeCode;
  name: string;
  description: string;
  shortDescription: string;
  mealPattern: MealPattern[];
  category: GuestTypeCategory;
  icon: string;
}

// For components that need additional functionality (mealplanner, etc.)
export interface GuestTypeInfo extends GuestType {
  id: string;
}

export const GUEST_TYPES: GuestType[] = [
  {
    code: 'A',
    name: 'Recreation',
    description: 'Guests who dine out in the evening, e.g. active tourists',
    shortDescription: 'Breakfast + Lunch',
    mealPattern: ['breakfast', 'lunch'],
    category: 'Recreation',
    icon: 'sun'
  },
  {
    code: 'B',
    name: 'Sport',
    description: 'Active daytime guests (cycling, hiking)',
    shortDescription: 'Breakfast + Dinner',
    mealPattern: ['breakfast', 'dinner'],
    category: 'Sport',
    icon: 'dumbbell'
  },
  {
    code: 'C',
    name: '3 Meals',
    description: 'Captain, chef, crew or guest staying all day - 3 meals daily',
    shortDescription: 'Breakfast + Lunch + Dinner',
    mealPattern: ['breakfast', 'lunch', 'dinner'],
    category: 'Crew',
    icon: 'users'
  },
  {
    code: 'D',
    name: 'Children',
    description: 'Children with adapted menu',
    shortDescription: 'Reduced portions',
    mealPattern: ['breakfast', 'lunch', 'dinner'],
    category: 'Kids',
    icon: 'child'
  },
  {
    code: 'E',
    name: 'Vegetarian',
    description: 'No meat, but includes dairy products',
    shortDescription: 'Dietary meals',
    mealPattern: ['breakfast', 'lunch', 'dinner'],
    category: 'Dietary',
    icon: 'leaf'
  },
  {
    code: 'F',
    name: 'Vegan',
    description: 'No meat, eggs, or dairy products',
    shortDescription: 'Plant-based meals',
    mealPattern: ['breakfast', 'lunch', 'dinner'],
    category: 'Dietary',
    icon: 'seedling'
  },
  {
    code: 'G',
    name: 'Gluten-Free',
    description: 'For gluten-sensitive individuals',
    shortDescription: 'Gluten-free diet',
    mealPattern: ['breakfast', 'lunch', 'dinner'],
    category: 'Dietary',
    icon: 'wheat'
  },
  {
    code: 'H',
    name: 'Allergies',
    description: 'Individual dietary restrictions (e.g. nuts)',
    shortDescription: 'Customized meals',
    mealPattern: ['breakfast', 'lunch', 'dinner'],
    category: 'Dietary',
    icon: 'allergy'
  },
  {
    code: 'I',
    name: 'In Transit',
    description: 'Arrival/departure day, guests in transit',
    shortDescription: 'Flexible meals',
    mealPattern: ['breakfast', 'dinner'],
    category: 'Travel',
    icon: 'ship'
  },
  {
    code: 'J',
    name: 'Boarding Guest',
    description: 'Welcome - fritters, welcome drink, light evening meal',
    shortDescription: 'Snack + Dinner',
    mealPattern: ['snack', 'dinner'],
    category: 'Travel',
    icon: 'cocktail'
  },
  {
    code: 'K',
    name: 'Departing Guest',
    description: 'Departure after breakfast, transfer to mainland',
    shortDescription: 'Breakfast only',
    mealPattern: ['breakfast'],
    category: 'Travel',
    icon: 'bus'
  }
];
