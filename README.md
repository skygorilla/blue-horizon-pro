# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/3914c5a9-74f3-487b-9f69-d8806ddf976b

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/3914c5a9-74f3-487b-9f69-d8806ddf976b) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/3914c5a9-74f3-487b-9f69-d8806ddf976b) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes it is!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

## 🛠 Troubleshooting Guide

If you encounter issues with your Blue Horizon Pro application, this section documents common problems and their solutions.

### Common Issues and Solutions

#### 1. Blank White Page on Startup

If you see a blank white page when accessing your application locally, it may be caused by one of these issues:

**Missing Context Hook Exports**
- **Symptoms**: Console errors like `The requested module does not provide an export named 'useXYZ'`
- **Solution**: Ensure all context files properly export their hooks. Check:
  - `src/contexts/UISettingsContext.tsx` - Should export `useUISettings`
  - `src/contexts/ThemeContext.tsx` - Should export `useTheme`
  - Other context files that provide hooks to components

**Import/Export Mismatches**
- **Symptoms**: Errors like `The requested module does not provide an export named 'ComponentName'`
- **Solution**: Ensure import statements match the export type (default vs. named):
  - For default exports (`export default Component`), use: `import Component from './path'`
  - For named exports (`export const Component`), use: `import { Component } from './path'`

**Port Configuration Issues**
- **Symptoms**: Application works at a different URL than expected
- **Solution**: Check the terminal output for the actual port Vite is using. Ports 8080-8089 are commonly tried in sequence.

#### 2. Authentication and Data Loading Issues

- **Symptoms**: Authentication flows don't work, or data doesn't load
- **Solution**: Verify Supabase configuration in environment variables and ensure backend server is running: `npm run dev:backend`

#### 3. CSS and Style Issues

- **Symptoms**: Incorrect styling, missing UI elements
- **Solution**: Check class names and ensure Tailwind is properly set up. Review any custom CSS in `src/styles/`

### Debugging Tips

1. **Check Browser Console**: Most React errors are reported in the browser's developer console (F12)

2. **Add Debug Output**: For persistent issues, add temporary debugging to index.html:
   ```html
   <script>
     console.log('HTML document loaded');
     window.addEventListener('DOMContentLoaded', function() {
       console.log('DOM fully loaded');
       document.body.innerHTML += '<div id="debug-info" style="position:fixed; bottom:0; left:0; background:white; padding:10px; z-index:9999; border:1px solid black;">Debug Mode</div>';
     });
     window.addEventListener('error', function(e) {
       console.error('Global error caught:', e.error || e.message);
       const debugEl = document.getElementById('debug-info');
       if (debugEl) {
         debugEl.innerHTML = 'Error: ' + (e.error?.message || e.message || 'Unknown error');
         debugEl.style.backgroundColor = '#ffcccc';
       }
       return false;
     }, true);
   </script>
   ```

3. **Verify Context Providers**: Ensure all required providers are properly wrapping your application in the correct order

4. **Use the React DevTools**: Install the React Developer Tools browser extension for better debugging

5. **Check Front and Backend**: Remember that this application has both:
   - Frontend: `npm run dev:frontend` (Vite React application)
   - Backend: `npm run dev:backend` (Express server)
   - Combined: `npm run dev:all` (uses concurrently to run both)

### Maintenance Notes

- When adding new context providers, remember to create appropriate hook exports
- The application uses a pattern where context definitions are in separate files (e.g., `UISettingsContextDefinition.ts`) from their implementations (e.g., `UISettingsContext.tsx`)
- Translations are initialized in `main.tsx` and should be properly set up before application rendering

## ✅ Blue Horizon Pro — UI/UX Audit Checklist

**Date Started:** April 27, 2025
**Auditor(s):** [Your Name/Team]

---

### General Checks (Apply to ALL pages)

