# LearnAI 資料庫架構設計

## 概述

本文件定義 LearnAI 平台的資料庫架構，採用 PostgreSQL 作為主要資料庫。

---

## ER 關係圖 (概念)

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   users     │────<│ conversations│────<│  messages   │
└─────────────┘     └─────────────┘     └─────────────┘
       │                   │
       │            ┌──────┴──────┐
       │            │             │
       ▼            ▼             ▼
┌─────────────┐ ┌─────────────┐ ┌─────────────┐
│  memories   │ │   agents    │ │   images    │
└─────────────┘ └─────────────┘ └─────────────┘
       │               │
       │               ▼
       │        ┌─────────────┐
       │        │agent_access │
       │        └─────────────┘
       │               │
       └───────────────┼───────────────┐
                       ▼               ▼
                ┌─────────────┐ ┌─────────────┐
                │   classes   │ │ favorites   │
                └─────────────┘ └─────────────┘
```

---

## 資料表定義

### 1. users (使用者)

| 欄位 | 類型 | 說明 | 約束 |
|------|------|------|------|
| id | UUID | 主鍵 | PK, DEFAULT uuid_generate_v4() |
| school_id | VARCHAR(50) | 學號/員工編號 | UNIQUE, NOT NULL |
| name | VARCHAR(100) | 姓名 | NOT NULL |
| email | VARCHAR(255) | 電子郵件 | UNIQUE |
| password_hash | VARCHAR(255) | 密碼雜湊 | NOT NULL |
| role | ENUM | 角色 | 'student', 'teacher', 'admin' |
| class_id | UUID | 所屬班級 | FK -> classes.id |
| avatar_url | VARCHAR(500) | 頭像網址 | |
| status | ENUM | 帳號狀態 | 'active', 'inactive', 'suspended' |
| last_login_at | TIMESTAMP | 最後登入時間 | |
| created_at | TIMESTAMP | 建立時間 | DEFAULT NOW() |
| updated_at | TIMESTAMP | 更新時間 | DEFAULT NOW() |

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  school_id VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(20) NOT NULL CHECK (role IN ('student', 'teacher', 'admin')),
  class_id UUID REFERENCES classes(id),
  avatar_url VARCHAR(500),
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
  last_login_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_users_school_id ON users(school_id);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_class_id ON users(class_id);
```

---

### 2. classes (班級)

| 欄位 | 類型 | 說明 | 約束 |
|------|------|------|------|
| id | UUID | 主鍵 | PK |
| name | VARCHAR(50) | 班級名稱 | NOT NULL |
| grade | VARCHAR(20) | 年級 | |
| academic_year | VARCHAR(10) | 學年度 | |
| teacher_id | UUID | 導師 | FK -> users.id |
| created_at | TIMESTAMP | 建立時間 | |

```sql
CREATE TABLE classes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(50) NOT NULL,
  grade VARCHAR(20),
  academic_year VARCHAR(10),
  teacher_id UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

### 3. conversations (對話)

| 欄位 | 類型 | 說明 | 約束 |
|------|------|------|------|
| id | UUID | 主鍵 | PK |
| user_id | UUID | 使用者 | FK -> users.id, NOT NULL |
| agent_id | UUID | 使用的 Agent | FK -> agents.id |
| title | VARCHAR(200) | 對話標題 | |
| model | VARCHAR(50) | AI 模型 | |
| is_memory_enabled | BOOLEAN | 是否啟用記憶 | DEFAULT true |
| message_count | INTEGER | 訊息數量 | DEFAULT 0 |
| created_at | TIMESTAMP | 建立時間 | |
| updated_at | TIMESTAMP | 最後更新 | |

```sql
CREATE TABLE conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  agent_id UUID REFERENCES agents(id),
  title VARCHAR(200),
  model VARCHAR(50) DEFAULT 'gpt-4o-mini',
  is_memory_enabled BOOLEAN DEFAULT true,
  message_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_conversations_user_id ON conversations(user_id);
