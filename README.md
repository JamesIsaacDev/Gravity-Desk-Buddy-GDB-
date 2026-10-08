# Gravity Desk Buddy (GDB)

Gravity Daily Buddy (GDB) is a focus and human-development platform designed to help people consistently act on who they are becoming.

The current product combines focused work, reflection, consistency tracking, and a central Buddy interface into one personal productivity system.

---

# The Core Problem

Distraction, inconsistency, and loss of direction prevent people from doing meaningful work and developing their capabilities over time.

Most productivity tools manage tasks.

GDB is being designed to help users build consistent action, reflect on progress, and develop over time.

---

# MVP Foundation

The current MVP is centered around a simple daily loop:

1. Enter GDB through the Buddy-centered home experience.
2. Choose meaningful work.
3. Complete a focus session.
4. Record progress and consistency.
5. Reflect through a journal.
6. Return the next day.

The MVP succeeds if users genuinely want to return tomorrow.

---

# Current Product Direction

The Buddy is being designed as the central interface of GDB.

The timer is not the product itself. It is one feature inside a broader Buddy-centered system.

Current interface work includes:

- Buddy-centered home layout
- Focus mode and clock interaction
- Reflection experience
- Progress and consistency
- Orbit entry points
- Buddy visual identity

Current visual prototyping is being developed in Figma before the next frontend styling pass.

---

# Current Engineering Stack

## Frontend
- HTML
- CSS
- JavaScript
- Vercel deployment

## Backend
- Node.js
- Express
- Render deployment

## Database
- PostgreSQL
- Neon production database

---

# Working MVP Flows

Current working flows include:

- User creation
- Temporary email-based user lookup
- User-owned focus session creation
- Focus session completion
- Planned and actual duration storage
- Journal entry persistence
- Private journal defaults
- Frontend-to-backend-to-database integration

Current authentication is temporary and is not production-ready.

---

# Orbit System

GDB includes a long-term developmental layer called Orbits.

Current Orbit architecture is documented in:

`docs/orbit_architecture_v2.md`

Current Orbits:

1. Parallax
2. Standard Candle
3. Spectroscopy
4. Event Horizon
5. Relativity
6. Singularity

Orbits are intended to represent demonstrated developmental depth over time.

They are not intended to represent:

- Human worth
- Professional status
- Popularity
- Income
- Purchased rank
- Self-declared intelligence

The exact long-term progression system remains intentionally unresolved until the product has been tested.

---

# Repository Structure

```text
GDB
│
├── backend
├── database
├── docs
├── frontend
└── README.md
