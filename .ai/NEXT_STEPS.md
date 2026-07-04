# NEXT STEPS

## Pending Work (Active Phase)
**Phase 2: Backend Database & Authentication**
- Configure MongoDB connection via Mongoose (`backend/src/config/db.ts`).
- Build core database schemas based on System Design PDF (`User`, `Portfolio`, `Project`, etc.).
- Build the Authentication API (`/v1/auth/register`, `/v1/auth/login`).
- Implement stateless JWT strategy (Access Tokens + secure HTTP-only Refresh Tokens).
- Add Zod validation for auth routes.

## Backlog
- **Frontend API Integration:** Replace `mockData.ts` on the landing page with real React Query calls to the Express backend.
- **Dashboard Pages:** Build the internal UI for the Portfolio Editor, Project Management, and User Settings.
- **Real-time Messaging:** Build the Socket.IO infrastructure for private messaging and matching notifications.
- **Matching Algorithm:** Implement the logic that calculates Compatibility % based on user goals, skills, and roles.

## Future Ideas
- GitHub API integration to automatically pull and verify user commits/activity for the Portfolio cards.
- BullMQ integration for background tasks (e.g., sending matching notification emails).
