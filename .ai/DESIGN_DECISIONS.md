# DESIGN DECISIONS

## UX Principles
- **Professional Over Casual:** The platform must emphasize professional building and showcasing. It is explicitly NOT an entertainment OTT or an Omegle-like random chat platform.
- **Trust & Security First:** Matching and connections require mutual consent. Profiles are reviewed before connecting.
- **Immediate Understanding:** The landing page must explain the platform through interactive feature experiences within 3 seconds.

## UI Decisions
- **OTT Content Discovery:** We use horizontal, infinitely scrolling rows (similar to Netflix/Apple TV) to display Projects, Portfolios, and Workspaces to make browsing feel alive and premium.
- **Glassmorphism:** Used strategically for floating cards on dark backgrounds to create depth without clutter.
- **Hero Layout:** We replaced the traditional full-bleed hero with an "Explore What You Can Do" dual-card layout (75vh height) that demonstrates core value propositions immediately.

## Approved Changes
- ✅ Built the entire Marketplace Hub Landing Page using mock data to establish the design language.
- ✅ Redesigned the Hero section to include an automated, 3-step animated flow demonstrating the "Discover Someone New" smart matching process safely.
- ✅ Integrated `framer-motion` for complex scale-on-hover and timeline animations.

## Rejected Ideas
- ❌ Traditional "Talk to Stranger" or "Random VC" mechanics. These were rejected in favor of "Discover Someone New" with preference-based smart matching.
- ❌ Express router for the frontend. We rely exclusively on Next.js App Router for frontend routing.