CREATE INDEX idx_conversations_created_at ON conversations(created_at DESC);
```

---

### 4. messages (訊息)

| 欄位 | 類型 | 說明 | 約束 |
|------|------|------|------|
| id | UUID | 主鍵 | PK |
| conversation_id | UUID | 對話 | FK -> conversations.id |
| role | ENUM | 角色 | 'user', 'assistant', 'system' |
| content | TEXT | 內容 | NOT NULL |
| tokens_used | INTEGER | Token 數量 | |
| created_at | TIMESTAMP | 建立時間 | |

```sql
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  role VARCHAR(20) NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content TEXT NOT NULL,
  tokens_used INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_messages_conversation_id ON messages(conversation_id);
CREATE INDEX idx_messages_created_at ON messages(created_at);
```

---

### 5. memories (記憶/知識庫)

| 欄位 | 類型 | 說明 | 約束 |
|------|------|------|------|
| id | UUID | 主鍵 | PK |
| user_id | UUID | 使用者 | FK -> users.id |
| category | VARCHAR(50) | 分類 | |
| title | VARCHAR(200) | 標題 | |
| content | TEXT | 內容摘要 | |
| source_conversation_id | UUID | 來源對話 | FK |
| is_enabled | BOOLEAN | 是否啟用 | DEFAULT true |
| created_at | TIMESTAMP | 建立時間 | |

```sql
CREATE TABLE memories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  category VARCHAR(50),
  title VARCHAR(200),
  content TEXT,
  source_conversation_id UUID REFERENCES conversations(id),
  is_enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_memories_user_id ON memories(user_id);
CREATE INDEX idx_memories_category ON memories(category);
```

---

### 6. agents (智能體)

| 欄位 | 類型 | 說明 | 約束 |
|------|------|------|------|
| id | UUID | 主鍵 | PK |
| creator_id | UUID | 建立者 | FK -> users.id |
| name | VARCHAR(100) | 名稱 | NOT NULL |
| description | TEXT | 描述 | |
| avatar_url | VARCHAR(500) | 頭像 | |
| system_prompt | TEXT | 系統提示詞 | |
| model | VARCHAR(50) | 使用模型 | |
| category | VARCHAR(50) | 分類 | |
| is_public | BOOLEAN | 是否公開 | DEFAULT false |
| is_official | BOOLEAN | 是否官方 | DEFAULT false |
| usage_count | INTEGER | 使用次數 | DEFAULT 0 |
| status | ENUM | 狀態 | 'draft', 'published', 'archived' |
| created_at | TIMESTAMP | 建立時間 | |
| updated_at | TIMESTAMP | 更新時間 | |

```sql
CREATE TABLE agents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  creator_id UUID NOT NULL REFERENCES users(id),
  name VARCHAR(100) NOT NULL,
  description TEXT,
  avatar_url VARCHAR(500),
  system_prompt TEXT,
  model VARCHAR(50) DEFAULT 'gpt-4o-mini',
  category VARCHAR(50),
  is_public BOOLEAN DEFAULT false,
  is_official BOOLEAN DEFAULT false,
  usage_count INTEGER DEFAULT 0,
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_agents_creator_id ON agents(creator_id);
CREATE INDEX idx_agents_category ON agents(category);
CREATE INDEX idx_agents_is_public ON agents(is_public);
```

---

### 7. agent_access (Agent 存取權限)

| 欄位 | 類型 | 說明 | 約束 |
|------|------|------|------|
| id | UUID | 主鍵 | PK |
| agent_id | UUID | Agent | FK -> agents.id |
| class_id | UUID | 班級 | FK -> classes.id |
| granted_by | UUID | 授權者 | FK -> users.id |
| created_at | TIMESTAMP | 建立時間 | |

```sql
CREATE TABLE agent_access (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  agent_id UUID NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
  class_id UUID NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  granted_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(agent_id, class_id)
);
```

---

### 8. favorites (收藏)

| 欄位 | 類型 | 說明 | 約束 |
|------|------|------|------|
| id | UUID | 主鍵 | PK |
| user_id | UUID | 使用者 | FK -> users.id |
| agent_id | UUID | Agent | FK -> agents.id |
| created_at | TIMESTAMP | 建立時間 | |

```sql
CREATE TABLE favorites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  agent_id UUID NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, agent_id)
);
```

---

### 9. generated_images (生成圖片)

| 欄位 | 類型 | 說明 | 約束 |
|------|------|------|------|
| id | UUID | 主鍵 | PK |
| user_id | UUID | 使用者 | FK -> users.id |
| prompt | TEXT | 提示詞 | NOT NULL |
| negative_prompt | TEXT | 負面提示詞 | |
| style | VARCHAR(50) | 風格 | |
| image_url | VARCHAR(500) | 圖片網址 | |
| thumbnail_url | VARCHAR(500) | 縮圖網址 | |
| width | INTEGER | 寬度 | |
| height | INTEGER | 高度 | |
| model | VARCHAR(50) | 使用模型 | |
| created_at | TIMESTAMP | 建立時間 | |

```sql
CREATE TABLE generated_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  prompt TEXT NOT NULL,
  negative_prompt TEXT,
  style VARCHAR(50),
  image_url VARCHAR(500),
  thumbnail_url VARCHAR(500),
  width INTEGER,
  height INTEGER,
  model VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_generated_images_user_id ON generated_images(user_id);
