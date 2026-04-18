# LearnAI API 規格文件

## 概述

本文件定義 LearnAI 平台的 RESTful API 規格，供前後端開發對接使用。

---

## 基礎資訊

- **Base URL**: `/api`
- **認證方式**: JWT Bearer Token
- **內容類型**: `application/json`
- **錯誤格式**:
```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "人類可讀的錯誤訊息"
  }
}
```

---

## 認證 API

### POST /api/auth/login
用戶登入

**Request:**
```json
{
  "schoolId": "S12345",
  "password": "password123",
  "role": "student"
}
```

**Response:**
```json
{
  "user": {
    "id": "uuid",
    "schoolId": "S12345",
    "name": "王小明",
    "role": "student",
    "class": "高一甲班",
    "avatarUrl": "/avatars/default.png"
  },
  "token": "jwt_token_here",
  "expiresAt": "2026-04-09T00:00:00Z"
}
```

### POST /api/auth/logout
用戶登出

### GET /api/auth/me
取得當前用戶資訊

---

## 對話 API

### GET /api/conversations
取得對話列表

**Query Parameters:**
- `page` (number): 頁碼，預設 1
- `limit` (number): 每頁數量，預設 20
- `agentId` (uuid): 篩選特定 Agent

**Response:**
```json
{
  "data": [
    {
      "id": "uuid",
      "title": "數學問題討論",
      "agentId": "uuid",
      "agentName": "數學助教",
      "messageCount": 15,
      "lastMessageAt": "2026-04-08T10:30:00Z",
      "createdAt": "2026-04-08T09:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 45,
    "totalPages": 3
  }
}
```

### POST /api/conversations
建立新對話

**Request:**
```json
{
  "agentId": "uuid",
  "title": "新對話",
  "isMemoryEnabled": true
}
```

### GET /api/conversations/:id
取得對話詳情（含訊息）

### DELETE /api/conversations/:id
刪除對話

---

## 訊息 API

### POST /api/conversations/:id/messages
發送訊息（串流回應）

**Request:**
```json
{
  "content": "請解釋什麼是微積分？",
  "model": "gpt-4o-mini"
}
```

**Response (SSE Stream):**
```
data: {"type": "start", "messageId": "uuid"}
data: {"type": "delta", "content": "微積分"}
data: {"type": "delta", "content": "是一門"}
data: {"type": "delta", "content": "研究變化的數學..."}
data: {"type": "done", "tokensUsed": 150}
```

---

## 記憶 API

### GET /api/memories
取得記憶列表

**Query Parameters:**
- `category` (string): 分類篩選
- `enabled` (boolean): 啟用狀態

### POST /api/memories
手動新增記憶

### PATCH /api/memories/:id
更新記憶（開關/分類）

**Request:**
```json
{
  "isEnabled": false,
  "category": "程式設計"
}
```

### DELETE /api/memories/:id
刪除記憶

### DELETE /api/memories
批量刪除記憶

**Request:**
```json
{
  "ids": ["uuid1", "uuid2"]
}
```

---

## Agent API

### GET /api/agents
取得 Agent 列表

**Query Parameters:**
- `category` (string): 分類
- `isPublic` (boolean): 是否公開
- `isMine` (boolean): 只看自己的
- `search` (string): 搜尋名稱/描述

### POST /api/agents
建立 Agent

**Request:**
```json
{
  "name": "英文寫作助教",
  "description": "幫助學生提升英文寫作能力",
  "systemPrompt": "你是一位專業的英文寫作老師...",
  "category": "語言學習",
  "model": "gpt-4o-mini",
  "isPublic": false
}
```

### GET /api/agents/:id
取得 Agent 詳情

### PATCH /api/agents/:id
更新 Agent

### DELETE /api/agents/:id
刪除 Agent

### POST /api/agents/:id/publish
發布 Agent 到市集

### POST /api/agents/:id/duplicate
複製 Agent

---

## 收藏 API

### GET /api/favorites
取得收藏列表

### POST /api/favorites
新增收藏

**Request:**
```json
{
  "agentId": "uuid"
}
```

### DELETE /api/favorites/:agentId
移除收藏

---

