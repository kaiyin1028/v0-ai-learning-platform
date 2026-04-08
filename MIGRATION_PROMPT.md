# LearnAI 校園版 - AI 開發移植指南

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

### 2. Ubuntu 開發環境設定

#### 2.1 系統需求
- Ubuntu 22.04 LTS 或更新版本
- Node.js 20+
- PostgreSQL 15+
- 建議 RAM: 8GB+

#### 2.2 快速安裝腳本

```bash
#!/bin/bash
# LearnAI Ubuntu 開發環境安裝腳本

# 1. 更新系統
sudo apt update && sudo apt upgrade -y

# 2. 安裝 Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# 3. 安裝 pnpm
npm install -g pnpm

# 4. 安裝 PostgreSQL
sudo apt-get install -y postgresql postgresql-contrib

# 5. 啟動 PostgreSQL
sudo systemctl start postgresql
sudo systemctl enable postgresql

# 6. 建立資料庫和使用者
sudo -u postgres psql << EOF
CREATE USER learnai WITH PASSWORD 'your_secure_password';
CREATE DATABASE learnai_db OWNER learnai;
GRANT ALL PRIVILEGES ON DATABASE learnai_db TO learnai;
\q
EOF

# 7. Clone 專案
git clone https://github.com/kaiyin1028/v0-ai-learning-platform.git
cd v0-ai-learning-platform

# 8. 安裝依賴
pnpm install

# 9. 設定環境變數
cp .env.example .env.local
echo "請編輯 .env.local 填入你的設定"

# 10. 初始化資料庫
psql -U learnai -d learnai_db -f scripts/001_init_database.sql

# 11. 啟動開發伺服器
pnpm dev
```

#### 2.3 Docker 部署 (可選)

```bash
# 使用 Docker Compose 一鍵部署
docker-compose up -d

# 查看日誌
docker-compose logs -f app
```

---

### 3. 設計系統 (必須保留)

#### 3.1 色彩 Token (oklch 格式，在 `app/globals.css`)

```
Primary:    oklch(0.55 0.18 250)  — 藍色，教育科技感、可信賴
Accent:     oklch(0.70 0.15 180)  — 青綠色，輔助色
Background: oklch(0.99 0.002 240) — 接近白色帶藍調
Foreground: oklch(0.15 0.02 250)  — 接近黑色帶藍調
Card:       oklch(1 0 0)          — 純白
Muted:      oklch(0.96 0.01 250)  — 淺灰帶藍調
Border:     oklch(0.92 0.01 250)  — 細微邊框
```

#### 3.2 角色色彩系統

```
學生 (Student):  藍色系 — bg-blue-100 text-blue-700 dark:bg-blue-900/30
教師 (Teacher):  綠色系 — bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30
管理員 (Admin):  紫色系 — bg-violet-100 text-violet-700 dark:bg-violet-900/30
```

#### 3.3 Typography

- **標題**: Inter (font-sans), weights 600-700
- **內文**: Inter + Noto Sans TC fallback, weight 400-500
- **程式碼**: Geist Mono
- 大小: H1=text-4xl/5xl, H2=text-2xl/3xl, H3=text-lg/xl, Body=text-sm/base, Caption=text-xs

#### 3.4 Spacing & Layout

- 圓角: `--radius: 0.75rem` (12px)
- 卡片: `rounded-2xl` (16px)
- 頁面容器: `max-w-4xl` 或 `max-w-6xl mx-auto px-4`
- App sidebar: 256px 固定寬度
- Mobile breakpoint: `lg:` (1024px)

---

### 4. 資料庫架構

參考 `DATABASE_SCHEMA.md` 和 `scripts/001_init_database.sql`

#### 核心資料表

| 資料表 | 說明 |
|-------|------|
| `users` | 使用者 (學生/教師/管理員) |
| `classes` | 班級 |
| `conversations` | 對話 |
| `messages` | 訊息 |
| `memories` | 學習記憶 |
| `agents` | 智能體 |
| `agent_access` | 智能體班級權限 |
| `favorites` | 收藏 |
| `generated_images` | 生成圖片 |
| `usage_logs` | 使用記錄 |
| `system_settings` | 系統設定 |

#### 預設帳號

| 角色 | 帳號 | 密碼 |
|-----|------|------|
| 管理員 | admin | admin123 |
| 教師 | T001 | teacher123 |
| 學生 | S001 | student123 |

---

### 5. API 端點規劃

參考 `API_SPECIFICATION.md` 完整文件

#### 核心 API

| 端點 | 方法 | 說明 |
|-----|------|------|
| `/api/auth/login` | POST | 登入 |
| `/api/auth/logout` | POST | 登出 |
| `/api/auth/me` | GET | 取得當前用戶 |
| `/api/conversations` | GET/POST | 對話列表/建立 |
| `/api/conversations/:id/messages` | POST | 發送訊息 (SSE) |
| `/api/memories` | GET/POST/DELETE | 記憶管理 |
| `/api/agents` | CRUD | 智能體管理 |
| `/api/images/generate` | POST | 圖片生成 |
| `/api/teacher/students` | GET | 學生列表 |
| `/api/admin/users` | CRUD | 帳號管理 |
| `/api/admin/analytics` | GET | 使用統計 |

---

### 6. 檔案結構

