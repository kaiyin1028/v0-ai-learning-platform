-- =============================================
-- LearnAI 資料庫初始化腳本
-- 版本: 1.0.0
-- 日期: 2026-04-08
-- =============================================

-- 啟用 UUID 擴展
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- 1. 班級表
-- =============================================
CREATE TABLE IF NOT EXISTS classes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(50) NOT NULL,
  grade VARCHAR(20),
  academic_year VARCHAR(10),
  teacher_id UUID,
  created_at TIMESTAMP DEFAULT NOW()
);

-- =============================================
-- 2. 使用者表
-- =============================================
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  school_id VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(20) NOT NULL CHECK (role IN ('student', 'teacher', 'admin')),
  class_id UUID REFERENCES classes(id) ON DELETE SET NULL,
  avatar_url VARCHAR(500),
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
  last_login_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_users_school_id ON users(school_id);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_users_class_id ON users(class_id);
CREATE INDEX IF NOT EXISTS idx_users_status ON users(status);

-- 更新 classes 的 teacher_id 外鍵
ALTER TABLE classes 
ADD CONSTRAINT fk_classes_teacher 
FOREIGN KEY (teacher_id) REFERENCES users(id) ON DELETE SET NULL;

-- =============================================
-- 3. 智能體表
-- =============================================
CREATE TABLE IF NOT EXISTS agents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  creator_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
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

CREATE INDEX IF NOT EXISTS idx_agents_creator_id ON agents(creator_id);
CREATE INDEX IF NOT EXISTS idx_agents_category ON agents(category);
CREATE INDEX IF NOT EXISTS idx_agents_is_public ON agents(is_public);
CREATE INDEX IF NOT EXISTS idx_agents_status ON agents(status);

-- =============================================
-- 4. Agent 存取權限表
-- =============================================
CREATE TABLE IF NOT EXISTS agent_access (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  agent_id UUID NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
  class_id UUID NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  granted_by UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(agent_id, class_id)
);

-- =============================================
-- 5. 對話表
-- =============================================
CREATE TABLE IF NOT EXISTS conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  agent_id UUID REFERENCES agents(id) ON DELETE SET NULL,
  title VARCHAR(200),
  model VARCHAR(50) DEFAULT 'gpt-4o-mini',
  is_memory_enabled BOOLEAN DEFAULT true,
  message_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_conversations_user_id ON conversations(user_id);
CREATE INDEX IF NOT EXISTS idx_conversations_agent_id ON conversations(agent_id);
CREATE INDEX IF NOT EXISTS idx_conversations_created_at ON conversations(created_at DESC);

-- =============================================
-- 6. 訊息表
-- =============================================
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  role VARCHAR(20) NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content TEXT NOT NULL,
  tokens_used INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_messages_conversation_id ON messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at);

-- =============================================
-- 7. 記憶表
-- =============================================
CREATE TABLE IF NOT EXISTS memories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  category VARCHAR(50),
  title VARCHAR(200),
  content TEXT,
  source_conversation_id UUID REFERENCES conversations(id) ON DELETE SET NULL,
  is_enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_memories_user_id ON memories(user_id);
CREATE INDEX IF NOT EXISTS idx_memories_category ON memories(category);
CREATE INDEX IF NOT EXISTS idx_memories_is_enabled ON memories(is_enabled);

-- =============================================
-- 8. 收藏表
-- =============================================
CREATE TABLE IF NOT EXISTS favorites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  agent_id UUID NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, agent_id)
);

CREATE INDEX IF NOT EXISTS idx_favorites_user_id ON favorites(user_id);

