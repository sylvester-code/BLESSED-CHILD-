# Blessed Child School Complex — School Management, Learning, Assessment & ERP Platform
**Location:** Anaji-Mpatado, Sekondi-Takoradi, Western Region, Ghana  
**Motto:** *"Knowledge, Integrity and Excellence"*

A modern, production-ready, full-stack Academic ERP, Learning Management System (LMS), School-Based Assessment (SBA) Engine, and Public Website built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, and an integrated Ghanaian Basic Education curriculum framework.

---

## 🌟 Key System Capabilities

### 1. Public School Website
- **Modern Academic Aesthetics:** Tailored academic navy (`#0f2b5c`) and Ghanaian royal gold color palette with responsive typography.
- **Homepage:** High-impact hero section, animated announcement ticker, key school statistics (100% BECE distinction rate, 850+ pupils, 48 certified faculty), headmaster welcome message, 6 core pillars, co-curricular highlights, and parent testimonials.
- **About Us (`/about`):** Founding history in Anaji-Mpatado, vision, mission, 5 core pillars (Godliness, Integrity, Academic Excellence, Diligence, Innovation), leadership profiles, and campus infrastructure.
- **Academics (`/academics`):** Early Childhood (Creche, Nursery, KG), Primary (Basic 1–6), and Junior High School (JHS 1–3). Full list of Ghana Education Service / NaCCA subjects and academic year calendar (Term 1, 2, and 3).
- **Online Admissions (`/admissions`):**
  - Interactive application form with instant reference code generation (`BCS-ADM-XXXX`) and celebratory canvas confetti.
  - **Live Application Status Tracker:** Parents can type their reference number to monitor real-time review, interview scheduling, and acceptance status.
- **News & Bulletins (`/news`):** Official school memos, exam dates, PTA meetings, and sports galas with category filters and full modal memo reader.
- **Campus Life Gallery (`/gallery`):** Lightbox-enabled photo albums covering STEM & Robotics, Cultural Day, Sports Championship, and Graduation.
- **Contact & Directions (`/contact`):** Interactive inquiry form, telephone lines, admissions email, and Anaji-Mpatado campus GPS coordinates.

---

### 2. Multi-Role Portal Architecture & Instant Role Switcher
- **Instant 1-Click Role Switcher:** Located in the top header and on the `/portal` landing page, allowing immediate access to test any portal without logging out or memorizing 10 passwords:
  1. **Super Admin:** Full platform control center, CMS, SIS, SBA, fees, and audit logs.
  2. **Headteacher / Principal:** Academic oversight, remark endorsement, and attendance supervision.
  3. **Teacher:** Class roll call, SBA mark entry, homework assignments, and online quiz creation.
  4. **Student:** Timetable, homework submission, live CBT quiz taking with countdown timer, report card preview, and fee status.
  5. **Parent / Guardian:** Multi-child switcher (e.g., toggling between Michael in JHS 2 and Abigail in Basic 4), attendance monitoring, and fee receipts.
  6. **Accountant:** Fee collections, receipt generation, debtor arrears tracking, and expense logging.
  7. **Admissions Officer:** Application review and one-click applicant-to-student enrollment.
  8. **Librarian:** Book catalog and circulation.

---

### 3. School-Based Assessment (SBA) Engine
- **Ghanaian NaCCA Assessment Standards:**
  - **Continuous Assessment (50%):** Classwork (20 marks) + Homework (10 marks) + Projects (10 marks) + Class Tests (10 marks).
  - **Terminal Examination (50%):** End of term examination.
  - **Overall Score (100%):** Continuous Assessment Total + Examination Score.
- **Configurable Grading Scales:**
  - **NaCCA 9-Point Stanine Scale:** Grade 1 (80–100% Highest Distinction) down to Grade 9 (0–39% Fail).
  - **Letter Grade Scale:** A1, B2, B3, C4, C5, C6, D7, E8, F9.
  - Configurable directly from the Super Admin Panel without touching code.
- **Live Score Entry Matrix (`/portal/admin/assessments`):**
  - Select Class → Subject → Term.
  - Live table inputs with automatic calculation of SBA totals, overall percentages, stanine grades, positions in class, and teacher remarks.

---

