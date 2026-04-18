# LearnAI - 校園 AI 智慧學習平台

<p align="center">
  <img src="public/logo.svg" alt="LearnAI Logo" width="120" />
</p>

<p align="center">
  專為學校設計的 AI 學習平台，支援對話學習、智能體建立、AI 圖像生成
</p>

---

## 功能特色

### 學生功能
- **AI 對話學習**：與 AI 模型即時對話，支援記憶功能追蹤學習歷程
- **知識庫管理**：管理對話記憶，可分群、開關、刪除
- **Agent 建立器**：建立專業智能體（法律、醫學、程式、寫作等領域）
- **Agent 市集**：探索和收藏其他人分享的智能體
- **AI 圖片生成**：文字生成圖片，多種風格選擇
- **圖片編輯工具**：重繪、局部修改、風格化、擴圖、去背

### 教師功能
- **學生學習歷程**：查看班級學生的 AI 使用數據
- **課程智能體管理**：建立課程專屬智能體，設定班級存取權限

### 管理員功能
- **帳號管理**：新增/編輯/停用帳號，支援批量匯入
- **使用統計**：平台整體數據分析，熱門智能體排行
- **系統設定**：功能開關、安全性設定、API 配置

---

## 技術棧

| 類別 | 技術 |
|------|------|
| 框架 | Next.js 16 (App Router) |
| 語言 | TypeScript |
| 樣式 | Tailwind CSS v4 |
| UI 元件 | shadcn/ui |
| 字體 | Inter + Noto Sans TC |
| 圖示 | Lucide React |

---

## 快速開始

### 系統需求

- Node.js 20+ 
- pnpm 9+ (推薦) 或 npm
- PostgreSQL 15+ (生產環境)
- Ubuntu 22.04+ (建議)

### Ubuntu 安裝指南

```bash
# 1. 安裝 Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# 2. 安裝 pnpm
npm install -g pnpm

# 3. 安裝 PostgreSQL
sudo apt-get install -y postgresql postgresql-contrib

# 4. Clone 專案
git clone https://github.com/kaiyin1028/v0-ai-learning-platform.git
cd v0-ai-learning-platform

# 5. 安裝相依套件
pnpm install

# 6. 設定環境變數
cp .env.example .env.local
# 編輯 .env.local 填入你的設定

# 7. 初始化資料庫
pnpm db:migrate

# 8. 啟動開發伺服器
pnpm dev
```

### Docker 部署 (可選)

```bash
# 使用 Docker Compose 一鍵部署
docker-compose up -d
```

---

## 專案結構

```
v0-ai-learning-platform/
├── app/                          # Next.js App Router
│   ├── page.tsx                  # 校園入口頁
│   ├── login/page.tsx            # 登入頁
│   ├── layout.tsx                # 根佈局
│   ├── globals.css               # 全域樣式 + Design Tokens
│   └── app/                      # 登入後 App 區域
│       ├── layout.tsx            # App 側邊欄佈局
│       ├── page.tsx              # AI 對話頁
│       ├── memory/               # 記憶管理
│       ├── agent-builder/        # Agent 建立器
│       ├── marketplace/          # Agent 市集
│       ├── image-gen/            # 圖片生成
│       ├── image-edit/           # 圖片編輯
│       ├── teacher/              # 教師專區
│       │   ├── students/         # 學生學習歷程
│       │   └── agents/           # 課程智能體管理
│       └── admin/                # 管理員專區
│           ├── users/            # 帳號管理
│           ├── analytics/        # 使用統計
│           └── settings/         # 系統設定
├── components/                   # 共用元件
│   ├── ui/                       # shadcn/ui 元件
│   └── landing/                  # Landing 元件 (備用)
├── lib/                          # 工具函數
├── hooks/                        # React Hooks
├── types/                        # TypeScript 類型定義
├── scripts/                      # 資料庫腳本
├── public/                       # 靜態資源
├── .env.example                  # 環境變數範本
├── MIGRATION_PROMPT.md           # AI 移植指南
└── DATABASE_SCHEMA.md            # 資料庫架構文件
```

---

## 環境變數

請參考 `.env.example` 檔案設定以下變數：

| 變數名稱 | 說明 | 必填 |
|---------|------|------|
| `DATABASE_URL` | PostgreSQL 連線字串 | ✅ |
| `NEXTAUTH_SECRET` | 認證密鑰 | ✅ |
| `NEXTAUTH_URL` | 應用程式 URL | ✅ |
| `OPENAI_API_KEY` | OpenAI API 金鑰 | ✅ |
| `OPENAI_BASE_URL` | OpenAI API 基礎 URL | ❌ |

---

## 開發指令

```bash
# 啟動開發伺服器
pnpm dev

# 建置生產版本
pnpm build

# 啟動生產伺服器
pnpm start

# 程式碼檢查
pnpm lint

# 類型檢查
pnpm type-check

# 資料庫遷移
pnpm db:migrate

# 資料庫種子
pnpm db:seed
```

---

## API 端點規劃

詳見 `API_SPECIFICATION.md`

---

## 授權條款

MIT License

---

## 聯絡方式

如有問題請開 Issue 或聯繫開發團隊。
