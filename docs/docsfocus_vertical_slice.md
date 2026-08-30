\# GDB Focus Vertical Slice



\## Purpose



This document describes the first complete GDB vertical slice across frontend, backend, and PostgreSQL.



\## User Flow



1\. User presses Start Focus.

2\. Frontend starts the timer.

3\. Frontend sends a POST request to `/focus-sessions`.

4\. Backend reads `durationMinutes` from the request body.

5\. Backend validates the duration.

6\. Backend maps `durationMinutes` to `planned\_duration\_min`.

7\. PostgreSQL creates a new focus session row.

8\. PostgreSQL generates `session\_id`.

9\. Backend returns the created row with HTTP 201.

10\. Frontend stores the returned `session\_id` as `currentSessionId`.

11\. When the timer reaches zero, frontend sends a PATCH request to `/focus-sessions/:sessionId/complete`.

12\. Backend reads `sessionId` from the route parameters.

13\. PostgreSQL updates that exact focus session row.

14\. The session is marked completed and receives an end timestamp.

15\. Backend returns the updated row with HTTP 200.



\## Core Pattern



CREATE → REFERENCE → CONTROL



\- CREATE: POST creates the focus session.

\- REFERENCE: frontend stores the generated `session\_id`.

\- CONTROL: PATCH uses that ID to update the same session later.



\## Data Flow



Frontend:

`durationMinutes`



Backend mapping:

`durationMinutes → planned\_duration\_min`



Database:

`focus\_sessions`



\## Validation



A focus duration must:



\- exist

\- be a number

\- be a whole number

\- be greater than zero



Invalid input returns HTTP 400.



\## Development User



The current vertical slice uses development `user\_id = 1`.



Authentication will eventually replace this hard-coded development reference.



\## Current Status



Working:



\- frontend Start Focus event

\- POST `/focus-sessions`

\- request validation

\- PostgreSQL INSERT

\- generated `session\_id`

\- frontend `currentSessionId`

\- PATCH completion route

\- PostgreSQL UPDATE

\- HTTP 201 on creation

\- HTTP 200 on completion

\- end-to-end browser-to-database verification



Known limitation:



\- Pause currently resets/restarts the timer instead of properly resuming.

