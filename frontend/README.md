# 🎨 LeadDesk Frontend — Modern SaaS CRM UI

The frontend for **LeadDesk** is a production-ready, white-and-indigo themed web application built with **React 19**, **Vite**, **Tailwind CSS**, and **Redux Toolkit**.

---

## 🔑 Test Credentials

Use these credentials to sign in to the Admin Dashboard:

- **Email:** `test@gmail.com`
- **Password:** `Test@123`

---

## 🚀 Tech Stack

- **Framework:** React 19 + Vite 8
- **Styling:** Tailwind CSS v4 (Vanilla CSS variables design system)
- **State Management:** Redux Toolkit (`@reduxjs/toolkit` + `react-redux`)
- **Data Visualization:** Recharts
- **Icons:** Lucide React (`lucide-react`)
- **HTTP Client:** Axios
- **Routing:** React Router v7 (`react-router-dom`)
- **Notifications:** React Hot Toast (`react-hot-toast`)
- **Typography:** Inter Font (Google Fonts & rsms.me)

---

## 💻 Page Overview

1. **Landing Page (`/`):**
   - Sticky navbar with navigation links and Login CTA.
   - Hero section with badge, typography, call-to-action buttons, and dynamic browser dashboard mockup preview.
   - 6-item feature grid cards with icons and soft background tints.
   - "Why Choose Us" metrics grid section.
   - Customer testimonials cards with star ratings and avatar initials.
   - FAQ accordion collapse/expand list.
   - Lead capture form connected directly to API.
   - Footer with social links and copyright.

2. **Admin Login (`/login`):**
   - Split-screen layout: indigo brand section on left, login card on right.
   - Password visibility toggle and form validation.

3. **Dashboard (`/admin/dashboard`):**
   - 4 animated KPI metric cards (Total Leads, New Leads, Contacted, Closed) with trend indicators.
   - Recharts Bar Chart displaying weekly lead acquisition.
   - Recharts Donut Chart showing status distribution.
   - Recent leads table with status change dropdown.

4. **Leads Page (`/admin/leads`):**
   - Search input, status filter pills (`All`, `NEW`, `CONTACTED`, `CLOSED`), and sort selector (`Newest`, `Oldest`, `Name A-Z`, `Name Z-A`).
   - Paginated table (10 items per page) with expandable message drawer.

5. **Create Admin Page (`/admin/create-employee`):**
   - Role selection cards (`Employee`, `Manager`, `Admin`).
   - Password strength meter (Too short, Weak, Fair, Strong).
   - Role permission overview panel.

6. **My Profile Page (`/admin/profile`):**
   - Update personal details (Name, Email).
   - Change password form with confirmation validation.

---

## 🛠️ Development & Build Commands

```bash
# Install dependencies
npm install

# Start Vite dev server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

---

## 📄 License

ISC License.
