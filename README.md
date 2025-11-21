# 🏫 Cicero Dashboard — 本地開發環境搭建指南

本文件說明如何從 **零開始** 在 Windows 上建立並運行 Cicero Dashboard（基於 Next.js + PostgreSQL + Prisma + Auth.js + Resend）。

此 README 適用於：

* 初次安裝開發環境
* 想在本地完整測試 Login、Dashboard、資料庫
* 未部署前的本地測試流程

---

# 📌 1. 系統需求

* Windows 10 / 11
* Node.js LTS（建議 v18+ / v20+）
* Git for Windows
* PostgreSQL（版本 16 或 17）
* VSCode（非必要但建議）

---

# 📦 2. 安裝 Node.js 與 Git

### 查看 Node 是否已安裝

```bash
node -v
npm -v
```

如未安裝 → 到官方 [https://nodejs.org/en/](https://nodejs.org/en/) 下載 LTS。

### 查看 Git

```bash
git --version
```

未有則到 [https://git-scm.com/](https://git-scm.com/) 安裝。

---

# 📂 3. Clone Cicero Dashboard 專案

選擇安裝目錄，例如：`F:\Develop\GitHub\`

```bash
git clone <你的 Repo URL>
```

或原 template：

```bash
git clone https://github.com/zxmodren/Nextjs-SchoolManagementSystem-Template.git
```

進入資料夾：

```bash
cd ubiquitous-octo-potato
```

---

# 📦 4. 安裝依賴

```bash
npm install
```

如出現 vulnerabilities 屬正常，暫時可忽略。

---

# 🗄️ 5. 安裝 PostgreSQL + pgAdmin

1. 到官方 [https://www.postgresql.org/download/windows/](https://www.postgresql.org/download/windows/)
2. 下載 **EDB Installer**
3. 安裝期間會要求：

   * Components：**PostgreSQL Server + pgAdmin**
   * 設置 superuser 密碼（記住！）
   * Port：5432（預設）
4. 安裝完成後會自動開啟 Stack Builder（可直接關閉）

---

# 🗄️ 6. 建立本地資料庫 nextjs_sms

打開 **pgAdmin 4**：

1. 展開 Servers → PostgreSQL → Databases
2. 右鍵 → Create → Database
3. 輸入名稱：

```
nextjs_sms
```

儲存。

---

# 🔑 7. 設定 `.env`（非常重要）

於專案根目錄建立 `.env`：

```env
DATABASE_URL="postgresql://postgres:你的密碼@localhost:5432/nextjs_sms?schema=public"
DIRECT_URL="postgresql://postgres:你的密碼@localhost:5432/nextjs_sms?schema=public"

AUTH_SECRET="任意64字元隨機字串"
NEXTAUTH_SECRET="同AUTH_SECRET"
AUTH_TRUST_HOST="true"

# Resend（Email 功能）
RESEND_API_KEY="re_xxxxxxx"   # 可用 onboarding key 或正式 key
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

⚠ 必須重啟後才會生效：

```bash
npm run dev
```

---

# 🧬 8. 產生 Prisma Client + 建表

```bash
npx prisma migrate dev --name init
```

成功會顯示：

```
Your database is now in sync with your schema.
```

如需查看資料庫：

```bash
npx prisma studio
```

---

# 👤 9. 建立 Admin 初始帳戶（手動建立）

開啟 Prisma Studio：

```bash
npx prisma studio
```

進入 **User** 表，新增記錄：

| 欄位                 | 值                                             |
| ------------------ | --------------------------------------------- |
| name               | Admin                                         |
| email              | [admin@example.com](mailto:admin@example.com) |
| password           | bcrypt hash（下方教你產生）                           |
| role               | ADMIN                                         |
| gender             | UNKNOW                                        |
| status             | ACTIVE                                        |
| isTwoFactorEnabled | false                                         |

### 生成 bcrypt 密碼：

先安裝：

```bash
npm install bcryptjs
```

再生成 hash：

```bash
node -e "console.log(require('bcryptjs').hashSync('YourPassword123', 10))"
```

把輸出填入 `password`。

儲存即可。

---

# 📧 10. Email 驗證設定（Resend）

系統登入需要寄 email（2FA / verification）。

你有兩個選項：

---

## 選項 A — 使用 Resend Sandbox（最快）

把 `mail.ts` 內的寄件人改成：

```ts
from: "Cicero <onboarding@resend.dev>",
```

或：

```ts
from: "Cicero <delivered@resend.dev>",
```

**此模式無需驗證域名即可寄出 email。**

---

## 選項 B — 使用正式 Domain

如果你想用：

```
noreply@yourdomain.com
```

你必須去 Resend → Domains 添加 domain，並在 DNS 加入 TXT/MX 記錄完成驗證。

未驗證的話 Resend 會回傳：

```
The domain is not verified.
```

---

# 🔐 11. 登入流程

啟動本地伺服器：

```bash
npm run dev
```

打開：

```
http://localhost:3000/auth/login
```

輸入：

* Email: `admin@example.com`
* 密碼：你剛才設定嘅明碼

若 email 驗證成功，你會收到寄送的 confirmation link。
點擊後會進入 Dashboard。

---

# 🧹 12. 常見錯誤與解決

### ❌ P1013: Invalid database string

* `.env` 裏面的 `DATABASE_URL` 格式錯
* 密碼含特殊符號需要 URL encode
* `.env` 有 BOM（另存為 UTF-8 無 BOM）

---

### ❌ P1012: Must provide a nonempty direct URL

* `schema.prisma` 使用了：

```prisma
directUrl = env("DIRECT_URL")
```

→ `.env` 必須提供 `DIRECT_URL`（可與 `DATABASE_URL` 相同）。

---

### ❌ Missing API key / Resend throw error

* `.env` 的 `RESEND_API_KEY` 空白
* 你使用未驗證 domain 作 sender
* 用 `onboarding@resend.dev` 可以避過

---

### ❌ Token does not exist

* 你重複 login 令 token 被覆蓋
* server restart 令 token 失效
* email 未成功寫入 DB

**重新登入一次即可。**

---

### ❌ UntrustedHost / MissingSecret

加入：

```env
AUTH_SECRET="xxxx"
AUTH_TRUST_HOST="true"
```

即可。

---

# 🎉 13. 完成！你已成功啟動 Cicero Dashboard

達成項目：

✔ 成功 Clone + Install
✔ PostgreSQL + pgAdmin 建立資料庫
✔ `.env` 正確設定
✔ Prisma 建表
✔ 建立 Admin
✔ 修正 Resend 錯誤
✔ 成功登入 Dashboard

---

# 📌 最後提示

本 README 已足夠讓任何新開發者：

* 從零建立完整本地環境
* 成功登入 Cicero Dashboard
* 使用 DB、Email login、Prisma