-- =============================================
-- 9. 生成圖片表
-- =============================================
CREATE TABLE IF NOT EXISTS generated_images (
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

CREATE INDEX IF NOT EXISTS idx_generated_images_user_id ON generated_images(user_id);
CREATE INDEX IF NOT EXISTS idx_generated_images_created_at ON generated_images(created_at DESC);

-- =============================================
-- 10. 使用記錄表
-- =============================================
CREATE TABLE IF NOT EXISTS usage_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  action VARCHAR(50) NOT NULL,
  resource_type VARCHAR(50),
  resource_id UUID,
  tokens_used INTEGER DEFAULT 0,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_usage_logs_user_id ON usage_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_usage_logs_action ON usage_logs(action);
CREATE INDEX IF NOT EXISTS idx_usage_logs_created_at ON usage_logs(created_at DESC);

-- =============================================
-- 11. 系統設定表
-- =============================================
CREATE TABLE IF NOT EXISTS system_settings (
  key VARCHAR(100) PRIMARY KEY,
  value JSONB NOT NULL,
  description TEXT,
  updated_by UUID REFERENCES users(id) ON DELETE SET NULL,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- =============================================
-- 插入預設資料
-- =============================================

-- 預設系統設定
INSERT INTO system_settings (key, value, description) VALUES
('features.marketplace', 'true', '是否啟用 Agent 市集'),
('features.image_generation', 'true', '是否啟用圖片生成'),
('features.image_editing', 'true', '是否啟用圖片編輯'),
('features.memory', 'true', '是否啟用對話記憶'),
('limits.student_daily_chat', '100', '學生每日對話上限'),
('limits.student_monthly_images', '50', '學生每月圖片生成上限'),
('limits.teacher_daily_chat', '500', '教師每日對話上限'),
('security.password_min_length', '8', '密碼最小長度'),
('security.session_timeout_hours', '24', 'Session 過期時間（小時）'),
('ai.default_model', '"gpt-4o-mini"', '預設 AI 模型')
ON CONFLICT (key) DO NOTHING;

-- 預設班級
INSERT INTO classes (id, name, grade, academic_year) VALUES
('00000000-0000-0000-0000-000000000001', '高一甲班', '高一', '114'),
('00000000-0000-0000-0000-000000000002', '高一乙班', '高一', '114'),
('00000000-0000-0000-0000-000000000003', '高二甲班', '高二', '114'),
('00000000-0000-0000-0000-000000000004', '高二乙班', '高二', '114'),
('00000000-0000-0000-0000-000000000005', '高三甲班', '高三', '114')
ON CONFLICT DO NOTHING;

-- 預設管理員帳號 (密碼: admin123)
-- 注意：實際部署時請更改密碼！
-- 此 hash 是 bcrypt('admin123')
INSERT INTO users (id, school_id, name, email, password_hash, role, status) VALUES
('00000000-0000-0000-0000-000000000001', 'admin', '系統管理員', 'admin@school.edu.tw', 
 '$2b$10$rQZ5z5z5z5z5z5z5z5z5zOKXKXKXKXKXKXKXKXKXKXKXKXKXKXKXK', 'admin', 'active')
ON CONFLICT (school_id) DO NOTHING;

-- 預設教師帳號 (密碼: teacher123)
INSERT INTO users (id, school_id, name, email, password_hash, role, status) VALUES
('00000000-0000-0000-0000-000000000002', 'T001', '王老師', 'teacher@school.edu.tw',
 '$2b$10$rQZ5z5z5z5z5z5z5z5z5zOKXKXKXKXKXKXKXKXKXKXKXKXKXKXKXK', 'teacher', 'active')
ON CONFLICT (school_id) DO NOTHING;

-- 預設學生帳號 (密碼: student123)
INSERT INTO users (id, school_id, name, email, password_hash, role, class_id, status) VALUES
('00000000-0000-0000-0000-000000000003', 'S001', '陳小明', 'student@school.edu.tw',
 '$2b$10$rQZ5z5z5z5z5z5z5z5z5zOKXKXKXKXKXKXKXKXKXKXKXKXKXKXKXK', 'student', 
 '00000000-0000-0000-0000-000000000001', 'active')
ON CONFLICT (school_id) DO NOTHING;

-- 預設官方 Agent
INSERT INTO agents (id, creator_id, name, description, system_prompt, category, is_public, is_official, status) VALUES
('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001',
 '通用助教', '萬能的學習助教，可以回答各種問題',
 '你是一位友善的學習助教，專門幫助學生解答各種學習問題。請用簡單易懂的語言回答，必要時提供例子說明。',
 '通用', true, true, 'published'),
('00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000001',
 '數學小老師', '專精數學領域的智能助教',
 '你是一位專業的數學老師，擅長用清晰的步驟解釋數學概念和解題過程。請循序漸進地引導學生理解，而不是直接給答案。',
 '數學', true, true, 'published'),
('00000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000001',
 '英文寫作教練', '幫助提升英文寫作能力',
 '你是一位英文寫作教練，幫助學生改善英文寫作。提供具體的修改建議，解釋文法規則，並鼓勵學生多練習。',
 '語言', true, true, 'published'),
('00000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000001',
 '程式導師', '程式設計學習好幫手',
 '你是一位耐心的程式設計導師，幫助學生學習程式設計概念和解決程式問題。用簡單的比喻解釋複雜概念，提供程式碼範例時要加上詳細註解。',
 '程式', true, true, 'published')
ON CONFLICT DO NOTHING;

-- =============================================
-- 完成訊息
-- =============================================
DO $$
BEGIN
  RAISE NOTICE '=============================================';
  RAISE NOTICE 'LearnAI 資料庫初始化完成！';
  RAISE NOTICE '=============================================';
  RAISE NOTICE '預設帳號：';
  RAISE NOTICE '  管理員: admin / admin123';
  RAISE NOTICE '  教師: T001 / teacher123';
  RAISE NOTICE '  學生: S001 / student123';
  RAISE NOTICE '=============================================';
  RAISE NOTICE '請務必在生產環境更改預設密碼！';
  RAISE NOTICE '=============================================';
END $$;
