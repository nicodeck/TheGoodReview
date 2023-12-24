# The Good Review

A video games database to save your reviews!

## Installation

### Back-end

```bash
cd backend/
npm run dev
cp .env.example .env
```

#### .env file setup

You have to provide your own IGDB API key, see [IGDB API docs](http://api-docs.igdb.com).

You may have to change the database link, based on your own setup. The database has to be PostgreSQL.

### Front-end

```bash
cd frontend/
npm run dev
cp .env.example .env
```

## Usage

### 1. Start the Vite front-end server

```bash
cd frontend/
npm run dev
```

### 2. Start the Express back-end server

Open a separate terminal and start the back-end server.

```bash
cd backend/
npm run dev
```
