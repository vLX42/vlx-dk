---
title: 'Smelt: building my own agent harness'
slug: 'smelt'
date: '2026-07-10'
coverImage: '/smelt.jpg'
video: '/smelt.mp4'
videoThumb: '/smelt.jpg'
technology: 'GitHub Copilot CLI SDK, Tauri, Rust, React, TypeScript, Node.js, Azure DevOps'
excerpt: 'My discovery trip into the GitHub Copilot CLI SDK: own the harness, run a fleet of agents, feed them real backlog items, and see if something meaningful comes back.'
---

# Smelt: building my own agent harness

Every AI coding tool hands you the same deal: their loop, their prompts, their rules. Then GitHub shipped the Copilot CLI SDK and the curtain came off. Suddenly you could own the harness: spawn the agents, write their instructions, decide what they are allowed to touch. I had to know how far that goes. Smelt is the itch, scratched on evenings.

The experiment was simple. Set up a fleet of agents with a real division of labour, make it dead easy to feed them work, and see if something meaningful comes back. So the interface stays honest: browse your Azure DevOps backlog, pick a PBI, pick your crew, hit Start. The video is a real run at 15x.

## One architect, a fleet of specialists

An **architect** reads the PBI, snoops around the codebase, and writes the plan. **You review it**: approve, scribble a note, or send it back. Two minutes reading a plan beats twenty reading a surprise diff. Then the **sub-agents swarm**: backend dev, frontend dev, test writer, each with its own prompt and model, working in parallel waves while reviewer agents nag them until the issue count drops. **Quality gates** are robots, not oracles: type-check, lint, tests, pass or fail. Finally the architect returns as the critic, blocked from touching code, checks every acceptance criterion with file and line receipts, and opens a draft PR.

Every prompt lives in the UI: rewrite a persona, swap its model, tune its reviewers. That is the whole point of owning the harness. And the agents never touch git. They get safe replacement tools and a Rust layer that physically cannot commit to main.

![The run dashboard: the architect's plan waiting for operator review](/smelt-run.jpg)

## What I actually learned

**The bottleneck moves.** A pipeline like this is only as good as the ticket you feed it. A sharp PBI gets a plan like a senior wrote it. A vague one-liner gets a confident plan for the wrong thing. In an organisation the size of DFDS, automating the coding just moves the queue to whoever writes the work items. The sharpest engineering skill in the room becomes writing a good ticket.

**AI is an amplifier.** It amplifies your codebase, your tickets, and your judgement, good or bad. And the jury is still out on the real impact: is the extra token cost of a full fleet worth it, or does a commercial harness like Claude Code or opencode in plan mode get you just as far? Honest answer: I do not know yet.

**But what a ride.** Agents built most of Smelt itself: 23,000 lines of TypeScript, 3,300 of Rust, 100 releases in three months, desktop app and VS Code extension from one codebase. Zero SLA, sharp edges included, and worth every evening. Once you have run your own fleet, autocomplete feels very quiet.

![Smelt poster](/smelt-app.jpg)
