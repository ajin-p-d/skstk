# 🥋 Kalari Class Website

## Website Design & Development Specification

A modern, cinematic, and traditional website for a **Kalaripayattu / Kalari training class**.

The website should combine the **ancient heritage and discipline of Kalari** with a modern digital student management system.

---

# 🎯 Project Objectives

The website will have two major purposes:

## 1. Public Website

A visually attractive website introducing:

- Our Kalari art
- Our training style
- History and heritage
- Masters and instructors
- Training programs
- Gallery and videos
- Class information
- Contact details

## 2. Student Management System

A secure dashboard for managing:

- Student registration
- Student profiles
- Attendance
- Monthly fees
- Payment history
- Pending fees
- Reports
- Notifications

---

# 🎨 Design Concept

The website design should feel:

- Traditional
- Powerful
- Cinematic
- Elegant
- Modern
- Disciplined
- Authentic to Kerala Kalari culture

## Suggested Visual Style

### Primary Colors

```text
Deep Black        #0B0B0B
Dark Brown        #241A14
Earth Brown       #5C3A21
Traditional Gold  #C89B3C
Warm Beige        #E8DCC8
White             #F5F5F5
```

The interface should primarily use a **dark cinematic background** with gold and earth-tone highlights.

---

# 🏠 Home Page

## Section 1 — Full Screen Introduction

The first screen should immediately introduce the power and beauty of Kalari.

### Background

Use a full-screen video.

The uploaded Kalari training video can be used as an inspiration/reference for this section.

The video should:

- Play automatically
- Be muted
- Loop continuously
- Cover the full screen
- Have a dark cinematic overlay

### Text Animation

The text should appear slowly while the user enters the website.

```text
KALARIPAYATTU

The Art of Discipline.
The Art of Movement.
The Art of Survival.
```

### Animation Style

Use smooth cinematic animations:

- Fade in
- Slow upward movement
- Letter spacing animation
- Text reveal
- Parallax effect

Example animation sequence:

```text
0 seconds
↓
Dark screen

1 second
↓
Video slowly appears

2 seconds
↓
"KALARIPAYATTU" appears

3 seconds
↓
"The Art of Discipline."

4 seconds
↓
"The Art of Movement."

5 seconds
↓
"The Art of Survival."
```

---

# 🌊 Section 2 — Scroll-Based Kalari Introduction

As the user scrolls down, the website should tell the story of Kalari through animations.

The experience should feel similar to a cinematic documentary.

---

## Scroll Scene 1

### Text

> Every movement begins with discipline.

### Animation

- Video/image slowly scales
- Text moves upward
- Background slightly zooms
- Smooth fade transition

---

## Scroll Scene 2

### Text

> Every step carries centuries of tradition.

Show:

- Kalari movements
- Footwork
- Body balance
- Training discipline

### Animation

Use scroll-triggered movement.

```text
User scrolls
↓
Video moves slowly
↓
Text appears
↓
Next scene fades in
```

---

## Scroll Scene 3

### Text

> Strength is not only in the body.
>
> It is in the mind.

Show:

- Meditation
- Focus
- Training preparation
- Discipline

---

## Scroll Scene 4

### Text

> Speed.
>
> Balance.
>
> Control.

Each word should appear separately while scrolling.

Example:

```text
SCROLL

↓

SPEED

↓

BALANCE

↓

CONTROL
```

---

## Scroll Scene 5

### Final Introduction

Large text:

```text
THIS IS KALARI.
```

Below:

```text
Train the Body.
Discipline the Mind.
Strengthen the Spirit.
```

Button:

```text
JOIN OUR KALARI
```

---

# ✨ Recommended Scroll Animation Technology

For a modern frontend:

```text
React / Next.js
```

Recommended animation libraries:

```text
GSAP
ScrollTrigger
Framer Motion
Lenis Smooth Scroll
```

Suggested implementation:

```text
Lenis
    ↓
Smooth scrolling

GSAP ScrollTrigger
    ↓
Scroll-based animations

Framer Motion
    ↓
Text and UI animations
```

---

# 🥋 About Kalari Section

This section should explain the art.

## Heading

```text
THE ART OF KALARIPAYATTU
```

## Content Areas

### History

Brief introduction to the history and heritage of Kalaripayattu.

### Discipline

Explain the importance of:

- Physical discipline
- Mental focus
- Respect
- Self-control

### Training

Introduce:

- Body conditioning
- Footwork
- Combat movements
- Flexibility
- Weapon training
- Self-defense

---

# 👨‍🏫 Masters & Instructors

Create a section for trainers.

Each instructor card should include:

```text
[ Profile Image ]

Name

Designation

Years of Experience

Specialization

"Train with discipline. Live with strength."
```

Example:

```text
MASTER NAME

Chief Instructor

15+ Years of Experience

Specialization:
• Kalari
• Body Conditioning
• Self Defence
```

