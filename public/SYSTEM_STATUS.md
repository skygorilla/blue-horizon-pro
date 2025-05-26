# System Status Report

## 1. Name & Purpose

**Blue Horizon Pro** – digitalna platforma za upravljanje posadom, planiranjem obroka, inventarom i tjednim rezervacijama na brodovima, jahtama i komercijalnim plovilima.

---

## 2. Technologies & Architecture

- **Frontend:** React + Vite + TypeScript + Tailwind + Shadcn
- **Backend:** Node.js + Express
- **Database:** Supabase (PostgreSQL)
- **AI Integration:** Google Gemini API
- **Auth:** Supabase Auth + PIN zaštita

---

## 3. Active Features ✅

- ✅ **Recepti** (dodavanje, parsiranje, sortiranje, Excel import)
- ✅ **Planiranje obroka** po danima i tjednima
- ✅ **Inventar** s automatskim oduzimanjem količina
- ✅ **QR/OCR skeniranje računa** (stub integracija)
- ✅ **PIN pristup** za Chef, Manager, Captain
- ✅ **Apple Pencil canvas** (stub)
- ✅ **Google Calendar Sync** (endpoint stubiran)

---

## 4. Planned / Missing Features ⚠️

- ⚠️ **Aktivacija Google Calendar Sync**
- ⚠️ **AI recipe generation** (WIP)
- ⚠️ **Dashboard s grafovima** (trošak po gostu, stanje zaliha)
- ⚠️ **Detaljna nutritivna analiza**
- ⚠️ **Self-healing skripta** (potpuna automatizacija)
- ⚠️ **Offline podrška** i mobilni UI poboljšanja

---

## 5. Security & Access 🔒

- Role-based pristup: samo Manager i Captain imaju pristup `/admin`
- Dodatna PIN zaštita po korisničkoj ulozi
- HTTPS + secure headers (Express middleware)

---

## 6. Update Mechanism

- Automatski dohvat iz `.ai/status.md` ili Supabase tablice `system_status`
- Manualni reload: gumb u Admin dashboardu

---

*Report generated automatically. AUTO-GENERATED*
