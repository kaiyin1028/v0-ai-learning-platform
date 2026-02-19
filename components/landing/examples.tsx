"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  MessageSquare,
  Bot,
  ImageIcon,
  Sparkles,
  Heart,
  Star,
  Download,
  Users,
  Scale,
  Stethoscope,
  Code,
  Pen,
  TrendingUp,
} from "lucide-react"

const chatExamples = [
  {
    question: "什麼是量子糾纏？用日常生活的例子解釋",
    answer:
      "想像你有一雙魔法手套 —— 你把左手套寄到台北，右手套寄到紐約。當你在台北打開包裹看到是左手套的瞬間，你立刻就知道紐約那隻是右手套。量子糾纏就像這樣：兩個粒子一旦「糾纏」，測量其中一個，另一個的狀態就瞬間確定了。",
    model: "LearnAI Pro",
  },
  {
    question: "幫我寫一段 Python 排序演算法並解釋",
    answer:
      '# 快速排序法 (Quick Sort)\ndef quick_sort(arr):\n    if len(arr) <= 1:\n        return arr\n    pivot = arr[0]\n    left = [x for x in arr[1:] if x <= pivot]\n    right = [x for x in arr[1:] if x > pivot]\n    return quick_sort(left) + [pivot] + quick_sort(right)\n\n核心概念：選一個「基準點」，比它小的放左邊，比它大的放右邊，然後遞迴處理。',
    model: "Code Agent",
  },
]

const agentExamples = [
  {
    name: "法律學習助手",
    icon: Scale,
    description: "專精台灣法律的 AI 助手，可解釋法條、分析案例、協助法律寫作練習。",
    uses: "12.5K",
    rating: "4.9",
    tags: ["法律", "考試"],
  },
  {
    name: "醫學百科全書",
    icon: Stethoscope,
    description: "涵蓋解剖學、病理學、藥理學的專業智能體，用圖解和案例幫助你理解醫學概念。",
    uses: "8.3K",
    rating: "4.8",
    tags: ["醫學", "科學"],
  },
  {
    name: "程式碼教練",
    icon: Code,
    description: "不只給你答案，更教你思路。支援多種語言，逐步引導你解決程式問題。",
    uses: "23.1K",
    rating: "4.9",
    tags: ["程式", "演算法"],
  },
  {
    name: "學術寫作導師",
    icon: Pen,
    description: "幫你改善論文結構、引用格式、學術語氣，支援 APA/MLA/Chicago 格式。",
    uses: "15.7K",
    rating: "4.7",
    tags: ["寫作", "論文"],
  },
  {
    name: "商業分析師",
    icon: TrendingUp,
    description: "協助市場分析、商業計劃撰寫、財務模型建立，適合商管學生使用。",
    uses: "6.2K",
    rating: "4.8",
    tags: ["商業", "分析"],
  },
]

const imageExamples = [
  {
    prompt: "一個未來城市的鳥瞰圖，充滿綠色植物與玻璃建築",
    style: "寫實風格",
    color: "bg-primary/10",
  },
  {
    prompt: "水彩風格的台灣傳統廟宇",
    style: "水彩風格",
    color: "bg-accent/10",
  },
  {
    prompt: "分子結構的 3D 示意圖，藍色科技感",
    style: "3D 渲染",
    color: "bg-primary/10",
  },
  {
    prompt: "極簡主義風格的學習空間設計",
    style: "極簡風格",
    color: "bg-accent/10",
  },
]

export function Examples() {
  const [activeTab, setActiveTab] = useState("chat")

  return (
    <section id="examples" className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            範例展示
          </p>
          <h2 className="mt-3 text-balance text-3xl font-bold text-foreground md:text-4xl">
            看看 LearnAI 能做什麼
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            從對話到創作，探索真實的使用情境
          </p>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="mt-12"
        >
          <TabsList className="mx-auto flex w-fit">
            <TabsTrigger value="chat" className="gap-2">
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">對話範例</span>
              <span className="sm:hidden">對話</span>
            </TabsTrigger>
            <TabsTrigger value="agents" className="gap-2">
              <Bot className="h-4 w-4" />
              <span className="hidden sm:inline">智能體市集</span>
              <span className="sm:hidden">智能體</span>
            </TabsTrigger>
            <TabsTrigger value="images" className="gap-2">
              <ImageIcon className="h-4 w-4" />
              <span className="hidden sm:inline">圖片生成</span>
              <span className="sm:hidden">圖片</span>
            </TabsTrigger>
          </TabsList>

          {/* Chat Examples */}
          <TabsContent value="chat" className="mt-8">
            <div className="grid gap-6 lg:grid-cols-2">
              {chatExamples.map((example, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-border bg-card p-6"
                >
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {example.model}
                    </Badge>
                  </div>
                  {/* User Q */}
                  <div className="mt-4 flex justify-end">
                    <div className="rounded-2xl rounded-tr-md bg-primary px-4 py-3">
                      <p className="text-sm text-primary-foreground">
                        {example.question}
                      </p>
                    </div>
                  </div>
                  {/* AI A */}
                  <div className="mt-3 flex gap-3">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary">
                      <Sparkles className="h-3.5 w-3.5 text-primary-foreground" />
                    </div>
                    <div className="rounded-2xl rounded-tl-md bg-secondary px-4 py-3">
                      <p className="whitespace-pre-line text-sm leading-relaxed text-secondary-foreground">
                        {example.answer}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Agent Examples */}
          <TabsContent value="agents" className="mt-8">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {agentExamples.map((agent) => (
                <div
                  key={agent.name}
                  className="group rounded-2xl border border-border bg-card p-5 transition-all hover:border-primary/20 hover:shadow-md"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                      <agent.icon className="h-5 w-5 text-primary" />
                    </div>
                    <button className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground" aria-label="收藏">
                      <Heart className="h-4 w-4" />
                    </button>
                  </div>
                  <h3 className="mt-3 text-base font-semibold text-card-foreground">
                    {agent.name}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {agent.description}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {agent.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center gap-4 border-t border-border pt-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Users className="h-3.5 w-3.5" />
                      {agent.uses} 使用
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 fill-chart-4 text-chart-4" />
                      {agent.rating}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Image Examples */}
          <TabsContent value="images" className="mt-8">
            <div className="grid gap-4 sm:grid-cols-2">
              {imageExamples.map((image, index) => (
                <div
                  key={index}
                  className="group overflow-hidden rounded-2xl border border-border bg-card"
                >
                  {/* Placeholder for generated image */}
                  <div
                    className={`flex aspect-[16/10] items-center justify-center ${image.color}`}
                  >
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                      <ImageIcon className="h-10 w-10 opacity-40" />
                      <span className="text-xs">AI 生成圖片預覽</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-card-foreground">
                        {image.prompt}
                      </p>
                      <Badge variant="secondary" className="mt-1.5 text-xs">
                        {image.style}
                      </Badge>
                    </div>
                    <button className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground" aria-label="下載">
                      <Download className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