## 圖片生成 API

### POST /api/images/generate
生成圖片

**Request:**
```json
{
  "prompt": "一隻可愛的柴犬在櫻花樹下",
  "negativePrompt": "模糊, 低品質",
  "style": "anime",
  "width": 1024,
  "height": 1024,
  "model": "stable-diffusion-xl"
}
```

**Response:**
```json
{
  "id": "uuid",
  "imageUrl": "https://...",
  "thumbnailUrl": "https://...",
  "prompt": "...",
  "createdAt": "2026-04-08T10:00:00Z"
}
```

### GET /api/images
取得生成圖片歷史

### DELETE /api/images/:id
刪除圖片

---

## 圖片編輯 API

### POST /api/images/edit
編輯圖片

**Request (multipart/form-data):**
- `image`: 原始圖片檔案
- `operation`: 操作類型 (inpaint, outpaint, style, remove-bg, upscale)
- `prompt`: 提示詞（部分操作需要）
- `mask`: 遮罩圖片（inpaint 需要）
- `style`: 風格名稱（style 操作需要）

---

## 教師 API

### GET /api/teacher/students
取得學生列表

**Query Parameters:**
- `classId` (uuid): 班級 ID
- `search` (string): 搜尋學號/姓名

**Response:**
```json
{
  "data": [
    {
      "id": "uuid",
      "schoolId": "S12345",
      "name": "王小明",
      "class": "高一甲班",
      "stats": {
        "totalConversations": 45,
        "totalMessages": 320,
        "totalImages": 12,
        "lastActiveAt": "2026-04-08T15:30:00Z"
      }
    }
  ]
}
```

### GET /api/teacher/students/:id/activity
取得學生活動詳情

### GET /api/teacher/agents
取得教師建立的 Agent

### POST /api/teacher/agents/:id/access
設定 Agent 班級存取權限

**Request:**
```json
{
  "classIds": ["uuid1", "uuid2"]
}
```

---

## 管理員 API

### GET /api/admin/users
取得所有用戶

**Query Parameters:**
- `role` (string): 角色篩選
- `status` (string): 狀態篩選
- `search` (string): 搜尋

### POST /api/admin/users
新增用戶

### POST /api/admin/users/import
批量匯入用戶

**Request (multipart/form-data):**
- `file`: CSV 檔案

### PATCH /api/admin/users/:id
更新用戶

### DELETE /api/admin/users/:id
刪除用戶

### GET /api/admin/analytics
取得平台統計

**Response:**
```json
{
  "overview": {
    "totalUsers": 1250,
    "activeUsers": 890,
    "totalConversations": 15600,
    "totalMessages": 98000,
    "totalImages": 3200
  },
  "trends": {
    "dailyActiveUsers": [...],
    "dailyMessages": [...],
    "dailyImages": [...]
  },
  "topAgents": [...],
  "topClasses": [...]
}
```

### GET /api/admin/settings
取得系統設定

### PATCH /api/admin/settings
更新系統設定

**Request:**
```json
{
  "key": "features.marketplace",
  "value": true
}
```

---

## 通用 API

### GET /api/classes
取得班級列表

### GET /api/models
取得可用 AI 模型列表

### GET /api/styles
取得圖片風格列表

---

## WebSocket API

### ws://host/api/ws
即時通知連線

**Events:**
- `conversation.new_message`: 新訊息通知
- `agent.published`: Agent 發布通知
- `system.announcement`: 系統公告

---

## Rate Limiting

| 端點 | 限制 |
|------|------|
| 對話訊息 | 學生 100 次/日 |
| 圖片生成 | 學生 50 次/月 |
| 一般 API | 1000 次/小時 |

---

## 錯誤碼

| 代碼 | 說明 |
|------|------|
| `AUTH_REQUIRED` | 需要登入 |
| `AUTH_INVALID` | 認證無效 |
| `PERMISSION_DENIED` | 權限不足 |
| `NOT_FOUND` | 資源不存在 |
| `RATE_LIMITED` | 超過使用限制 |
| `VALIDATION_ERROR` | 參數驗證失敗 |
| `INTERNAL_ERROR` | 內部錯誤 |