- [ ] **Theme Toggler:** Confirm light/dark mode works visually on every page.
- [ ] **Responsiveness:** Verify layout adapts correctly (mobile ≤640px, tablet 641px–1024px, desktop ≥1025px).
- [ ] **Spacing:** Ensure consistent padding, margin, and spacing across layouts.
- [ ] **Typography:** Check font sizes, weights, and line heights for readability.
- [ ] **Assets:** Validate icons/images scale correctly and are sharp.
- [ ] **Button States:** Test hover, active, disabled states visually.
- [ ] **Overflow:** Fix any unintended horizontal scrolling or clipped elements.
- [ ] **Z-Index:** Correct any stacking issues (elements hidden).
- [ ] **Positioning:** Check fixed/absolute elements (modals, navbars, sidebars).
- [ ] **Interactivity:** Ensure all buttons, inputs, dropdowns, etc., are functional.
- [ ] **Accessibility:** Basic checks for focus states and semantic HTML.

---

### Specific Pages & Components Audit

**Authentication & Welcome:**
- [ ] `Welcome.tsx` (Slideshow, AuthPanel)
- [ ] `Auth.tsx` (Login/Signup Forms)
- [ ] `RoleSelect.tsx` (Role Grid/Cards)
- [ ] `LoadingScreen.tsx`

**Core Layout & Navigation:**
- [ ] `MainLayout.tsx` (Overall structure)
- [ ] `Header.tsx` (Top navigation, breadcrumbs, user menu)
- [ ] `SideMenu.tsx` (Sidebar expansion/collapse, navigation links)
- [ ] `Footer` (If applicable, check placement and content)

**Dashboards:**
- [ ] `Index.tsx` (Main dashboard - varies by role)
- [ ] `ChefDashboard.tsx`
- [ ] `ManagerDashboard.tsx`
- [ ] `HostessDashboard` (If exists, or check relevant components)
- [ ] `CrewDashboard` (If exists, or check relevant components)
- [ ] `AdminLayout.tsx` / `AdminStatusPage.tsx`

**Feature Pages:**
- [ ] `RecipesPage.tsx` (List/Grid view, Filters, Search, Add/Import)
- [ ] `RecipeDetails.tsx` (Within modal or page)
- [ ] `MealPlannerPage.tsx` (Calendar/Week view, Drag & Drop)
- [ ] `Inventory.tsx` (List/Table view, Search, Add/Edit Item)
- [ ] `ShoppingPage.tsx` (List, Add/Check items, Actions)
- [ ] `RestockRequests.tsx`
- [ ] `Haccp.tsx` (Tracking, Forms)
- [ ] `Reports.tsx`
- [ ] `CurrentMenu.tsx` (Hostess view)
- [ ] `PrintMenu.tsx` (Hostess view)

**UI Components (General Check within pages):**
- [ ] `Button` variants and sizes
- [ ] `Input`, `Textarea`, `Select` fields
- [ ] `Card` component variations
- [ ] `Dialog` / `Modal` components
- [ ] `Table` component responsiveness
- [ ] `Tabs` component
- [ ] `Accordion` component
- [ ] `Breadcrumbs` component
- [ ] `StatCard.tsx`
- [ ] `BarChart.tsx`, `PieChart.tsx`
- [ ] `ThemeToggle.tsx` (Already covered in general, but double-check placement)
- [ ] `OfflineIndicator.tsx`
- [ ] `GeminiChat.tsx` (If integrated)

**Other:**
- [ ] `About.tsx`
- [ ] `NotFoundPage.tsx` / `NotFound.tsx`
- [ ] Any other custom pages or components.

---

**Notes & Observations:**
*   [Add any general findings or recurring issues here]
*   Mobile UX suggestions: [e.g., simplify navigation, increase tap target sizes]

## ✅ Blue Horizon Pro Frontend QA Checklist

- Audit all public pages for font size, readability, touch areas.
- Improve text and background color contrast (light and dark mode).
- Adjust button sizes for easy finger tap.
- Ensure dark mode uses a soft dark background (not pure #000 black).
- Ensure light mode uses a soft light background (not harsh pure white).
- Review responsiveness across mobile, tablet, desktop, TV screens.
- 🚫 Skip Admin Login and Admin Dashboard — **do not modify them**.
