#!/bin/bash
# =============================================
# LearnAI Ubuntu 開發環境安裝腳本
# 版本: 1.0.0
# =============================================

set -e

echo "============================================="
echo "LearnAI Ubuntu 開發環境安裝"
echo "============================================="

# 顏色定義
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 檢查是否為 root
if [ "$EUID" -eq 0 ]; then 
  echo -e "${RED}請不要使用 root 執行此腳本${NC}"
  exit 1
fi

# 1. 更新系統
echo -e "\n${YELLOW}[1/8] 更新系統套件...${NC}"
sudo apt update && sudo apt upgrade -y

# 2. 安裝基本工具
echo -e "\n${YELLOW}[2/8] 安裝基本工具...${NC}"
sudo apt install -y curl git build-essential

# 3. 安裝 Node.js 20
echo -e "\n${YELLOW}[3/8] 安裝 Node.js 20...${NC}"
if ! command -v node &> /dev/null || [[ $(node -v | cut -d'.' -f1 | tr -d 'v') -lt 20 ]]; then
  curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
  sudo apt-get install -y nodejs
fi
echo "Node.js 版本: $(node -v)"

# 4. 安裝 pnpm
echo -e "\n${YELLOW}[4/8] 安裝 pnpm...${NC}"
if ! command -v pnpm &> /dev/null; then
  npm install -g pnpm
fi
echo "pnpm 版本: $(pnpm -v)"

# 5. 安裝 PostgreSQL
echo -e "\n${YELLOW}[5/8] 安裝 PostgreSQL...${NC}"
if ! command -v psql &> /dev/null; then
  sudo apt-get install -y postgresql postgresql-contrib
  sudo systemctl start postgresql
  sudo systemctl enable postgresql
fi
echo "PostgreSQL 版本: $(psql --version)"

# 6. 設定資料庫
echo -e "\n${YELLOW}[6/8] 設定資料庫...${NC}"
read -p "輸入資料庫密碼 (預設: learnai123): " DB_PASSWORD
DB_PASSWORD=${DB_PASSWORD:-learnai123}

sudo -u postgres psql -tc "SELECT 1 FROM pg_user WHERE usename = 'learnai'" | grep -q 1 || \
sudo -u postgres psql << EOF
CREATE USER learnai WITH PASSWORD '$DB_PASSWORD';
CREATE DATABASE learnai_db OWNER learnai;
GRANT ALL PRIVILEGES ON DATABASE learnai_db TO learnai;
\c learnai_db
GRANT ALL ON SCHEMA public TO learnai;
EOF

echo -e "${GREEN}資料庫設定完成${NC}"

# 7. 安裝專案依賴
echo -e "\n${YELLOW}[7/8] 安裝專案依賴...${NC}"
pnpm install

# 8. 設定環境變數
echo -e "\n${YELLOW}[8/8] 設定環境變數...${NC}"
if [ ! -f .env.local ]; then
  cp .env.example .env.local
  
  # 替換資料庫密碼
  sed -i "s/your_password/$DB_PASSWORD/g" .env.local
  
  # 生成 NEXTAUTH_SECRET
  NEXTAUTH_SECRET=$(openssl rand -base64 32)
  sed -i "s/your-secret-key-here-please-change-in-production/$NEXTAUTH_SECRET/g" .env.local
  
  echo -e "${GREEN}.env.local 已建立${NC}"
  echo -e "${YELLOW}請編輯 .env.local 填入 OPENAI_API_KEY${NC}"
else
  echo -e "${YELLOW}.env.local 已存在，跳過${NC}"
fi

# 初始化資料庫
echo -e "\n${YELLOW}初始化資料庫...${NC}"
PGPASSWORD=$DB_PASSWORD psql -U learnai -d learnai_db -h localhost -f scripts/001_init_database.sql

echo -e "\n${GREEN}=============================================${NC}"
echo -e "${GREEN}安裝完成！${NC}"
echo -e "${GREEN}=============================================${NC}"
echo ""
echo "下一步:"
echo "1. 編輯 .env.local 填入你的 OPENAI_API_KEY"
echo "2. 執行 pnpm dev 啟動開發伺服器"
echo "3. 打開 http://localhost:3000"
echo ""
echo "預設帳號:"
echo "  管理員: admin / admin123"
echo "  教師: T001 / teacher123"
echo "  學生: S001 / student123"
echo ""
echo -e "${YELLOW}請務必在生產環境更改預設密碼！${NC}"
