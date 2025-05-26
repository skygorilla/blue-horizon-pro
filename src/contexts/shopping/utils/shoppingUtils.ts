
import { ShoppingItem, InventoryItem } from '@/types/mealPlanTypes';

/**
 * Calculate the total cost of shopping items
 */
export const calculateTotalCost = (shoppingItems: ShoppingItem[]): number => {
  return shoppingItems.reduce((total, item) => {
    if (item.unitPrice) {
      // Extract quantity from amount string (e.g. "2 kg" -> 2)
      const quantityMatch = item.amount.match(/^(\d+(\.\d+)?)/);
      const quantity = quantityMatch ? parseFloat(quantityMatch[1]) : 1;
      return total + (item.unitPrice * quantity);
    }
    return total;
  }, 0);
};

/**
 * Convert inventory items to shopping items
 */
export const convertInventoryToShoppingItems = (
  inventoryItems: InventoryItem[],
  existingItems: ShoppingItem[]
): ShoppingItem[] => {
  // Create new shopping items from inventory
  const newShoppingItems = inventoryItems.map(invItem => ({
    id: `shop-${invItem.id}`,
    name: invItem.name,
    amount: `1 ${invItem.unit}`,
    category: invItem.category,
    checked: false,
    unitPrice: invItem.unitPrice,
    supplier: invItem.supplier
  }));

  // Avoid duplicates by checking against existing items
  const existingNames = new Set(existingItems.map(item => item.name.toLowerCase()));
  return newShoppingItems.filter(
    item => !existingNames.has(item.name.toLowerCase())
  );
};
