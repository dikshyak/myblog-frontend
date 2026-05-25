# myblog-frontend — Next.js Frontend

A modern blog frontend built with **Next.js 16** that fetches and displays data from the [myblog Django REST API](https://github.com/dikshyak/myblog).

---

## What it does

- Fetches blog posts from Django REST API
- Displays all published posts on the homepage
- Individual post detail pages with slug URLs
- Server side rendering — fast load and great SEO
- Cover images served from Django media server

---

## Tech stack

| Technology | Purpose |
|---|---|
| Next.js 16 | React framework with server rendering |
| React | UI components |
| JavaScript | Programming language |
| ESLint | Code quality |

---

## Project structure

```
myblog-frontend/
├── app/
│   ├── posts/
│   │   └── [slug]/
│   │       └── page.js    # Individual post page
│   ├── layout.js           # Root layout
│   ├── page.js             # Homepage — all posts
│   └── globals.css         # Global styles
├── public/                 # Static files
├── next.config.mjs         # Next.js configuration
└── package.json            # Dependencies
```

---

## How it works

```
User visits localhost:3000
        ↓
Next.js server runs page.js
        ↓
Fetches data from Django API
GET http://127.0.0.1:8000/posts/api/posts/
        ↓
Django returns JSON data
        ↓
Next.js builds complete HTML
        ↓
Browser shows the blog instantly
```

---

## Getting started

### Requirements

Make sure the Django backend is running first:
```
https://github.com/dikshyak/myblog
```

### 1. Clone the repository

```bash
git clone https://github.com/dikshyak/myblog-frontend.git
cd myblog-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

### 4. Open your browser

```
http://localhost:3000
```

---

## Pages

| URL | Description |
|---|---|
| `localhost:3000/` | Homepage — all published posts |
| `localhost:3000/posts/[slug]/` | Individual post detail page |

---

## API endpoints used

Both from the Django backend running on port 8000:

```
GET http://127.0.0.1:8000/posts/api/posts/
→ Returns list of all published posts

GET http://127.0.0.1:8000/posts/api/posts/<slug>/
→ Returns single post by slug
```

---

## Why Next.js over plain React?

| Feature | Plain React | Next.js |
|---|---|---|
| Routing | Manual setup | Automatic via folders |
| Server rendering | No | Yes |
| SEO | Poor | Excellent |
| First load speed | Slow | Fast |
| File structure | No convention | Clear convention |

---

## Running both servers together

You need two terminals running at the same time:

**Terminal 1 — Django backend:**
```bash
cd C:\Users\LOQ\Desktop\myblog
venv\Scripts\activate
python manage.py runserver
```

**Terminal 2 — Next.js frontend:**
```bash
cd C:\Users\LOQ\Desktop\myblog-frontend
npm run dev
```

Then visit `http://localhost:3000`

---

## Related repository

Backend Django REST API:
```
https://github.com/dikshyak/myblog
```

---

## What I learned building this

- What Next.js is and why it exists
- How Next.js file based routing works
- Server side rendering and why it matters
- How to fetch data from a Django REST API
- How frontend and backend communicate through JSON
- Full stack web development with Python and JavaScript

---

## Author

**Dikshya Khadka**
GitHub: [@dikshyak](https://github.com/dikshyak)

---

## Next steps

- [ ] Add Tailwind CSS styling
- [ ] Add loading states
- [ ] Add error handling
- [ ] Deploy frontend to Vercel
- [ ] Deploy backend to Railway
- [ ] Add user authentication
- [ ] Add comments system