# Module library

Reusable modules. Each client gets only the ones that fit.

## Agent spec format (use for every agent)
```
name:
trigger:            # webhook, schedule, CRM status change
inputs:
rules_files_read:
actions:            # each tagged AUTO | APPROVE | HUMAN-ONLY
outputs:
on_failure:         # who gets notified, what the customer sees
log_to:
```

## 1. Marketing & Intake
- **Channel router** — phone (missed-call text-back), SMS, website chat/form,
  Instagram/Facebook DMs, Google Business messages → one normalized lead
  record in the CRM. AUTO.
- **Speed-to-lead responder** — replies within 60 seconds in the brand voice,
  asks the qualification questions from `qualification.md`. AUTO after
  shadow period.
- **Calendar agent** — reads live availability; only offers slots that exist;
  holds a slot for N minutes; books via the client's real calendar. AUTO for
  booking estimates/consults; APPROVE for booking paid jobs.
- **Scoping & quote drafter** — gathers job details and photos, applies
  `pricing.md`, produces a quote DRAFT. APPROVE always to start. Only quotes
  inside explicitly listed fixed-price services may graduate to AUTO.
- **Closer handoff** — negotiation, discounts, and signed terms: HUMAN-ONLY.
  Agent sends the owner a one-screen brief.

## 2. Operations & Delivery
- **Scope-to-materials** — signed scope → materials list → supplier cart or
  PO draft. APPROVE (money leaves the business).
- **Crew/day-before confirmations** — AUTO.
- **No-show / exception handler** — detects missed check-in, alerts owner,
  proposes next contractor from `bench.md`. Contacting a backup sub:
  APPROVE by default. Notifying the client of a delay: APPROVE until trusted.
- **Close-out** — crew marks complete + photos → invoice draft. AUTO to
  draft; sending: APPROVE until trusted, then AUTO for invoices matching
  the accepted quote within a tolerance.

## 3. Finance & Margin
- **Payments** — Stripe/Square payment links on invoices. AUTO.
- **Reminders** — friendly reminders at due date, +7, +14. AUTO after
  template approval. Anything that reads as a demand or threat (late fees,
  collections, liens): HUMAN-ONLY.
- **Job costing** — quote vs actual labor hours and materials per job;
  flags jobs below target margin. AUTO (internal report).
- **Pricing suggestions** — proposes changes to `pricing.md` with evidence.
  Never edits pricing itself. HUMAN-ONLY to apply.

## 4. Orchestration
- Prefer official MCP servers where they exist; otherwise API → small
  Worker; otherwise Zapier/Make; otherwise a daily CSV import. Record the
  choice and why in `stack.md`.
- A daily **owner briefing** (text or email): new leads, booked jobs,
  items awaiting approval, overdue invoices, margin flags. Max 10 lines.