### 4. Official Ghanaian Terminal Report Card Generator (`/portal/admin/report-cards`)
- Standardized terminal report sheets formatted with:
  - School Crest, Name, Motto, and Contact details.
  - Student photo, admission number, class level, and term attendance statistics (e.g. 58/60 days).
  - Subject marks table (Class SBA /50, Exam /50, Total /100, Grade, Subject Position, Teacher Remark).
  - Aggregate total marks, terminal average, class position ranking (e.g. 1st out of 35 pupils).
  - Class Teacher & Headmaster remarks, official signature line, and school seal.
  - Printable / Exportable to PDF using browser print stylesheets.

---

### 5. Fees & Financial Administration (`/portal/admin/fees`)
- **Ghanaian Cedi (GH₵) Currency Integration.**
- **Fee Structures:** Tuition fees, ICT laboratory levy, PTA development levy, school lunch feeding, and air-conditioned bus transport.
- **Payment Collection & Receipt Issuance:** Supports MTN Mobile Money, Telecel Cash, GCB Bank deposits, and Cash.
- **Official Printable Receipts:** Generated with unique receipt numbers (`BCS-REC-XXXX`), student admission numbers, payment channel, cashier signature, and school stamp.
- **Debtors & Arrears Tracker:** Instant filtered view of all students with outstanding balances.
- **Operating Expense Logger:** Tracking utility bills (ECG), lab chemicals, fuel, and maintenance.

---

### 6. Admissions to Student Conversion Engine (`/portal/admin/admissions`)
- Seamless workflow connecting online public applications to active school records:
  - Parents submit application on public website.
  - Admissions Officer / Admin reviews details and schedules placement interview.
  - **One-Click Convert & Enroll:** Automatically generates a new active student record, assigns admission number, links guardian contact, enrolls into the selected class, and updates class registers immediately!

---

### 7. Interactive Online Quiz / CBT Examination Hub (`/portal/admin/quizzes` & `/portal/student`)
- Teachers create objective quizzes (Multiple Choice and True/False) with time limits.
- Students take tests directly in the portal with a live countdown timer and question navigator.
- Automatic scoring, instant result calculation, and percentage feedback upon submission.

---

### 8. Timetable Management with Clash Detection (`/portal/admin/timetable`)
- Weekly schedules (Periods 1 to 8, Monday to Friday).
- **Teacher & Room Clash Detection:** Prevents assigning the same teacher to two classes during the same period, or double-booking a venue.

---

### 9. Website CMS Control Center (`/portal/admin/cms`)
- The Super Admin can edit the following directly from the dashboard:
  - School name, motto, and location.
  - Announcement ticker headline.
  - Hero banner title and subtitle.
  - Headmaster name, academic title, and message.
  - Key school metrics (BECE rate, student count, faculty count).
  - Primary and secondary phone numbers, email, and campus address.
  - Instant live reflection across the public website.

---

### 10. Audit Trail Logs (`/portal/admin/audit`)
- Complete audit logging of administrative actions with timestamp, user name, role, module, action description, and status.

---

## 🚀 Running the Project Locally

### Prerequisites
- Node.js (v18.x or v20.x or v22.x)
- npm

### Installation & Launch
```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open in your browser
http://localhost:3000
```

### Production Build
```bash
# Build the optimized production bundle
npm run build

# Start the production server
npm run start
```

---

## 🔑 Demo Credentials

| Role | Username | Password | Direct Portal Route |
| :--- | :--- | :--- | :--- |
| **Super Admin** | `superadmin` | `admin123` | `/portal/admin` |
| **Headmaster** | `headteacher` | `admin123` | `/portal/admin` |
| **Teacher** | `teacher` | `admin123` | `/portal/teacher` |
| **Student** | `student` | `admin123` | `/portal/student` |
| **Parent** | `parent` | `admin123` | `/portal/parent` |
| **Accountant** | `accountant` | `admin123` | `/portal/accountant` |
| **Admissions** | `admissions` | `admin123` | `/portal/admissions-officer` |

*(You can also use the 1-click Demo Role Selector on `/portal` or in the top navigation bar to test any role instantly).*

---

## 🏛️ School Details
- **Institution:** Blessed Child School Complex
- **Location:** Plot 42, Off Anaji-Mpatado Highway, P.O. Box AX 1420, Takoradi, Western Region, Ghana
- **Curriculum:** Ghana Basic Education Curriculum (NaCCA / GES Standards-Based Curriculum)
- **Levels:** Creche, Nursery 1 & 2, Kindergarten 1 & 2, Primary 1–6 (Basic 1–6), Junior High School 1–3 (JHS 1–3 / Basic 7–9)
