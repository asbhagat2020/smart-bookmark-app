# 🔖 Smart Bookmark App

A full-stack **Smart Bookmark Manager** built as an assessment project using **Next.js (App Router)** and **Supabase**.

The application allows users to securely save, manage, and access their personal bookmarks with **Google OAuth authentication** and **real-time synchronization**.

---

## 🌐 Live Demo

👉 https://smart-bookmark-app-7s9h.vercel.app/

---

## 📌 Assignment Requirements Covered

| Requirement                | Status              |
| -------------------------- | ------------------- |
| Google OAuth login only    | ✅ Implemented       |
| Add bookmark (URL + title) | ✅ Implemented       |
| Private bookmarks per user | ✅ RLS policies      |
| Real-time updates          | ✅ Supabase Realtime |
| Delete bookmarks           | ✅ Implemented       |
| Deployed on Vercel         | ✅ Live              |

---

## ✨ Features

* 🔐 Login with Google (Supabase Auth)
* ➕ Add bookmarks
* 🔒 User-private data isolation
* ⚡ Real-time sync across multiple tabs
* 🗑️ Delete bookmarks
* 🎨 Modern responsive UI
* 👤 User avatar & email display
* 🌍 Production deployment

---

## 🧰 Tech Stack

| Technology           | Usage              |
| -------------------- | ------------------ |
| Next.js (App Router) | Frontend + Routing |
| Supabase Auth        | Google OAuth       |
| Supabase Database    | Bookmark storage   |
| Supabase Realtime    | Live updates       |
| Tailwind CSS         | Styling            |
| Vercel               | Deployment         |

---

## 📂 Folder Structure

```
src/
│
├── app/
│   ├── page.tsx                # Main dashboard
│   ├── layout.tsx
│   └── auth/
│       └── callback/
│           └── route.ts        # OAuth callback
│
├── components/
│   ├── AddBookmark.tsx
│   └── BookmarkList.tsx
│
├── lib/
│   └── supabaseClient.ts
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/ashbhagat2020/smart-bookmark-app.git
cd smart-bookmark-app
```

---

### 2️⃣ Install Dependencies

```bash
npm install
```

---

### 3️⃣ Environment Variables

Create `.env.local`

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

---

### 4️⃣ Run Locally

```bash
npm run dev
```

App runs on:

```
http://localhost:3000
```

---

## 🗄️ Database Schema

```sql
create table bookmarks (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users on delete cascade,
  title text,
  url text,
  created_at timestamp default now()
);
```

---

## 🔐 Row Level Security (RLS)

```sql
alter table bookmarks enable row level security;

create policy "Users can view own bookmarks"
on bookmarks for select
using (auth.uid() = user_id);

create policy "Users can insert own bookmarks"
on bookmarks for insert
with check (auth.uid() = user_id);

create policy "Users can delete own bookmarks"
on bookmarks for delete
using (auth.uid() = user_id);
```

Ensures users can only access their own bookmarks.

---

## 🔑 Google OAuth Setup

1. Enable Google provider in Supabase
2. Add Client ID & Secret
3. Add Redirect URLs:

```
http://localhost:3000/auth/callback
https://smart-bookmark-app-7s9h.vercel.app/auth/callback
```

---

## ⚡ Realtime Implementation

Supabase Realtime subscription listens to database changes:

* INSERT → new bookmark appears instantly
* DELETE → removed in real time

This ensures multi-tab synchronization without refresh.

---

## 🚀 Deployment

Deployed using **Vercel**.

Steps:

1. Push code to GitHub
2. Import repo in Vercel
3. Add environment variables
4. Deploy

Production URL configured in Supabase Auth settings.

---

## 🧪 Problems Faced & Solutions

### 1️⃣ OAuth Redirect to Localhost

**Issue:** Production login redirected to localhost.
**Fix:** Used dynamic redirect:

```ts
redirectTo: `${location.origin}/auth/callback`
```

---

### 2️⃣ Supabase Env Variables Missing

**Issue:** Build failed on Vercel.
**Fix:** Added ENV variables in Vercel dashboard.

---

### 3️⃣ Hydration Errors (Next.js)

**Issue:** Server/client HTML mismatch.
**Fix:** Implemented mounted state check.

---

### 4️⃣ RLS Blocking Data

**Issue:** Bookmarks inserted but not fetched.
**Fix:** Added select policy using `auth.uid()`.

---

### 5️⃣ OAuth Token in URL Hash

**Issue:** `#access_token` appeared instead of callback.
**Fix:** Configured redirect URLs + callback route.

---

## 📸 Screenshots

(Add UI screenshots here)

---

## 👨‍💻 Author

**Ashwin Bhagat**
MERN Stack Developer

---

## 📜 License

This project was built for technical assessment purposes.
