# **CiceroVibe — API × Role Access Matrix (English Version)**

This document defines which user roles are allowed to perform **read (GET)** and **write (POST/PUT/DELETE)** operations for each API route in the system.
It reflects the correct business logic based on your repo’s actual user roles:

* **ADMIN**
* **TEACHER**
* **STUDENT**

Legend:

* **R** = Read (GET)
* **W** = Write (POST/PUT/DELETE)
* **X** = Not allowed

---

# **1. Lesson API**

`/api/lesson`

| Action | ADMIN   | TEACHER      | STUDENT | COMPANY |
| ------ | ------- | ------------ | ------- | ------- |
| GET    | R (all) | R (own only) | X       | R       |
| POST   | W       | W (own only) | X       | W       |
| PUT    | W       | W (own only) | X       | W       |
| DELETE | W       | W (own only) | X       | W       |

---

# **2. Assignment API**

`/api/assignment`

| Action | ADMIN   | TEACHER      | STUDENT              | COMPANY |
| ------ | ------- | ------------ | -------------------- | ------- |
| GET    | R (all) | R (own only) | X or R (if assigned) | R       |
| POST   | W       | W            | X                    | W       |
| PUT    | W       | W            | X                    | W       |
| DELETE | W       | W            | X                    | W       |

---

# **3. Schedule API**

`/api/schedule`

| Action | ADMIN   | TEACHER      | STUDENT             | COMPANY |
| ------ | ------- | ------------ | ------------------- | ------- |
| GET    | R (all) | R (own only) | X or R (if allowed) | R       |
| POST   | W       | W (own only) | X                   | W       |
| PUT    | W       | W (own only) | X                   | W       |
| DELETE | W       | W (own only) | X                   | W       |

---

# **4. Classroom API**

`/api/classroom`

| Action | ADMIN | TEACHER           | STUDENT | COMPANY |
| ------ | ----- | ----------------- | ------- | ------- |
| GET    | R     | R                 | X       | R       |
| POST   | W     | X (or restricted) | X       | W       |
| PUT    | W     | X                 | X       | W       |
| DELETE | W     | X                 | X       | W       |

---

# **5. User API**

`/api/user`

| Action | ADMIN   | TEACHER                            | STUDENT              | COMPANY                             |
| ------ | ------- | ---------------------------------- | -------------------- | ----------------------------------- |
| GET    | R (all) | R (self + allowed student profile) | X                    | R                                   |
| POST   | W       | X                                  | X                    | W (create teacher/student accounts) |
| PUT    | W       | W (update self only)               | W (update self only) | W                                   |
| DELETE | W       | X                                  | X                    | W                                   |

---

# **6. Auth-Related Routes**

`/api/auth/*`

| Route             | ADMIN   | TEACHER | STUDENT | COMPANY |
| ----------------- | ------- | ------- | ------- | ------- |
| /api/auth/*       | allowed | allowed | allowed | allowed |
| /api/auth/session | R       | R       | R       | R       |

---

# **7. High-Priority Enforcement Rules**

### ❌ Must block:

* Unauthenticated users → **any POST/PUT/Delete returns 401**
* STUDENT → **all write operations return 403**
* TEACHER → cannot manage system-level resources (users/classrooms)
* COMPANY → should not modify individual student personal data

### ✔ Must allow:

* TEACHER can only write records that belong to themselves
* ADMIN + COMPANY have full or system-level permissions
* STUDENT read access must be minimal and controlled

---