```
v0-ai-learning-platform/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # 根佈局
│   ├── globals.css               # 設計 Token
│   ├── page.tsx                  # 校園入口頁
│   ├── login/page.tsx            # 登入頁
│   └── app/                      # 登入後 App
│       ├── layout.tsx            # 側邊欄佈局
│       ├── page.tsx              # AI 對話
│       ├── memory/               # 記憶管理
│       ├── agent-builder/        # 智能體建立器
│       ├── marketplace/          # 智能體市集
│       ├── image-gen/            # 圖片生成
│       ├── image-edit/           # 圖片編輯
│       ├── teacher/              # 教師專區
│       └── admin/                # 管理員專區
├── components/ui/                # shadcn/ui 元件
├── lib/                          # 工具函數
├── scripts/                      # 資料庫腳本
├── .env.example                  # 環境變數範本
├── docker-compose.yml            # Docker 配置
├── Dockerfile                    # Docker 映像
├── DATABASE_SCHEMA.md            # 資料庫架構
├── API_SPECIFICATION.md          # API 規格
└── README.md                     # 專案說明
```

---

### 7. 頁面規格摘要

#### 7.1 公開頁面

**校園入口頁 (`/`)**
- Header: Logo + 登入按鈕
- Hero: 標題 + CTA
- Stats: 3 個數據卡
- Features: 4 個功能卡
- Role Cards: 3 個角色說明

**登入頁 (`/login`)**
- 角色選擇器 (學生/教師/管理員)
- 帳號密碼表單
- Demo 帳號提示

#### 7.2 學生頁面

| 頁面 | 路由 | 功能 |
|-----|------|------|
| AI 對話 | `/app` | 模型選擇、對話、建議問題 |
| 學習記憶 | `/app/memory` | 記憶開關、分類、刪除 |
| 智能體建立器 | `/app/agent-builder` | 模板、編輯器、測試 |
| 智能體市集 | `/app/marketplace` | 探索、收藏、分類 |
| 圖片生成 | `/app/image-gen` | 提示詞、風格、生成 |
| 圖片編輯 | `/app/image-edit` | 去背、擴圖、風格化 |

#### 7.3 教師頁面

| 頁面 | 路由 | 功能 |
|-----|------|------|
| 學生學習歷程 | `/app/teacher/students` | 統計、篩選、詳情 |
| 課程智能體 | `/app/teacher/agents` | 建立、授權班級 |

#### 7.4 管理員頁面

| 頁面 | 路由 | 功能 |
|-----|------|------|
| 帳號管理 | `/app/admin/users` | CRUD、批量匯入 |
| 使用統計 | `/app/admin/analytics` | 圖表、排行 |
| 系統設定 | `/app/admin/settings` | 功能開關、API |

---

### 8. 移植步驟檢查清單

#### Phase 1: 環境設定
- [ ] Ubuntu 系統準備完成
- [ ] Node.js 20 安裝完成
- [ ] PostgreSQL 安裝並建立資料庫
- [ ] Clone 專案並安裝依賴
- [ ] 設定環境變數 (.env.local)
- [ ] 執行資料庫初始化腳本

#### Phase 2: 設計系統整合
- [ ] 複製 `globals.css` 設計 Token
- [ ] 安裝字體 (Inter + Noto Sans TC)
- [ ] 確認 shadcn/ui 元件可用
- [ ] 如使用 Tailwind v3，轉換 Token 格式

#### Phase 3: 認證系統
- [ ] 實作 `/api/auth/login` API
- [ ] 實作 JWT/Session 管理
- [ ] 實作路由保護 middleware
- [ ] 測試三種角色登入

#### Phase 4: 核心功能
- [ ] 實作對話 API (含 streaming)
- [ ] 實作記憶 CRUD API
- [ ] 實作智能體 CRUD API
- [ ] 實作圖片生成 API

#### Phase 5: 角色功能
- [ ] 實作教師專區 API
- [ ] 實作管理員專區 API
- [ ] 測試角色權限控制

#### Phase 6: 測試與部署
- [ ] 響應式佈局測試
- [ ] 權限控制測試
- [ ] Docker 部署測試
- [ ] 生產環境部署

---

### 9. 重要注意事項

1. **角色權限控制**: 必須在 API 層級驗證角色權限，不只是前端隱藏
2. **密碼安全**: 使用 bcrypt 進行密碼雜湊，預設帳號需在生產環境更改
3. **API Key 安全**: OpenAI 等 API Key 存放於環境變數，不要提交到 Git
4. **Tailwind v4 vs v3**: 參考專案使用 v4，如果您的專案用 v3 需要轉換格式
5. **繁體中文**: 所有 UI 文字都是繁體中文

---

### 10. 路由權限對照表

| 路由 | 說明 | 學生 | 教師 | 管理員 |
|-----|------|:----:|:----:|:------:|
| `/` | 入口頁 | ✓ | ✓ | ✓ |
| `/login` | 登入 | ✓ | ✓ | ✓ |
| `/app` | AI 對話 | ✓ | ✓ | ✓ |
| `/app/memory` | 記憶 | ✓ | ✓ | ✓ |
| `/app/agent-builder` | 智能體建立 | ✓ | ✓ | ✓ |
| `/app/marketplace` | 市集 | ✓ | ✓ | ✓ |
| `/app/image-gen` | 圖片生成 | ✓ | ✓ | ✓ |
| `/app/image-edit` | 圖片編輯 | ✓ | ✓ | ✓ |
| `/app/teacher/*` | 教師專區 | ✗ | ✓ | ✓ |
| `/app/admin/*` | 管理員專區 | ✗ | ✗ | ✓ |

---

## PROMPT END
