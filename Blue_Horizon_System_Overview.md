# Blue Horizon Pro

## Premium Maritime Operations Platform

**Blue Horizon Pro** is a modern, mission-critical platform built for the daily reality of life and work at sea. Tailored for yachts, charter fleets, cruise vessels, and expedition boats, the platform merges operational efficiency with culinary precision, crew coordination, and guest hospitality.

---

## 1. Mission & Identity

- **Purpose**: Digitally transform onboard operations: meal planning, guest experience, inventory, nutrition, and logistics.
- **Target Users**: Captains, Chefs, Hostesses, Managers (onboard or shore-based), Crew, and Charter Operators.
- **Environment**: Low-connectivity conditions, touch-first interfaces, secure and role-based logic.
- **Aesthetic**: Premium, nautical UI with emphasis on clarity, contrast, and shipboard usability.

---

## 2. Core Functional Modules

### Meal Planning Calendar

- Full-screen weekly/monthly views.
- Drag & drop menus, visual statuses.
- Guest Type-aware portion calculator.
- Templates for repeated menu cycles.

### Recipe Management

- Rich JSON-based structure (title, time, servings, ingredients per line).
- Excel/CSV importer with per-cell parsing.
- Filtering by region, tags, type, guest diet.
- Auto-scaling servings, linking with inventory.

### Inventory System

- Real-time tracking of food, supplies, tools.
- Auto deduction by recipe planning.
- Price updates via invoice scan (Metro, QR, OCR).
- Alerts for low stock, reorder suggestions.

### Shopping List Generator

- Auto-generated from meal plan deltas.
- Grouped by categories.
- Editable quantities, live cost estimation.
- Email-ready export.

### Nutrition Tracking

- Macronutrient per meal/day/guest.
- Charts: Protein, Carbs, Fat %.
- Exportable to nutrition software.

### Reports & Analytics

- Cost per day/guest/week.
- Inventory value breakdown.
- Booked/used meals report.

---

## 3. Role Management & Security

- Roles: Captain, Chef, Hostess, Manager, Crew.
- RBAC: Differentiated access (view/edit).
- Dual-auth: Email login + PIN per role.
- Session state: Role persists across sessions.
- Secure Lock/Logout/Role-Switch mechanisms.

---

## 4. Guest Type System (Codes A–K)

- Visual cards (no scroll): Letter, Icon, Summary.
- Meal presets: A (Breakfast+Lunch), B (Breakfast+Dinner), C (Full Day), etc.
- Dietary tags: Vegan, Vegetarian, Allergic, Gluten-Free.
- Filters menus, ingredients, costs, nutrition.

---

## 5. Technical Foundation

- **Frontend**: React, Vite, TypeScript, Tailwind, Shadcn.
- **Backend**: Node.js (Express), Supabase, Google Gemini AI.
- **AI Integration**: Recipe generation, QR parsing, smart recommendations.
- **Deployment**: Firebase Hosting / Azure / Lovable.dev (live preview, collaboration).

---

## 6. UX / Mobile Design

- Responsive design (tablet/phone optimized).
- Touch-ready cards, sliders, drag & drop.
- High-contrast mode toggle.
- Offline-ready (LocalStorage sync).
- Real-time status: Sync, Connection, Errors.

---

## 7. Real-World Integration

- Google Calendar Sync (meal events).
- QR Invoice Scan (Metro, R1 -> inventory sync).
- Email to supplier (auto-generated shopping list).
- Apple Pencil (touch annotations in recipes).
- OCR + Camera for data extraction.

---

## 8. Smart Backend Logic

- Self-healing script for `npm install`, `.env`, express errors.
- Logging in `/logs/startup.log`.
- Server-side detection for missing modules.
- AI-driven suggestions (recipe scaling, substitution, error repair).

---

## 9. Optional AI-Powered Enhancements

- Ingredient-based "What Can I Cook Now?"
- Inventory-aware meal forecasting.
- Supplier invoice auto-pricing.
- Cost forecast vs budget.

---

## 10. Database Schema (Simplified)

```plaintext
recipes (id, name, servings, instructions...)
recipe_ingredients (recipe_id, ingredient_id, qty, unit)
ingredients (id, name, qty_in_stock, price_per_unit)
```

---

## 11. Summary: Why Blue Horizon Pro?

Blue Horizon Pro is not just a digital meal planner – it’s a **holistic maritime operations OS**, combining culinary intelligence, crew coordination, cost control, and hospitality in a unified, touch-optimized experience.

From inventory to guest personalization, Blue Horizon Pro empowers vessels to operate smarter, safer, and more efficiently — even when sailing beyond the horizon.
