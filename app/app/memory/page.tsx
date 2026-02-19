"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Brain,
  Search,
  Trash2,
  Eye,
  Filter,
  Clock,
  Tag,
  ToggleLeft,
  AlertCircle,
  BookOpen,
} from "lucide-react"

interface MemoryItem {
  id: string
  content: string
  category: string
  source: string
  createdAt: string
  enabled: boolean
}

const sampleMemories: MemoryItem[] = [
  {
    id: "1",
    content: "學生偏好用比喻和日常生活例子來理解抽象概念",
    category: "學習風格",
    source: "對話推斷",
    createdAt: "2026-02-18",
    enabled: true,
  },
  {
    id: "2",
    content: "目前正在學習 Python 程式設計，程度為中級",
    category: "學習進度",
    source: "對話推斷",
    createdAt: "2026-02-17",
    enabled: true,
  },
  {
    id: "3",
    content: "對量子力學和物理學有濃厚興趣",
    category: "興趣領域",
    source: "對話推斷",
    createdAt: "2026-02-16",
    enabled: true,
  },
  {
    id: "4",
    content: "就讀大學資訊工程系二年級",
    category: "個人資訊",
    source: "使用者提供",
    createdAt: "2026-02-15",
    enabled: true,
  },
  {
    id: "5",
    content: "偏好繁體中文回答，但可接受英文專業術語",
    category: "語言偏好",
    source: "對話推斷",
    createdAt: "2026-02-14",
    enabled: true,
  },
  {
    id: "6",
    content: "對微積分還不太熟悉，需要更多基礎解釋",
    category: "學習進度",
    source: "對話推斷",
    createdAt: "2026-02-13",
    enabled: false,
  },
]

const categories = ["全部", "學習風格", "學習進度", "興趣領域", "個人資訊", "語言偏好"]

export default function MemoryPage() {
  const [memories, setMemories] = useState<MemoryItem[]>(sampleMemories)
  const [search, setSearch] = useState("")
  const [activeCategory, setActiveCategory] = useState("全部")
  const [globalEnabled, setGlobalEnabled] = useState(true)

  const filteredMemories = memories.filter((m) => {
    const matchesSearch =
      m.content.toLowerCase().includes(search.toLowerCase()) ||
      m.category.toLowerCase().includes(search.toLowerCase())
    const matchesCategory =
      activeCategory === "全部" || m.category === activeCategory
    return matchesSearch && matchesCategory
  })

  const toggleMemory = (id: string) => {
    setMemories((prev) =>
      prev.map((m) => (m.id === id ? { ...m, enabled: !m.enabled } : m))
    )
  }

  const deleteMemory = (id: string) => {
    setMemories((prev) => prev.filter((m) => m.id !== id))
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 lg:py-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold text-foreground">
            <Brain className="h-6 w-6 text-primary" />
            記憶 / 知識庫
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            管理 AI 記住的學習偏好與歷程，讓回答更個人化
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">記憶功能</span>
          <Switch
            checked={globalEnabled}
            onCheckedChange={setGlobalEnabled}
            aria-label="Toggle memory globally"
          />
        </div>
      </div>

      {/* Disabled banner */}
      {!globalEnabled && (
        <div className="mt-4 flex items-center gap-3 rounded-xl border border-chart-4/30 bg-chart-4/10 px-4 py-3">
          <AlertCircle className="h-5 w-5 shrink-0 text-chart-4" />
          <p className="text-sm text-foreground">
            記憶功能已關閉。AI 將不會參考或儲存任何記憶，所有對話將以全新狀態開始。
          </p>
        </div>
      )}

      {/* Search & filter */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="搜尋記憶內容..."
            className="pl-10"
          />
        </div>
      </div>

      {/* Category tabs */}
      <div className="mt-4 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
              activeCategory === cat
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="rounded-xl border border-border bg-card p-4 text-center">
          <div className="text-2xl font-bold text-foreground">
            {memories.length}
          </div>
          <div className="mt-1 text-xs text-muted-foreground">總記憶數</div>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 text-center">
          <div className="text-2xl font-bold text-foreground">
            {memories.filter((m) => m.enabled).length}
          </div>
          <div className="mt-1 text-xs text-muted-foreground">啟用中</div>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 text-center">
          <div className="text-2xl font-bold text-foreground">
            {new Set(memories.map((m) => m.category)).size}
          </div>
          <div className="mt-1 text-xs text-muted-foreground">分類數</div>
        </div>
      </div>

      {/* Memory list */}
      <div className="mt-6 flex flex-col gap-3">
        {filteredMemories.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-16 text-center">
            <BookOpen className="h-10 w-10 text-muted-foreground/40" />
            <p className="mt-3 text-sm font-medium text-muted-foreground">
              {search ? "找不到符合的記憶" : "尚無記憶資料"}
            </p>
            <p className="mt-1 text-xs text-muted-foreground/60">
              {search
                ? "試試不同的搜尋關鍵字"
                : "開始與 AI 對話後，記憶會自動建立"}
            </p>
          </div>
        ) : (
          filteredMemories.map((memory) => (
            <div
              key={memory.id}
              className={`flex items-start gap-4 rounded-xl border bg-card p-4 transition-all ${
                memory.enabled
                  ? "border-border"
                  : "border-border/50 opacity-60"
              }`}
            >
              <div className="flex-1">
                <p className="text-sm leading-relaxed text-card-foreground">
                  {memory.content}
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    <Tag className="mr-1 h-3 w-3" />
                    {memory.category}
                  </Badge>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {memory.createdAt}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {memory.source}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={memory.enabled}
                  onCheckedChange={() => toggleMemory(memory.id)}
                  aria-label={`Toggle memory: ${memory.content}`}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-destructive"
                  onClick={() => deleteMemory(memory.id)}
                  aria-label="Delete memory"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
