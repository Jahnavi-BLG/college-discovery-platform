# CollegeFinder

Discover, browse, and compare top engineering colleges across India.

Built with **Next.js 16**, **Prisma ORM**, **PostgreSQL**, and **Tailwind CSS v4**.

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up the database

Create a PostgreSQL database, then copy and fill in the env file:

```bash
cp .env.example .env
# Edit .env and set your DATABASE_URL
```

### 3. Run migrations

Apply the schema to your database:

```bash
npx prisma migrate deploy
```

Or push the schema directly (development only):

```bash
npx prisma db push
```

### 4. Generate the Prisma client

```bash
npx prisma generate
```

### 5. Seed the database

Start the dev server, then visit:

```
http://localhost:3000/api/seed
```

This populates the database with 8 colleges. It is idempotent — safe to run multiple times.

### 6. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Project Structure

```
college-discovery/
├── app/
│   ├── api/
│   │   ├── colleges/
│   │   │   ├── route.ts          # GET /api/colleges?search=&sortBy=
│   │   │   └── [id]/route.ts     # GET /api/colleges/:id
│   │   ├── seed/route.ts         # GET /api/seed  (run once to populate DB)
│   │   └── test-db/route.ts      # GET /api/test-db  (health check)
│   ├── colleges/
│   │   ├── page.tsx              # Browse all colleges
│   │   └── [id]/page.tsx         # College detail page
│   ├── compare/page.tsx          # Side-by-side comparison
│   ├── data/
│   │   └── seed.ts               # Seed data (used by /api/seed)
│   └── page.tsx                  # Home page
├── lib/
│   └── prisma.ts                 # Prisma client singleton
├── prisma/
│   ├── schema.prisma             # Database schema
│   └── migrations/               # SQL migration files
└── .env.example                  # Environment variable template
```

---

## Database Schema

```prisma
model College {
  id         Int      @id @default(autoincrement())
  name       String   @unique
  location   String
  fees       String
  rating     Float
  placements String
  courses    String[]
  reviews    String
  type       String
}
```

## API Endpoints

| Endpoint | Description |
|---|---|
| `GET /api/colleges` | List all colleges. Supports `?search=` and `?sortBy=rating\|placements\|fees-asc\|fees-desc` |
| `GET /api/colleges/:id` | Get a single college by ID |
| `GET /api/seed` | Seed the database with sample data |
| `GET /api/test-db` | Health check — returns all colleges |
