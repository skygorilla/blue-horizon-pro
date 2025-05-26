import { Meal } from '@/types/menu/menuTypes';
import { ChartDataItem } from '@/types/chart/chartTypes';
import { ShoppingItem } from '@/types/shopping/shoppingTypes';

// Sample data - Type A guests
export const mealDataTypeA: Meal[] = [
  {
    day: 'Monday',
    breakfast: 'Fritters',
    lunch: 'Vegetable Soup',
    dinner: 'Goulash with Dumplings',
    calories: '2100 kcal'
  },
  {
    day: 'Tuesday',
    breakfast: 'Yogurt with Granola',
    lunch: 'Bean Stew with Sausage',
    dinner: 'Stuffed Cabbage',
    calories: '2200 kcal'
  },
  {
    day: 'Wednesday',
    breakfast: 'Cheese Burek',
    lunch: 'Chicken Risotto',
    dinner: 'Stuffed Peppers',
    calories: '2300 kcal'
  },
  {
    day: 'Thursday',
    breakfast: 'Pancakes',
    lunch: 'Stuffed Eggs',
    dinner: 'Pasticada (Braised Beef Stew)',
    calories: '2400 kcal'
  },
  {
    day: 'Friday',
    breakfast: 'Cornflakes with Milk',
    lunch: 'Fish Soup',
    dinner: 'Grilled Squid',
    calories: '2150 kcal'
  },
  {
    day: 'Saturday',
    breakfast: 'Croissant with Jam',
    lunch: 'Shopska Salad',
    dinner: 'Ćevapi with Flatbread',
    calories: '2250 kcal'
  },
  {
    day: 'Sunday',
    breakfast: 'Fruit Salad',
    lunch: 'Roast Lamb',
    dinner: 'Cold Platter',
    calories: '2350 kcal'
  }
];

// Sample data - Type B guests
export const mealDataTypeB: Meal[] = [
  {
    day: 'Monday',
    breakfast: '',
    lunch: '',
    dinner: 'Zucchini Soup, Chicken Fillet with Rice, Salad',
    calories: '1800 kcal'
  },
  {
    day: 'Tuesday',
    breakfast: 'Buffet: Bread, Butter, Jam, Honey, Cheese',
    lunch: '',
    dinner: 'Tomato Soup, Fish with Swiss Chard and Potatoes',
    calories: '1950 kcal'
  },
  {
    day: 'Wednesday',
    breakfast: 'Buffet: Bread, Butter, Jam, Honey, Cheese',
    lunch: '',
    dinner: 'Beef Soup, Pork with Sauce and Pasta',
    calories: '2050 kcal'
  },
  {
    day: 'Thursday',
    breakfast: 'Buffet: Bread, Butter, Jam, Honey, Cheese',
    lunch: '',
    dinner: 'Vegetable Soup, Čevapi with Flatbread and Ajvar',
    calories: '1900 kcal'
  },
  {
    day: 'Friday',
    breakfast: 'Buffet: Bread, Butter, Jam, Honey, Cheese',
    lunch: '',
    dinner: 'Vegetable Soup, Pasticada with Homemade Dumplings, Salad',
    calories: '2000 kcal'
  }
];

// Chart data
export const costData: ChartDataItem[] = [
  { label: 'Meat', value: 40, color: '#5b9bd5' },
  { label: 'Vegetables', value: 30, color: '#70ad47' },
  { label: 'Grains', value: 20, color: '#ffc000' },
  { label: 'Dairy', value: 10, color: '#ed7d31' }
];

export const caloriesData: ChartDataItem[] = [
  { label: 'Mon', value: 2100, color: '#5b9bd5' },
  { label: 'Tue', value: 2200, color: '#70ad47' },
  { label: 'Wed', value: 2300, color: '#ffc000' },
  { label: 'Thu', value: 2400, color: '#ed7d31' },
  { label: 'Fri', value: 2150, color: '#4472c4' },
  { label: 'Sat', value: 2250, color: '#a5a5a5' },
  { label: 'Sun', value: 2350, color: '#70ad47' }
];

export const caloriesDataTypeB: ChartDataItem[] = [
  { label: 'Mon', value: 1800, color: '#5b9bd5' },
  { label: 'Tue', value: 1950, color: '#70ad47' },
  { label: 'Wed', value: 2050, color: '#ffc000' },
  { label: 'Thu', value: 1900, color: '#ed7d31' },
  { label: 'Fri', value: 2000, color: '#4472c4' }
];

export const sampleShoppingItems: ShoppingItem[] = [
  { id: '1', name: 'Beef', amount: '5kg', category: 'Meat & Fish', checked: false },
  { id: '2', name: 'Chicken', amount: '3kg', category: 'Meat & Fish', checked: false },
  { id: '3', name: 'Pork', amount: '2kg', category: 'Meat & Fish', checked: true },
  { id: '4', name: 'Potatoes', amount: '7kg', category: 'Vegetables', checked: false },
  { id: '5', name: 'Onions', amount: '2kg', category: 'Vegetables', checked: true },
  { id: '6', name: 'Carrots', amount: '1.5kg', category: 'Vegetables', checked: false },
  { id: '7', name: 'Flour', amount: '3kg', category: 'Pantry Items', checked: false },
  { id: '8', name: 'Rice', amount: '2kg', category: 'Pantry Items', checked: false },
  { id: '9', name: 'Oil', amount: '2L', category: 'Pantry Items', checked: true },
  { id: '10', name: 'Milk', amount: '5L', category: 'Dairy', checked: false },
  { id: '11', name: 'Cheese', amount: '1kg', category: 'Dairy', checked: false },
  { id: '12', name: 'Yogurt', amount: '2kg', category: 'Dairy', checked: false }
];
