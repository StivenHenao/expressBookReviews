
# 📚 Express Book Review

A simple Node.js + Express API for browsing books and managing reviews. Users can log in, add, update, and delete their own reviews. Includes async examples using Promises and Axios.

## Features

- View all books
- Search by ISBN, author, or title
- User login with session
- Add/update/delete reviews (authenticated)
- Async operations using Promises

## 📖 API Endpoints

| Method | Endpoint                  | Description                            | Auth Required |
|--------|---------------------------|----------------------------------------|---------------|
| GET    | `/`                       | Get all books                          | ❌            |
| GET    | `/isbn/:isbn`            | Get book by ISBN                       | ❌            |
| GET    | `/author/:author`        | Get books by author                    | ❌            |
| GET    | `/title/:title`          | Get books by title                     | ❌            |
| POST   | `/login`                 | Log in a user                          | ❌            |
| PUT    | `/auth/review/:isbn`     | Add or update a book review            | ✅            |
| DELETE | `/auth/review/:isbn`     | Delete your own book review            | ✅            |


## Getting Started

```bash
npm install
npm start
```

# Dependencies
- express
- express-session
- jsonwebtoken
- nodemon
