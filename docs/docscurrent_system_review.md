\# GDB Current System Review

## Current System Map

Vercel frontend
→ Render backend
→ Neon PostgreSQL

Focus vertical slice:
Start Focus
→ POST /focus-sessions
→ PostgreSQL INSERT
→ session_id returned
→ frontend stores session_id
→ timer completes
→ PATCH /focus-sessions/:sessionId/complete
→ PostgreSQL updates the exact row

## Working Now

### Frontend
- Public frontend hosted on Vercel.
- Start Focus button works.
- Focus timer counts down.
- Basic Buddy state exists.
- Basic streak state exists.

### Backend
- Public Node/Express backend hosted on Render.
- Health route works.
- `POST /focus-sessions` works.
- Focus duration validation works.
- `PATCH /focus-sessions/:sessionId/complete` works.

### Database
- PostgreSQL is hosted on Neon.
- Focus sessions persist successfully.
- PostgreSQL generates `session_id`.
- Frontend stores the returned `session_id`.
- Completion updates the correct session row.
- `completed`, `actual_duration_min`, and `ended_at` update correctly.

### Cloud Flow
- Vercel frontend can call Render backend.
- CORS is working.
- Render connects to Neon.
- Full browser → backend → database → completion flow has been proven.

### Documentation
- Focus vertical slice documented.
- Database blueprint documented.
- Orbit architecture documented.
- Free beta plan documented.

## Known Gaps

\### Frontend / UX

\- Start/Pause control is not yet unified into one button.

\- Current Pause button styling and interaction are still prototype-level.

\- Resume behavior restarts from the full duration instead of preserving remaining time.

\- Overall visual design is still prototype-level.

\- Buddy interactions are still very basic.

\- Streak state is local only and is not persisted.

\- No polished onboarding flow yet.



\### Backend / Account Logic

\- `user\_id` is still hardcoded to development user `1`.

\- No authentication system yet.

\- No per-user session ownership logic yet.

\- CORS is currently broad for testing and should later be restricted to the production frontend domain.

\- Error handling is still basic.



\### Database / Product Data

\- Focus-session persistence works, but Buddy state is not persisted.

\- Streaks are not persisted.

\- Journaling is not implemented into the live product flow.

\- Orbit progression is not implemented.



\### Product / Beta Readiness

\- No real beta-user accounts yet.

\- No beta analytics or telemetry system yet.

\- No tester feedback collection flow yet.

\- No polished Buddy art or visual identity yet.

\- No payments or premium layer.

\- No social or community features.

\- No Orbit system in the live MVP.



\### Technical Cleanup

\- Moderate npm vulnerability is still parked.

\- Render free instance can spin down after inactivity.

\- PostgreSQL SSL connection warning was noted and has not yet been cleaned up.


## Next Milestone

TBD after review.