CREATE INDEX idx_generated_images_created_at ON generated_images(created_at DESC);
```

---

### 10. usage_logs (使用記錄)

| 欄位 | 類型 | 說明 | 約束 |
|------|------|------|------|
| id | UUID | 主鍵 | PK |
| user_id | UUID | 使用者 | FK -> users.id |
| action | VARCHAR(50) | 動作類型 | |
| resource_type | VARCHAR(50) | 資源類型 | |
| resource_id | UUID | 資源 ID | |
| tokens_used | INTEGER | Token 數 | |
| metadata | JSONB | 額外資料 | |
| created_at | TIMESTAMP | 建立時間 | |

```sql
CREATE TABLE usage_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id),
  action VARCHAR(50) NOT NULL,
  resource_type VARCHAR(50),
  resource_id UUID,
  tokens_used INTEGER DEFAULT 0,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_usage_logs_user_id ON usage_logs(user_id);
CREATE INDEX idx_usage_logs_action ON usage_logs(action);
CREATE INDEX idx_usage_logs_created_at ON usage_logs(created_at DESC);
```

---

### 11. system_settings (系統設定)

| 欄位 | 類型 | 說明 | 約束 |
|------|------|------|------|
| key | VARCHAR(100) | 設定鍵 | PK |
| value | JSONB | 設定值 | |
| description | TEXT | 說明 | |
| updated_by | UUID | 更新者 | FK -> users.id |
| updated_at | TIMESTAMP | 更新時間 | |

```sql
CREATE TABLE system_settings (
  key VARCHAR(100) PRIMARY KEY,
  value JSONB NOT NULL,
  description TEXT,
  updated_by UUID REFERENCES users(id),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

---

## 初始資料

```sql
-- 插入系統設定預設值
INSERT INTO system_settings (key, value, description) VALUES
('features.marketplace', 'true', '是否啟用 Agent 市集'),
('features.image_generation', 'true', '是否啟用圖片生成'),
('features.image_editing', 'true', '是否啟用圖片編輯'),
('limits.student_daily_chat', '100', '學生每日對話上限'),
('limits.student_monthly_images', '50', '學生每月圖片生成上限'),
('security.password_min_length', '8', '密碼最小長度'),
('security.session_timeout_hours', '24', 'Session 過期時間');

-- 插入預設管理員帳號 (密碼: admin123)
INSERT INTO users (school_id, name, email, password_hash, role, status) VALUES
('admin', '系統管理員', 'admin@school.edu', '$2b$10$...hashed...', 'admin', 'active');
```

---

## 索引策略

1. **主鍵索引**：所有 `id` 欄位自動建立
2. **外鍵索引**：所有 `_id` 結尾的外鍵欄位
3. **時間索引**：`created_at` 用於排序和篩選
4. **狀態索引**：`status`、`is_public` 等狀態欄位
5. **複合索引**：根據查詢模式建立

---

## 備份策略

```bash
# 每日備份
pg_dump -U learnai learnai_db > backup_$(date +%Y%m%d).sql

# 還原
psql -U learnai learnai_db < backup_20260408.sql
```