---

# 🥊 Training Programs

Create visually attractive program cards.

## Program Examples

### Beginner Training

```text
Basic Kalari movements
Body flexibility
Footwork
Basic discipline
```

### Intermediate Training

```text
Advanced movements
Combat techniques
Balance training
Partner training
```

### Advanced Training

```text
Weapon training
Advanced combat
Traditional Kalari techniques
Instructor guidance
```

### Self Defense

```text
Personal protection
Escape techniques
Awareness
Practical self defense
```

---

# 🖼️ Gallery

The gallery should contain:

- Training photos
- Kalari arena photos
- Students training
- Group photos
- Events
- Competitions
- Traditional Kalari activities

## Gallery Style

Use:

```text
Masonry Grid
+
Hover Zoom
+
Dark Overlay
+
Smooth Lightbox
```

---

# 🎥 Videos

Create a dedicated video section.

Each video card:

```text
Video Thumbnail

▶ Play

Video Title

Short Description
```

Possible categories:

```text
Training Sessions
Demonstrations
Student Practice
Events
Kalari Techniques
```

---

# 📅 Class Schedule

Create a class schedule page.

Example:

| Day | Morning | Evening |
|---|---|---|
| Monday | 6:00 AM – 7:30 AM | 5:00 PM – 7:00 PM |
| Tuesday | 6:00 AM – 7:30 AM | 5:00 PM – 7:00 PM |
| Wednesday | 6:00 AM – 7:30 AM | 5:00 PM – 7:00 PM |
| Thursday | 6:00 AM – 7:30 AM | 5:00 PM – 7:00 PM |
| Friday | 6:00 AM – 7:30 AM | 5:00 PM – 7:00 PM |
| Saturday | Special Training | Special Training |

---

# 🔐 Student Management System

The website should include a separate secure system for students and administrators.

---

# 👨‍💼 Admin Dashboard

After admin login, show a dashboard.

## Dashboard Statistics

```text
TOTAL STUDENTS

PRESENT TODAY

ABSENT TODAY

MONTHLY COLLECTION

PENDING FEES
```

Example dashboard layout:

```text
------------------------------------------------

Total Students        Present Today

       120                  98


Absent Today         Pending Fees

       22                 ₹15,000

------------------------------------------------

Attendance Chart

------------------------------------------------

Monthly Fee Collection Chart

------------------------------------------------
```

---

# 👨‍🎓 Student Management

Admin should be able to:

- Add student
- Edit student
- View student profile
- Deactivate student
- Search student
- Filter students

## Student Details

```text
Student ID
Student Name
Photo
Phone Number
Parent Name
Parent Phone Number
Date of Birth
Age
Gender
Address
Joining Date
Training Level
Batch
Status
```

Example ID:

```text
KAL-2026-001
```

---

# 📋 Attendance Management

## Daily Attendance

Admin selects:

```text
Date

↓

Batch

↓

Student List
```

Example:

| Student | Status |
|---|---|
| Arun | Present |
| Rahul | Present |
| Ajay | Absent |
| Vishnu | Present |

Status options:

```text
🟢 Present

🔴 Absent

🟡 Leave
```

---

## Attendance Features

The system should provide:

- Daily attendance
- Monthly attendance
- Student attendance history
- Attendance percentage
- Batch-wise attendance
- Date-wise reports

Example:

```text
Arun Kumar

Attendance This Month

███████████████░░

92%
```

---

# 💰 Fee Management

The admin should manage student fees.

Each student should have:

```text
Monthly Fee Amount
Due Date
Payment Status
Payment Date
Payment Method
Receipt Number
```

---

# Fee Status

Use visual status indicators.

```text
🟢 PAID

🟡 PARTIALLY PAID

🔴 PENDING

⚠ OVERDUE
```

---

# Monthly Fee Dashboard

Example:

```text
September 2026

Expected Collection
₹50,000

Collected
₹42,000

Pending
₹8,000
```

---

# Student Fee History

Each student profile should display:

| Month | Amount | Status |
|---|---:|---|
| July | ₹500 | Paid |
| August | ₹500 | Paid |
| September | ₹500 | Pending |

---

# Payment Management

Admin should be able to:

```text
Select Student

↓

Enter Amount

↓

Select Payment Method

↓

Cash / UPI / Bank Transfer

↓

Confirm Payment

↓

Generate Receipt
```

---

# 🧾 Fee Receipt

The system should generate a printable receipt.

Example:

```text
---------------------------------

KALARI CLASS NAME

FEE PAYMENT RECEIPT

Receipt No: KAL-REC-001

Student Name: Arun Kumar

Month: September 2026

Amount Paid: ₹500

Payment Method: UPI

Payment Date: 11/09/2026

---------------------------------

Thank You

Train With Discipline.
Live With Strength.

---------------------------------
```

---

# 👨‍🎓 Student Portal

