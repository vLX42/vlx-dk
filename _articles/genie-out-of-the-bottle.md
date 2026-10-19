---
title: 'The genie is out of the bottle'
slug: 'genie-out-of-the-bottle'
date: '2026-10-20'
coverImage: '/genie.jpg'
video: '/genie.mp4'
videoThumb: '/genie.jpg'
technology: 'Claude Code, REA, Rust, Kotlin, ESP32, Raspberry Pi, Three.js, Python'
excerpt: 'Three weekends, five side projects, and a question I do not have the full answer to: how should a normal team work now that the genie is out of the bottle?'
---

# The genie is out of the bottle

It's time to rethink how we do development. The genie is out of the bottle, and it shows no sign of wanting to go back in.

It's not so much about writing code anymore. It's about having the control, the vision and the consistency, but mostly it's about quality control. The code more or less writes itself now. Deciding whether it's any good is still very much a job for a grown-up.

Just to highlight what these new tools give you: during the last three weekends I built the following. (And a Monday, to be honest.)

## Snorre, an Android Auto replacement for my car

The first goal was modest: I wanted wired audio from my devices that do USB-C audio but not Android Auto or CarPlay, with Bluetooth and Wi-Fi switched off. That's not where it ended.

A Raspberry Pi now pretends to be a phone toward the car, an ESP32 pretends to be a headset toward my phone, and a small service on my NAS fetches a fresh Android Auto certificate every week so the car keeps trusting it. The car screen shows cover art, the queue and turn-by-turn directions from Google Maps, and the steering wheel buttons work.

The first real test in the car passed 9 of 9 checks. First try. That is not how hardware usually goes. The AI also did the hardware side: wiring diagrams, a two-part case for the 3D printer generated from a script, and a circuit board with the files ready to send to the factory.

![Snorre on the car screen](/genie-snorre-car.jpg)

## A calendar tablet for my mum

My mum has dementia. Her tablet shows big text, today and tomorrow, a landscape at the top that follows the weather and the seasons, a big button for the radio, card games you can't lose, and a dog called Bella who is always happy and never needs walking.

The home helpers can cancel or add an appointment with a code and a photo, so the family can see who changed what. Everything is built around dementia guidance: one fixed layout, very big text, pictures instead of words, and nothing you can get wrong.

It also came with its own Android app that takes over a cheap tablet completely: full screen, always on, locked to the calendar, and it starts again by itself if the tablet restarts.

![The calendar on a quiet day](/genie-calendar.jpg)

## uEye, my own app for our home cameras

I never trusted the app that came with my cheap NVR. Now the recorder can be banned from the internet completely, and I still have my own way to control it.

With REA, the agent looked inside the vendor's own library to check how the protocol really works, and then built a replacement that only talks to the recorder on my own network. Live view, recordings, two-way talk and faces grouped by person, all running on my NAS.

I think it's the same trick behind ArtCraft, the free Adobe clones that have been all over the feed lately: REA in a clean-room setup, where you first use it to write docs on how the app works, and then rebuild the whole thing from those docs.

![uEye recordings, with people blurred](/genie-ueye.jpg)

## A start page for the family

One page with a tile for each thing running at home. Not impressive, but now there is one address to remember instead of six.

![The family start page](/genie-start-page.jpg)

## Candy Marble, a game in a weekend

Saturday evening it was a grey ball rolling down some grey hills. By midnight it was made of candy, had music, and an evil licorice ball was racing you. By Sunday evening it had ten levels, a level editor and tilt-the-phone controls.

Every model is a Python script, every level is an ASCII map, and a bot plays all the levels after every change, so nothing ships untested.

Then I joked on a LAN party's Facebook event that I might make a multiplayer version. So now I had to. This weekend it got online races for six players, a server on my NAS, and candy that makes you dizzy.

Play it here: [vlx42.github.io/candy-marble](https://vlx42.github.io/candy-marble/)

![Candy Marble](/genie-candy-marble.jpg)

## So how do we do things now?

That is the question. If one person can build all of that in three weekends, what does that mean in an enterprise setup? The normal way of working doesn't translate. A normal team of about eight people (two frontend, four backend, one UX, a product owner and a DTC) can't just keep working the same way, only faster. So how should it organise its work on a Monday morning?

I don't have the full answer yet, but I have some ideas.

Slice the work into smaller pieces, and give the AI eyes and ears so it can test and verify its own work before you ever see it. In my weekend projects that was a fake car to test against and a bot that plays every level after every change. At work it means skills that clearly describe how we want things done, and quality gates that catch drift before it lands.

## Reviewing the code

The normal signals that tell you code is bad are gone. It always looks plausible, and with the amount of code coming out, nobody can keep up by reading it. So the review moves: what was the reasoning behind the change, and what does it do to what we already have? Let the AI explain that, and keep a log of why decisions were made. That log is needed more than ever.

Who builds all of that? The team itself, with support from the company architects. And if we spend less time reading each other's code, it gets a lot easier to agree on the tech.

Will we ever just trust the code? When compilers came, people checked the machine code too, because they didn't trust it. Today nobody does. I think AI goes the same way. Not now, maybe in two to five years. Nobody knows.

Until then I'll keep playing and see where it takes me.

## My takeaway

The normal way of splitting software work into backend, frontend and UX needs to be rethought. Everyone can now do a fair bit of each other's work.

If I had to pick who is best placed right now, I think it's the old fullstack developer, or the very technical frontend developer. They sit in a good middle ground. They know how a backend is supposed to work, and they have an eye for how things should look. That combination is exactly what you need when your job is mostly steering and checking.

But as I have said before: AI is an enhancer, of good and of bad. You paint the picture yourself. And if you are bad at something, remember that it will enhance that too. :)
