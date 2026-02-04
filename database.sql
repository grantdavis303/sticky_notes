DROP DATABASE IF EXISTS sticky_notes;

CREATE DATABASE sticky_notes;

\connect sticky_notes;

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS sticky_notes;

CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  email VARCHAR(255) UNIQUE NOT NULL,
  phone_number VARCHAR(20),
  address_line1 VARCHAR(100),
  address_line2 VARCHAR(100),
  city VARCHAR(50),
  state VARCHAR(50),
  postal_code VARCHAR(20),
  country CHAR(2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

CREATE TABLE sticky_notes(
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  title VARCHAR(100),
  content TEXT,
  color VARCHAR(7),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users (id)
);

INSERT INTO users (first_name, last_name, email, phone_number, address_line1, address_line2, city, state, postal_code, country)
VALUES ('Grant', 'Davis', 'grantdavis303@gmail.com', '1234567890', '1111 Blueberry Lane', '', 'Denver', 'Colorado', '80202', 'US');

INSERT INTO sticky_notes (user_id, title, content, color)
VALUES  (1, 'My First Sticky Note', 'Hello! This is my first sticky note.', '#ffffb6'),
        (1, 'My Second Sticky Note', 'Woah! This is my second sticky note.', '#c3ffb6'),
        (1, 'Grocery List', 'Eggs, Bread, Milk, Butter, Cereal', '#b6fff8'),
        (1, 'Reminders', 'Mail letter, run to the bank and deposit check, send thank you note.', '#eeb6ff'),
        (1, 'To Do', 'Fill out job applications, work on project, appointment on 1/2/2026', '#ffb6b6');
