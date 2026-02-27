# LearnAI 校園版 - UI Migration Prompt

> **Purpose**: 這是一份完整的結構化 Prompt，供 AI 編碼助手（Cursor、Copilot、Claude 等）將 LearnAI 校園版 UI 設計移植到您現有的 AI Lab 系統中。
> **Source Repository**: https://github.com/kaiyin1028/v0-ai-learning-platform

---

## PROMPT START

你是一位資深全端工程師。你的任務是將 **LearnAI 校園版** UI 設計系統移植到我們現有的 **AI Lab** 系統。參考 UI 是一個靜態的 Next.js 原型（無後端）— 你需要將其與我們現有的後端、API、認證和資料庫整合。

---

### 1. 專案背景

**參考 UI Repository**: https://github.com/kaiyin1028/v0-ai-learning-platform

**目標使用者**: 校園內部師生
- **學生**: 使用學號 + 密碼登入，可使用 AI 對話、智能體、圖像生成等功能
- **教師**: 可建立課程智能體、查看學生學習歷程、管理班級權限
- **管理員**: 帳號管理、使用統計、系統設定

**參考技術棧** (僅 UI，無後端):
- Next.js 16 (App Router)
- React 19
- TypeScript 5.7
- Tailwind CSS v4 (無 `tailwind.config.js`，透過 `globals.css` `@theme inline` 配置)
- shadcn/ui (Radix UI primitives + CVA)
- Lucide React icons
- Fonts: Inter (Latin) + Noto Sans TC (繁體中文)

**關鍵依賴** (from `package.json`):
```json
{
  "next": "16.1.6",
  "react": "19.2.4",
  "tailwindcss": "^4.1.9",
  "lucide-react": "^0.564.0",
  "@radix-ui/react-*": "various",
  "class-variance-authority": "^0.7.1",
  "clsx": "^2.1.1",
  "tailwind-merge": "^3.3.1"
}
```

---

### 2. 設計系統 (必須保留)

#### 2.1 色彩 Token (oklch 格式，在 `app/globals.css`)

```
Primary:    oklch(0.55 0.18 250)  — 藍色，教育科技感、可信賴
Accent:     oklch(0.70 0.15 180)  — 青綠色，輔助色
Background: oklch(0.99 0.002 240) — 接近白色帶藍調
Foreground: oklch(0.15 0.02 250)  — 接近黑色帶藍調
Card:       oklch(1 0 0)          — 純白
Muted:      oklch(0.96 0.01 250)  — 淺灰帶藍調
Border:     oklch(0.92 0.01 250)  — 細微邊框
```

#### 2.2 角色色彩系統

```
學生 (Student):  藍色系 — bg-blue-100 text-blue-700 dark:bg-blue-900/30
教師 (Teacher):  綠色系 — bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30
管理員 (Admin):  紫色系 — bg-violet-100 text-violet-700 dark:bg-violet-900/30
```

#### 2.3 Typography

- **標題**: Inter (font-sans), weights 600-700
- **內文**: Inter + Noto Sans TC fallback, weight 400-500
- **程式碼**: Geist Mono
- 大小: H1=text-4xl/5xl, H2=text-2xl/3xl, H3=text-lg/xl, Body=text-sm/base, Caption=text-xs

#### 2.4 Spacing & Layout

- 圓角: `--radius: 0.75rem` (12px)
- 卡片: `rounded-2xl` (16px)
- 頁面容器: `max-w-4xl` 或 `max-w-6xl mx-auto px-4`
- App sidebar: 256px 固定寬度
- Mobile breakpoint: `lg:` (1024px)

---

### 3. 檔案結構

```
app/
  layout.tsx              # 根佈局 (字體、metadata、SEO)
  globals.css             # 設計 Token、Tailwind v4 @theme
  page.tsx                # 校園入口頁 (非行銷頁)
  login/
    page.tsx              # 登入頁 (支援學生/教師/管理員角色選擇)
  app/
    layout.tsx            # App Shell (側邊欄 + 角色導航)
    page.tsx              # AI 對話頁
    memory/
      page.tsx            # 學習記憶管理
    agent-builder/
      page.tsx            # 智能體建立器
    marketplace/
      page.tsx            # 智能體市集
    image-gen/
      page.tsx            # AI 圖像生成
    image-edit/
      page.tsx            # AI 圖像編輯
    teacher/
      students/
        page.tsx          # 教師專區：學生學習歷程
      agents/
        page.tsx          # 教師專區：課程智能體管理
    admin/
      users/
        page.tsx          # 管理員：帳號管理
      analytics/
        page.tsx          # 管理員：使用統計
      settings/
        page.tsx          # 管理員：系統設定
```

---

### 4. 頁面規格

#### 4.1 校園入口頁 (`/`)

