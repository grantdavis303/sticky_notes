# Sticky Notes

# Sticky Notes

A simple CRUD app for creating sticky notes on the web using React.js + TypeScript on the frontend and Express.js on the backend.

Each sticky note should have:
- A title
- Content
- A color:
  - #ffffb6
  - #c3ffb6
  - #b6fff8
  - #eeb6ff
  - #ffb6b6

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

2. Start the Client and Server

```
open http://localhost:5173/
cd client && npm run dev

open http://localhost:3000/
cd server && node server.js
```

## Improvements

- Add repo to GitHub
- Change the way to select a color for the sticky note (visual)?
- Add time to "Created At"
- Add "Are You Sure" modal when deleting a sticky note
- Change the hover color on the 3 dots (...)
- Fetch notes based on user id in the title bar... /users/1
- On the update modal, make the correct color selected
- Change the size of the icons - smaller?
- Change the 3 dots (...) to a different icon when clicked (x)
- Fun Addition: Add a sound / animation when deleting a sticky note
