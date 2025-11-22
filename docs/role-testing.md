The following is a complete summary, password, and role description document for three test accounts. You can directly paste this into a README, Notion, Google Docs, or Slack for engineers to use.

---

# **CiceroVibe – Local Test Account Description Document**

This document lists the three test accounts currently created in the local development environment (Prisma Studio/localhost DB), including login information, user roles, permission scope, and their purpose for accepting QA processes.

All accounts use the same test password:

**Password: `Test1234!`**

(Stored in DB using bcrypt hash)

---

## **1. Admin Account (High Privileges)**

### **Account Information**

* **Email**: `admin_test@local.dev`

* **Password**: `Test1234!`

* **Role**: `ADMIN`

* **Status**: `ACTIVE`

* **Teacher Profile**: None

* **Student Profile**: None

### **Availability**

* Can log in to the entire Dashboard

* Can see all Admin cards

* Can perform all API POST/PUT/DELETE

* Can be used for testing:

* API authentication

* Full privileges operation

* RoleGate behavior (Admin should see all cards)

---

## **2. Teacher Account (Medium Privileges)**

### **Account Information**

* **Email**: `teacher_test@local.dev`

* **Password**: `Test1234!`

* **Role**: `TEACHER`

* **Status**: `ACTIVE`

* **Teacher Profile**: Successfully created (1 record in the Teacher table)

* **Student Profile**: None

### **Availability**

* Can log in to the Dashboard

* Should only see teacher-related functions (Teacher cards)

* Should not see Admin cards

* API permissions are restricted:

* Can only perform POST/PUT operations that Teachers can perform

* Disable Admin-restricted functions → Should result in a 403 error

### **For testing purposes**

* RoleGate multi-role judgment

* Teacher-only actions

* API authorization (Teacher cannot perform Admin writes)

---

## **3. Student Account (Minimum Privileges)**

### **Account Information**

* **Email**: `student_test@local.dev`

* **Password**: `Test1234!`

* **Role**: `STUDENT` (or adjust according to enum)

* **Status**: `ACTIVE`

* **Teacher Profile**: None

* **Student Profile**: Optional; if created, it will link to userId

### **Availability**

* Login is possible, but only the most basic UI should be visible (or no dashboard functionality).

* The teacher/admin card should not be visible.

* API Permissions:

* Any write operation (POST/PUT/DELETE) → **Requires 403**

* Without login → Requires 401

### **For Testing**

* Unauthorized user testing

* RoleGate: The portion of the Student account without permissions should be automatically hidden.

* API write → Must be blocked.

---

# **List of Three Accounts**

| Type | Email | Password | Role | Teacher Profile | Student Profile | Purpose |

| ------- | ------------------------------------------------------- | --------- | ------- | --------------- | --------------- | --------------------- |

| Admin | [admin_test@local.dev](mailto:admin_test@local.dev) | Test1234! | ADMIN | ❌ | ❌ | Full permissions / API acceptance |

| Teacher | [teacher_test@local.dev](mailto:teacher_test@local.dev) | Test1234! | TEACHER | ✅ 1 record | ❌ | Teacher UI / API partial permissions |

| Student | [student_test@local.dev](mailto:student_test@local.dev) | Test1234! | STUDENT | ❌ | Optional | Unauthorized testing / 403 routine |