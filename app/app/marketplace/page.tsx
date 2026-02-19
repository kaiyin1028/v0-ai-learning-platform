"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Store,
  Search,
  Heart,
  Star,
  Users,
  Scale,
  Stethoscope,
  Code,
  Pen,
  TrendingUp,
  BookOpen,
  FlaskConical,
  Languages,
  Music,
  Calculator,
  GraduationCap,
  Filter,
  SortAsc,
  Bot,
} from "lucide-react"

interface Agent {
  id: string
  name: string
  description: string
  icon: typeof Scale
  author: string
  uses: string
  rating: string
  tags: string[]
  category: string
  isFavorite: boolean
}

const allAgents: Agent[] = [
  {
    id: "1",
    name: "法律學習助手",
    description: "專精台灣法律，可解釋法條、分析案例、協助法律寫作練習。涵蓋民法、刑法、行政法等領域。",
    icon: Scale,
    author: "LearnAI Team",
    uses: "12.5K",
    rating: "4.9",
    tags: ["法律", "考試準備"],
    category: "人文社科",
    isFavorite: false,
  },
  {
    id: "2",
    name: "醫學百科全書",
    description: "涵蓋解剖學、病理學、藥理學的專業智能體，用圖解和案例幫助你理解醫學概念。",
    icon: Stethoscope,
    author: "MedStudy",
    uses: "8.3K",
    rating: "4.8",
    tags: ["醫學", "生物"],
    category: "自然科學",
    isFavorite: true,
  },
  {
    id: "3",
    name: "程式碼教練",
    description: "不只給你答案，更教你思路。支援 Python、JavaScript、C++ 等語言，逐步引導你解決問題。",
    icon: Code,
    author: "CodeMaster",
    uses: "23.1K",
    rating: "4.9",
    tags: ["程式", "演算法"],
    category: "工程技術",
    isFavorite: true,
  },
  {
    id: "4",
    name: "學術寫作導師",
    description: "幫你改善論文結構、引用格式、學術語氣。支援 APA/MLA/Chicago 格式，中英文皆可。",
    icon: Pen,
    author: "AcademicPro",
    uses: "15.7K",
    rating: "4.7",
    tags: ["寫作", "論文"],
    category: "語言文學",
    isFavorite: false,
  },
  {
    id: "5",
    name: "商業分析師",
    description: "協助市場分析、商業計劃撰寫、財務模型建立，適合商管學院學生使用。",
    icon: TrendingUp,
    author: "BizSchool",
    uses: "6.2K",
    rating: "4.8",
    tags: ["商業", "經濟"],
    category: "人文社科",
    isFavorite: false,
  },
  {
    id: "6",
    name: "化學實驗助手",
    description: "協助理解化學反應、平衡方程式、實驗設計。支援有機化學、無機化學和分析化學。",
    icon: FlaskConical,
    author: "ChemLab",
    uses: "4.1K",
    rating: "4.6",
    tags: ["化學", "實驗"],
    category: "自然科學",
    isFavorite: false,
  },
  {
    id: "7",
    name: "數學解題王",
    description: "從基礎數學到高等微積分，step-by-step 帶你理解每一個解題步驟。",
    icon: Calculator,
    author: "MathGenius",
    uses: "18.9K",
    rating: "4.9",
    tags: ["數學", "微積分"],
    category: "自然科學",
    isFavorite: false,
  },
  {
    id: "8",
    name: "英語口說教練",
    description: "模擬真實對話情境，糾正文法和發音，幫你準備雅思、托福口說。",
    icon: Languages,
    author: "SpeakEasy",
    uses: "11.4K",
    rating: "4.7",
    tags: ["英語", "口說"],
    category: "語言文學",
    isFavorite: false,
  },
]

const categories = ["全部", "人文社科", "自然科學", "工程技術", "語言文學"]

export default function MarketplacePage() {
  const [agents, setAgents] = useState<Agent[]>(allAgents)
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("全部")
  const [tab, setTab] = useState("explore")

  const toggleFavorite = (id: string) => {
    setAgents((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, isFavorite: !a.isFavorite } : a
      )
    )
  }

  const filteredAgents = agents.filter((a) => {
    const matchesSearch =
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.description.toLowerCase().includes(search.toLowerCase()) ||
      a.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
    const matchesCategory =
      category === "全部" || a.category === category
    const matchesTab =
      tab === "explore" || (tab === "favorites" && a.isFavorite)
    return matchesSearch && matchesCategory && matchesTab
  })

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 lg:py-8">
      {/* Header */}
      <div>
        <h1 className="flex items-center gap-2 text-2xl font-bold text-foreground">
          <Store className="h-6 w-6 text-primary" />
          智能體市集
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          探索社群分享的智能體，找到最適合你學習的 AI 助手
        </p>
      </div>

      {/* Tabs */}
      <Tabs value={tab} onValueChange={setTab} className="mt-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <TabsList>
            <TabsTrigger value="explore">探索</TabsTrigger>
            <TabsTrigger value="favorites">
              我的收藏
              <Badge variant="secondary" className="ml-1.5 text-xs">
                {agents.filter((a) => a.isFavorite).length}
              </Badge>
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Search */}
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="搜尋智能體名稱、描述或標籤..."
              className="pl-10"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="mt-3 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                category === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <TabsContent value="explore" className="mt-6">
          <AgentGrid agents={filteredAgents} onToggleFavorite={toggleFavorite} />
        </TabsContent>

        <TabsContent value="favorites" className="mt-6">
          {filteredAgents.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-16">
              <Heart className="h-10 w-10 text-muted-foreground/30" />
              <p className="mt-3 text-sm font-medium text-muted-foreground">
                尚未收藏任何智能體
              </p>
              <p className="mt-1 text-xs text-muted-foreground/60">
                瀏覽市集並點擊愛心圖示來收藏
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-4"
                onClick={() => setTab("explore")}
              >
                瀏覽市集
              </Button>
            </div>
          ) : (
            <AgentGrid agents={filteredAgents} onToggleFavorite={toggleFavorite} />
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

function AgentGrid({
  agents,
  onToggleFavorite,
}: {
  agents: Agent[]
  onToggleFavorite: (id: string) => void
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {agents.map((agent) => (
        <div
          key={agent.id}
          className="group rounded-2xl border border-border bg-card p-5 transition-all hover:border-primary/20 hover:shadow-md"
        >
          <div className="flex items-start justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
              <agent.icon className="h-5 w-5 text-primary" />
            </div>
            <button
              onClick={() => onToggleFavorite(agent.id)}
              className={`rounded-lg p-2 transition-colors ${
                agent.isFavorite
                  ? "text-destructive"
                  : "text-muted-foreground hover:text-destructive"
              }`}
              aria-label={agent.isFavorite ? "移除收藏" : "加入收藏"}
            >
              <Heart
                className={`h-4 w-4 ${
                  agent.isFavorite ? "fill-current" : ""
                }`}
              />
            </button>
          </div>
          <h3 className="mt-3 text-base font-semibold text-card-foreground">
            {agent.name}
          </h3>
          <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {agent.description}
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {agent.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Users className="h-3.5 w-3.5" />
                {agent.uses}
              </span>
              <span className="flex items-center gap-1">
                <Star className="h-3.5 w-3.5 fill-chart-4 text-chart-4" />
                {agent.rating}
              </span>
            </div>
            <Button size="sm" variant="outline" className="h-8 text-xs">
              使用
            </Button>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            by {agent.author}
          </p>
        </div>
      ))}
    </div>
  )
}