**不是行銷頁**，而是簡潔的校園入口：
- **Header**: Logo + 平台名稱 + 登入按鈕
- **Hero**: 校園徽章 + 標題「用 AI 助力學習」+ 副標題 + 「使用學校帳號登入」CTA
- **Stats**: 3 個數據卡 (師生數/對話次數/智能體數)
- **Features**: 4 個功能卡 (AI 對話/智能體/圖像生成/圖像編輯)
- **Role Cards**: 3 個角色卡說明 (學生/教師/管理員各自的功能)
- **Footer**: 簡潔的連結列

#### 4.2 登入頁 (`/login`)

- **角色選擇器**: 學生/教師/管理員 (Select dropdown)
- **帳號輸入**: 學號/教職員編號/管理員帳號
- **密碼輸入**: 含顯示/隱藏切換
- **記住我**: Checkbox
- **忘記密碼連結**
- **Demo 測試帳號卡**: 顯示測試帳號資訊

**登入後導向邏輯**:
```ts
const redirectPath = role === "admin" 
  ? "/app/admin" 
  : role === "teacher"
  ? "/app/teacher"
  : "/app"
```

#### 4.3 App Shell (`/app/layout.tsx`)

**角色動態導航**:

| 角色 | 基本導航 | 專屬導航 |
|-----|---------|---------|
| 學生 | AI 對話、學習記憶、智能體工作室、智能體市集、圖像生成、圖像編輯 | (無) |
| 教師 | 同上 | + 學生學習歷程、課程智能體管理 |
| 管理員 | 同上 | + 帳號管理、使用統計、系統設定 |

**使用者資訊顯示**:
- Avatar + 姓名 + 角色 Badge + 學號/編號
- Dropdown menu: 個人設定、幫助中心、登出

#### 4.4 學生核心頁面

**AI 對話頁 (`/app`)**
- 模型選擇器 (LearnAI Pro / Fast / GPT-4 / Claude)
- 訊息區域 (AI 訊息有 avatar，使用者訊息靠右)
- 建議問題 chips (首次進入時顯示)
- 輸入區域 (附件按鈕 + textarea + 送出按鈕)

**學習記憶頁 (`/app/memory`)**
- 全域記憶開關
- 分類篩選 (學習風格/進度/興趣/個人/語言)
- 記憶卡片列表 (個別開關 + 刪除)

**智能體建立器 (`/app/agent-builder`)**
- 3 個 tabs: 我的智能體 / 模板庫 / 編輯器
- 模板: 法律、醫學、程式、寫作、商業、空白
- 編輯器: 基本設定 + 系統指令 + 工具權限 + 測試區

**智能體市集 (`/app/marketplace`)**
- 2 個 tabs: 探索 / 收藏
- 分類: 人文/理科/工程/語言
- 智能體卡片: icon + 名稱 + 描述 + tags + 使用數 + 評分

**圖像生成/編輯** (保持原設計)

#### 4.5 教師專區頁面

**學生學習歷程 (`/app/teacher/students`)**
- **統計卡**: 總學生數/本週活躍/總對話數/總智能體
- **篩選**: 搜尋 + 班級選擇器
- **學生表格**: 頭像+姓名+班級+對話數+智能體+圖像+狀態+操作
- **詳情 Dialog**: 學生完整數據 + 查看對話/學習歷程按鈕

**Data Shape**:
```ts
interface Student {
  id: string
  name: string
  studentId: string    // "S12345"
  class: string        // "高一甲班"
  totalChats: number
  totalMessages: number
  agentsCreated: number
  imagesGenerated: number
  lastActive: string
  status: "active" | "idle" | "inactive"
}
```

**課程智能體管理 (`/app/teacher/agents`)**
- **統計卡**: 智能體數/總使用次數/授權班級
- **智能體卡片**: icon + 名稱 + 課程 + 公開/限定 badge + 使用統計 + 授權班級 badges
- **管理 Dialog**: 公開切換 + 授權班級選擇

**Data Shape**:
```ts
interface CourseAgent {
  id: string
  name: string
  description: string
  course: string          // "程式設計概論"
  icon: string
  usageCount: number
  studentCount: number
  isPublic: boolean
  allowedClasses: string[]
  createdAt: string
}
```

#### 4.6 管理員專區頁面

**帳號管理 (`/app/admin/users`)**
- **統計卡**: 總帳號數/學生/教師/管理員
- **篩選**: 搜尋 + 身份 + 狀態
- **帳號表格**: 頭像+姓名+身份+班級/科別+狀態+最後登入+操作
- **新增帳號 Dialog**: 姓名、帳號、身份、Email
- **操作 Dropdown**: 編輯、重設密碼、停用/刪除

**Data Shape**:
```ts
interface UserAccount {
  id: string
  name: string
  userId: string           // "S12345" | "T00001" | "admin"
  role: "student" | "teacher" | "admin"
  class?: string           // 學生專用
  department?: string      // 教師專用
  email?: string
  status: "active" | "suspended" | "pending"
  lastLogin: string
  createdAt: string
}
```

