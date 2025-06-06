
# Habit Tracker SQL API

A simple RESTful API built with Node.js, Express, and PostgreSQL to track daily habit completions.

## Features

- Add and list habits
- Mark a habit as complete
- View completion history

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Set up PostgreSQL database and run the following SQL:

```
CREATE TABLE habits (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE completions (
    id SERIAL PRIMARY KEY,
    habit_id INT REFERENCES habits(id) ON DELETE CASCADE,
    completed_on DATE NOT NULL
);
```

3. Update your DB credentials in `server.js`.

4. Start the server:
   ```
   npm start
   ```

## API Endpoints

- `GET /habits` - List all habits
- `POST /habits` - Create a new habit
- `POST /habits/:id/complete` - Mark a habit as complete for today
- `GET /habits/:id/history` - View history of completions