Students should have their own login.

After login, students can see:

## Dashboard

```text
Welcome Back, Arun 👋

Today's Class

5:00 PM – 7:00 PM
```

---

## Student Statistics

```text
Attendance
92%

Fee Status
PAID

Training Level
Intermediate
```

---

# Student Attendance Page

Display:

```text
Monthly Attendance

September 2026

🟢 Present
🟢 Present
🔴 Absent
🟢 Present
🟢 Present
```

Also show:

```text
Total Classes: 20

Present: 18

Absent: 2

Attendance Percentage: 90%
```

---

# Student Fee Page

Display:

```text
Current Month Fee

₹500

Status

PAID
```

Payment history:

```text
August 2026      ₹500      PAID

July 2026        ₹500      PAID

June 2026        ₹500      PAID
```

---

# 🔔 Notifications

The system can send notifications for:

## Fee Reminder

```text
Your monthly Kalari fee is due.
Please complete the payment.
```

## Attendance Alert

```text
Your attendance has fallen below 75%.
```

## Class Reminder

```text
Your Kalari class starts at 5:00 PM today.
```

## Event Notification

```text
Special Kalari training session this Sunday.
```

---

# 📊 Reports

Admin should be able to generate reports.

## Attendance Reports

```text
Daily Attendance Report

Weekly Attendance Report

Monthly Attendance Report

Student Attendance Report

Batch Attendance Report
```

---

## Fee Reports

```text
Monthly Collection

Pending Fees

Student Payment History

Overdue Fees

Yearly Collection
```

---

# 🧭 Website Navigation

## Public Navigation

```text
HOME

ABOUT

TRAINING

INSTRUCTORS

GALLERY

VIDEOS

SCHEDULE

CONTACT

LOGIN
```

---

# Login Options

```text
STUDENT LOGIN

ADMIN LOGIN
```

---

# 📱 Mobile Responsive Design

The website must work perfectly on:

```text
Desktop
Laptop
Tablet
Mobile
```

The scroll animation should be optimized for mobile devices.

For mobile:

```text
Reduce heavy animations

Optimize videos

Lazy load images

Use compressed video

Avoid excessive GPU effects
```

---

# 🏗️ Recommended Technical Architecture

## Frontend

```text
Next.js

TypeScript

Tailwind CSS

GSAP

ScrollTrigger

Framer Motion
```

---

## Backend

Recommended options:

```text
Node.js

Express.js
```

or

```text
Next.js API
```

---

## Database

Recommended:

```text
PostgreSQL
```

Alternative:

```text
MySQL
```

---

# 🗄️ Database Structure

## Students

```text
students

id
student_id
name
photo
phone
parent_name
parent_phone
date_of_birth
gender
address
joining_date
batch_id
training_level
status
created_at
```

---

## Attendance

```text
attendance

id
student_id
date
status
marked_by
created_at
```

---

## Fees

```text
fees

id
student_id
month
year
total_amount
paid_amount
due_date
status
created_at
```

---

## Payments

```text
payments

id
student_id
fee_id
amount
payment_method
payment_date
receipt_number
created_at
```

---

## Batches

```text
batches

id
name
instructor_id
start_time
end_time
days
```

---

# 🎬 Recommended Homepage Experience

The homepage experience should follow this sequence:

```text
USER OPENS WEBSITE

        ↓

FULL SCREEN KALARI VIDEO

        ↓

KALARIPAYATTU

The Art of Discipline

        ↓

USER SCROLLS

        ↓

EVERY MOVEMENT BEGINS WITH DISCIPLINE

        ↓

EVERY STEP CARRIES TRADITION

        ↓

SPEED

        ↓

BALANCE

        ↓

CONTROL

        ↓

THIS IS KALARI

        ↓

JOIN OUR KALARI
```

---

# 🚀 Future Features

Future versions can include:

```text
QR Code Attendance

Face Recognition Attendance

Online Fee Payment

UPI Integration

WhatsApp Notifications

SMS Notifications

Parent Portal

Training Progress Tracking

Belt / Level Progression

Event Registration

Certificate Generation

Online Kalari Courses
```

---

# 📌 Project Priority

## Phase 1

```text
Public Website

Cinematic Scroll Introduction

About Kalari

Training Programs

Instructors

Gallery

Contact
```

## Phase 2

```text
Admin Login

Student Management

Attendance Management

Fee Management
```

## Phase 3

```text
Student Portal

Reports

Notifications

Receipt Generation
```

## Phase 4

```text
Online Payments

QR Attendance

Advanced Analytics

Mobile Application
```

---

# 🥋 Final Website Vision

> A modern digital platform that preserves the tradition of Kalari while making class and student management simple, efficient, and professional.

```text
TRADITION × DISCIPLINE × TECHNOLOGY
```

# 🥋

## Train the Body.
## Discipline the Mind.
## Strengthen the Spirit.