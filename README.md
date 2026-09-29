# LeadPilot AI

## Overview

LeadPilot AI is a focused real-estate sales dashboard that turns inbound messages into a prioritized next action. It starts with five realistic demo leads and lets a salesperson analyze and add new leads without exposing the AI key to the browser.

## Features

- AI lead analysis with summary, intent, requirements, objections, response, and priority reasons
- AI Priority Score (a heuristic prioritization, not a purchase prediction)
- Lead-specific chat grounded in the active lead and its analysis
- **Call Prep**: a compact opening, emphasis points, questions, objection handling, and next step
- Search, Hot/Warm/Cold filters, sorting, responsive three-column dashboard
- Client-side demo storage for instant initial review; submitted leads are analyzed through the real API

## Architecture

```text
Browser (Next.js React dashboard)
          |
          v
Next.js route handlers (/api/analyze-lead, /api/chat, /api/call-prep)
          |
          v
Gemini API (server-side only)
```

## AI Model

The app defaults to `gemini-2.5-flash`, configurable via `GEMINI_MODEL`. All Gemini calls happen in route handlers, so `GEMINI_API_KEY` never reaches browser code. Analysis and Call Prep request JSON and validate the returned structure before display. Chat receives the selected lead, its analysis, and prior chat history, which grounds each reply.

## Lead Prioritization

The AI evaluates stated intent, buying timeline, budget clarity, requirement specificity, concrete next-step signals, and uncertainty. Scores are an AI-generated prioritization aid, not an objective probability of purchase.

## Local Setup

```bash
npm install
copy .env.example .env.local
# add GEMINI_API_KEY to .env.local
npm run dev
```

Open `http://localhost:3000`.

## Environment Variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `GEMINI_API_KEY` | Yes for live AI | Server-side Gemini credential |
| `GEMINI_MODEL` | No | Gemini model; defaults to `gemini-2.5-flash` |

## Deployment

Push the repository to GitHub, import it into Vercel, add `GEMINI_API_KEY` (and optionally `GEMINI_MODEL`) in Vercel Project Settings → Environment Variables, then deploy. No client-side secret configuration is needed.

## Demo Video Guide (under 3 minutes)

1. Open the dashboard and point out the ranked demo leads and AI Priority Score.
2. Select a Hot lead and scan its AI summary, requirements, concerns, and recommended next action.
3. Ask a lead-specific chat question, such as “What should I emphasize on the call?”
4. Click **Prepare for Call** to show the original Call Prep feature and explain how it turns analysis into a practical call plan.
5. Add a new lead, explain that the browser calls a Next.js route handler, and show its real Gemini-generated analysis appear in the prioritised list.

## Technical Decisions

- **Next.js** keeps UI and small server API routes in one understandable project.
- **Structured JSON** makes AI output safe to render and easy to validate.
- **Server-side Gemini calls** protect the API key.
- **In-memory client demo data** makes the first-load demo immediate; a production version would replace this with a database and authentication.
- **Gemini** handles analysis, contextual chat, and call prep through a shared client and focused prompts.

## Original Feature: Call Prep

The Prepare for Call action turns the current lead’s known context into a scannable call card. It helps a salesperson move from analysis to a confident, relevant conversation without inventing missing facts.

## Known Limitations

- Leads added during a browser session are not persisted after refresh.
- AI output can occasionally be imperfect or unavailable.
- Scores are heuristics, not purchase predictions.
- Authentication and team collaboration are intentionally not included in this MVP.

## AI Usage Disclosure

AI tools used:

- ChatGPT/Codex: architecture, implementation assistance, debugging, and documentation
- Gemini API: runtime lead analysis, lead-specific chat, and call preparation
