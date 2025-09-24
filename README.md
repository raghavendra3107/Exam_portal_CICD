# Exam Portal — Frontend (Vite) + Backend (Spring Boot)

## Frontend

Run locally:

```bash
npm install
npm run dev
```

Create `.env.local` in project root:

```
VITE_API_BASE=http://localhost:8080
```

## Backend (Spring Boot 3.5.6 + MySQL)

Prerequisites:
- JDK 17+
- Maven 3.9+
- MySQL with database created: `exam_portal`

Configuration via environment variables (optional):

```
DB_USERNAME=your_mysql_user
DB_PASSWORD=your_mysql_password
CORS_ORIGIN=http://localhost:5173
PORT=8080
```

Start backend:

```bash
cd backend
mvn spring-boot:run
```

Seeded demo users:
- Student: `student@example.com` / `student123`
- Teacher: `teacher` / `teacher123`