**使用統計 (`/app/admin/analytics`)**
- **4 統計卡**: 總使用次數/活躍用戶/智能體使用/圖像生成 (含趨勢箭頭)
- **時間範圍選擇器**: 7天/30天/90天/一年
- **每日使用趨勢圖**: 長條圖
- **功能使用分布**: 進度條 (AI對話 45%/智能體 28%/圖像 27%)
- **熱門智能體排行**: 前 5 名
- **活躍班級排行**: 前 5 名

**系統設定 (`/app/admin/settings`)**
4 個 Tabs:
1. **一般設定**: 平台名稱、學校名稱、歡迎訊息、使用限制
2. **功能開關**: AI 對話/智能體/圖像生成/圖像編輯 + 學生權限
3. **安全性**: 密碼政策、登入鎖定、Session 時間、資料保留
4. **API 設定**: OpenAI/Anthropic API Key、預設模型

---

### 5. 移植步驟

#### Step 1: 設定設計系統
1. 複製 `globals.css` 色彩 token 到您的專案
2. 如果使用 Tailwind v3，將 `@theme inline` 轉換為 `tailwind.config.js` 格式
3. 安裝 Inter + Noto Sans TC 字體
4. 確認所有需要的 shadcn/ui 元件已安裝

#### Step 2: 整合認證系統
1. 實作登入頁的真實認證邏輯
2. 設定角色 (student/teacher/admin) 的 session/token 儲存
3. 實作路由保護 middleware

#### Step 3: 整合入口頁與登入頁
1. 複製 `app/page.tsx` (校園入口頁)
2. 複製 `app/login/page.tsx` (登入頁)
3. 連接真實認證 API

#### Step 4: 整合 App Shell
1. 複製 `app/app/layout.tsx`
2. 實作角色判斷邏輯 (從 auth context 取得)
3. 連接真實使用者資訊

#### Step 5: 整合各頁面
每個頁面依照此模式：
1. 複製 UI 元件結構
2. 將 `useState` mock data 替換為真實 API 呼叫 (建議用 SWR)
3. 連接互動元素到真實 API endpoints
4. 實作錯誤處理和載入狀態

**各頁面 API 對應**:

| 頁面 | 需要的 API |
|-----|-----------|
| 登入 | POST /api/auth/login |
| AI 對話 | POST /api/chat (streaming), GET /api/conversations |
| 學習記憶 | GET/PUT/DELETE /api/memories |
| 智能體建立器 | CRUD /api/agents |
| 智能體市集 | GET /api/marketplace, POST /api/favorites |
| 圖像生成 | POST /api/images/generate |
| 圖像編輯 | POST /api/images/edit |
| 學生歷程 (教師) | GET /api/teacher/students |
| 課程智能體 (教師) | CRUD /api/teacher/agents |
| 帳號管理 (管理員) | CRUD /api/admin/users |
| 使用統計 (管理員) | GET /api/admin/analytics |
| 系統設定 (管理員) | GET/PUT /api/admin/settings |

---

### 6. 重要注意事項

1. **角色權限控制**: 必須在 API 層級驗證角色權限，不只是前端隱藏
2. **學校帳號整合**: 可能需要對接學校的 LDAP/AD 或 SSO 系統
3. **Tailwind v4 vs v3**: 參考專案使用 v4，如果您的專案用 v3 需要轉換 token 格式
4. **繁體中文**: 所有 UI 文字都是繁體中文，如需 i18n 請提取字串

---

### 7. 快速檢查清單

- [ ] Clone 參考 repo 並執行 `pnpm install && pnpm dev` 查看 UI
- [ ] 複製設計 token 到您的專案
- [ ] 安裝缺少的 shadcn/ui 元件
- [ ] 實作認證系統 (學號密碼登入)
- [ ] 複製入口頁和登入頁
- [ ] 複製 App Shell (含角色導航)
- [ ] 複製學生核心頁面 (對話/記憶/智能體/圖像)
- [ ] 複製教師專區頁面 (學生歷程/課程智能體)
- [ ] 複製管理員專區頁面 (帳號/統計/設定)
- [ ] 連接所有真實 API
- [ ] 測試響應式佈局 (手機/平板/桌面)
- [ ] 測試各角色的權限控制

---

### 8. 路由對照表

| 路由 | 說明 | 權限 |
|-----|------|-----|
| `/` | 校園入口頁 | 公開 |
| `/login` | 登入頁 | 公開 |
| `/app` | AI 對話 | 登入用戶 |
| `/app/memory` | 學習記憶 | 登入用戶 |
| `/app/agent-builder` | 智能體建立器 | 登入用戶 |
| `/app/marketplace` | 智能體市集 | 登入用戶 |
| `/app/image-gen` | 圖像生成 | 登入用戶 |
| `/app/image-edit` | 圖像編輯 | 登入用戶 |
| `/app/teacher/students` | 學生學習歷程 | 教師+ |
| `/app/teacher/agents` | 課程智能體管理 | 教師+ |
| `/app/admin/users` | 帳號管理 | 管理員 |
| `/app/admin/analytics` | 使用統計 | 管理員 |
| `/app/admin/settings` | 系統設定 | 管理員 |

## PROMPT END
