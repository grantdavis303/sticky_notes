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

2. Start the Client

```
open http://localhost:5173/
cd client && npm run dev
```

3. Start the Server

```
open http://localhost:3000/
cd server && node server.js
```

## Improvements

- [x] Add repo to GitHub
- [x] Add time to "Created At"
- [x] Change the hover color on the 3 dots (...)
- [x] Change the 3 dots (...) to a different icon when clicked (x)
- [x] Fix the ability to delete notes without the screen - visibility issue
- [x] Fix the width of the textarea box on the modal
- [x] Remove seconds from "Create At" time
- [x] On the update modal, make sure the correct color selected when clicked
- [x] Change the size of the icons - smaller? 1.5 or 1.75? Chose 1.5



- Add: "Are You Sure" modal when deleting a sticky note
- Add: Tests for site functionality

- Fix: If note title width is too big, it looks bad with the absolute container for dropdown icons - 2rem maybe change
- Fix: Location for created at / updated at information for sticky notes - hover over icon?
- Fix: How to select a color for the sticky note (more visual)?
- Fix: Note title overlaps with (...) container
- Fix: Inline CSS and move to separate CSS file
- Fix: Mobile responsiveness for the notes

- Fun: Add notification ex. "Sticky note successfully updated", "Sticky note successfully deleted"
- Fun: Add a sound / animation when deleting a sticky note *poof*



Q: Should I fetch notes based on user id in the title bar... `/users/1` or by using a JWT / session cookie?
Q: Should the dropdown automatically close after an update / save?

Note: hard-coded user id in the database (1)
