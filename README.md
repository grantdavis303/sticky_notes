# Sticky Notes

# Sticky Notes

A simple CRUD app for creating sticky notes on the web using React.js + TypeScript on the frontend and Express.js on the backend.

Each sticky note should have:

- Title
- Content
- Color
  - `#ffffb6`
  - `#c3ffb6`
  - `#b6fff8`
  - `#eeb6ff`
  - `#ffb6b6`

## Required Dependencies

### Client

- `react`
- `react-dom`
- `@heroicons/react`

### Server

- `express`
- `cors`
- `pg`

## Local Setup

1. Create / Reset the Database

```
psql -f database.sql
```

2. Start the Server

```
open http://localhost:3000/
cd server && node server.js
```

2. Start the Client

```
open http://localhost:5173/
cd client && npm run dev
```

## Improvements

- [x] Add repo to GitHub
- [x] Add time to "Created At"
- [x] Change the hover color on the 3 dots (...)
- [x] Change the 3 dots (...) to a different icon when clicked (x)

- [?] Change the size of the icons - smaller? 1.5 or 1.75?

- Add "Are You Sure" modal when deleting a sticky note
- Remove seconds from "Create At" time
- Change the way to select a color for the sticky note (visual)?
- Fetch notes based on user id in the title bar... `/users/1`
- On the update modal, make sure the correct color selected
- Fun Addition: Add a sound / animation when deleting a sticky note *poof*
