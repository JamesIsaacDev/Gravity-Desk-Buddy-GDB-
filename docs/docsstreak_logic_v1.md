Gravity Desk Buddy (GDB) — Streak Logic V1

Purpose

This document defines the first version of GDB streak logic.

The goal is to reward consistency without turning the streak into a guilt system, a retention trick, or the main reason a user opens GDB.

The streak should reinforce meaningful progress while respecting rest, travel, recovery, and changing seasons of life.

Core Product Philosophy

The streak should recognize consistency, not pressure the user into performing for the streak.



GDB should not punish users emotionally for missing a day.

The streak should never become more important than the work itself.

GDB should avoid designing streaks around:

\- shame,

\- fear of loss,

\- panic notifications,

\- guilt,

\- artificial urgency,

\- paid streak restores,

\- or forcing meaningless activity just to preserve a number.

The user should return because GDB helps them make progress, not because they are scared to lose a streak.

V1 Streak Rule

For the first MVP version:

A day counts as active when the user completes at least one focus session.



This is intentionally simple.

One completed focus session is enough to recognize that the user showed up that day.

Multiple focus sessions in the same day do not create multiple streak days.

Active Mode

When the user is in Active Mode:

1 completed focus session

→ active day



1 missed active day

→ grace day



2 missed active days in a row

→ current streak resets

The one-day grace rule exists to reduce unnecessary pressure.

Missing one day should not immediately erase the current run.

Grace Day

A grace day is a single missed day during an active period.

Example:

Monday

→ completed focus session



Tuesday

→ no focus session

→ grace day



Wednesday

→ completed focus session

→ streak continues

The grace day protects the streak but does not add a streak day.

The user still has to return to meaningful activity for the streak to grow.

Reset Rule

If the user misses two active days in a row, the current streak resets.

Example:

Monday

→ completed focus session



Tuesday

→ missed

→ grace day



Wednesday

→ missed

→ current streak resets

The reset should be treated as the end of one run, not the erasure of progress.

Historical Evidence

GDB should preserve evidence of past consistency even when the current streak resets.

The streak system should eventually track at least:

Current streak

Best streak

Total active days

Example:

Current streak

0 days



Best streak

183 days



Total active days

247

This preserves meaningful evidence of effort.

A streak should preserve evidence of consistency, not erase evidence of past effort.



Away Mode

Not every season of life should require a focus session.

Users may travel, rest, recover, take time off, or simply enter periods where daily focused work is not realistic.

GDB should support an intentional Away Mode.

Away Mode Rules

Away Mode

→ streak freezes

→ no penalty

→ no streak credit

→ Buddy can still remain available

Example:

Current streak

40 days



User starts Away Mode for 7 days



7 days later

→ current streak is still 40



User returns

→ completes a focus session

→ current streak becomes 41

Away Mode preserves continuity without creating fake progress.

Away Mode Philosophy

Away Mode is not a loophole.

It exists because intentional rest is compatible with progress.

GDB should not behave like an employer that gives users a fixed number of vacation days.

Current product direction:

\- no strict yearly vacation allowance,

\- no punishment for extended breaks,

\- no streak growth while away,

\- no forced productivity while away.

GDB rewards consistency during active periods and respects intentional rest.



Buddy Role

The Buddy should support the user emotionally without creating pressure.

When the streak continues

Possible tone:

“Nice work. Another day of showing up.”



After one missed day

Possible tone:

“Take the day. We’ll pick it back up.”



After a reset

Possible tone:

“New run starts when you’re ready.”



During Away Mode

The Buddy can remain present for lightweight interaction without requiring productivity.

The Buddy should never frame the user as having failed.

Buddy Boundaries

The Buddy should:

\- encourage,

\- normalize rest,

\- reinforce return,

\- acknowledge effort,

\- support continuity.

The Buddy should not:

\- guilt the user,

\- threaten streak loss,

\- create emotional obligation,

\- pressure the user to log in,

\- make the streak feel like a debt.

Why the Streak Is Not the Product

The streak is a feedback mechanism.

It is not the core product value.

The long-term reasons to return to GDB should come from:

\- useful focus support,

\- Buddy companionship,

\- visible progress,

\- reflection,

\- personal development,

\- future Orbit systems,

\- meaningful continuity over time.

The streak should simply say:

“You’ve been showing up.”



It should not say:

“Open GDB or lose everything.”



Journaling and Streaks

Journaling does not count toward the streak in V1.

Reason:

\- the journal feature does not yet have a fully proven role in the MVP,

\- GDB should not reward shallow actions performed only to preserve a streak,

\- the value of journaling should be established before it affects streak logic.

Future versions may allow other meaningful actions to count if they clearly represent real progress.

Possible future examples:

\- meaningful journal reflection,

\- completed learning review,

\- other validated progress actions.

This should only be added after the action itself has a clear product purpose.

Multiple Streaks

GDB should not start with separate streaks for:

\- focus,

\- journaling,

\- reflection,

\- Buddy interaction,

\- or other features.

Multiple streaks could create unnecessary complexity and pressure.

V1 should use one clear streak system.

Future specialized streaks can be reconsidered only if they add real value.

Example User Flows

Normal active week

Mon → focus complete

Tue → focus complete

Wed → missed

Thu → focus complete

Fri → focus complete

Result:

\- streak continues,

\- Wednesday acts as the grace day.

Two missed days

Mon → focus complete

Tue → missed

Wed → missed

Result:

\- current streak resets,

\- best streak remains,

\- total active days remain.

Vacation

Day 40

→ Away Mode begins



7 days pass



User returns

→ streak still 40

→ next completed focus session makes it 41

Edge Cases / Open Decisions

These decisions remain open for later implementation:

1\. How should calendar-day boundaries work across time zones?

2\. Should Away Mode require a start and end date?

3\. Should the user be able to end Away Mode early?

4\. Should Away Mode be retroactive?

5\. Should the Buddy respond differently to long breaks?

6\. Should recovery/health breaks use the same Away Mode or a separate label?

7\. Should other meaningful actions eventually count toward an active day?

8\. How should streak history be visualized?

9\. Should there be milestones for best streak or total active days?

10\. Should streaks ever be hidden by the user if they find them stressful?

Later Technical Translation

When implemented, the system will need to determine:

Did the user complete a focus session today?

Was yesterday active?

Was yesterday a grace day?

Is the user currently in Away Mode?

What is the current streak?

What is the best streak?

How many total active days exist?

The MVP code should derive streak state from real completed-session data rather than rely only on a local frontend counter.

The database will eventually need to support enough historical information to calculate or store:

\- active days,

\- current streak,

\- best streak,

\- total active days,

\- Away Mode periods.

The exact schema and calculation method should be decided during implementation.

Core Design Principles

The streak should recognize consistency, not pressure the user into performing for the streak.



Missing a day should create encouragement, not shame.



A streak should preserve evidence of consistency, not erase evidence of past effort.



GDB rewards consistency during active periods and respects intentional rest.



Away Mode preserves the streak but does not create streak credit.



The streak is feedback, not the product.



Users should return because GDB helps them grow, not because they fear losing a number.

