"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Bot,
  Plus,
  Settings,
  Wand2,
  FileText,
  Play,
  Share2,
  Save,
  Sparkles,
  Send,
  BookOpen,
  Scale,
  Stethoscope,
  Code,
  Pen,
  TrendingUp,
  Globe,
  Loader2,
  Trash2,
  Copy,
  Eye,
} from "lucide-react"

const templates = [
  {
    name: "法律顧問",
    icon: Scale,
    description: "專精法律問答與案例分析",
  },
  {
    name: "醫學百科",
    icon: Stethoscope,
    description: "醫學知識解答與圖解說明",
  },
  {
    name: "程式教練",
    icon: Code,
    description: "程式語言學習與問題解決",
  },
  {
    name: "寫作導師",
    icon: Pen,
    description: "學術寫作指導與文章改善",
  },
  {
    name: "商業分析",
    icon: TrendingUp,
    description: "市場分析與商業策略",
  },
  {
    name: "空白模板",
    icon: FileText,
    description: "從零開始自訂你的智能體",
  },
]

const myAgents = [
  {
    id: "1",
    name: "我的程式助手",
    description: "專門解答 Python 和 JavaScript 問題",
    status: "published",
    uses: "156",
  },
  {
    id: "2",
    name: "歷史知識通",
    description: "台灣與世界歷史的互動式學習",
    status: "draft",
    uses: "0",
  },
]

export default function AgentBuilderPage() {
  const [activeTab, setActiveTab] = useState("my-agents")
  const [isEditing, setIsEditing] = useState(false)
  const [testInput, setTestInput] = useState("")
  const [testResponse, setTestResponse] = useState("")
  const [isTesting, setIsTesting] = useState(false)

  // Agent form state
  const [agentName, setAgentName] = useState("")
  const [agentDescription, setAgentDescription] = useState("")
  const [systemPrompt, setSystemPrompt] = useState("")
  const [model, setModel] = useState("learnai-pro")
  const [temperature, setTemperature] = useState("0.7")
  const [webSearch, setWebSearch] = useState(false)

  const startFromTemplate = (template: (typeof templates)[0]) => {
    setAgentName(template.name)
    setAgentDescription(template.description)
    setSystemPrompt(
      `你是一位${template.name}智能體。你的職責是專業地回答使用者在此領域的問題。\n\n請遵守以下規則：\n1. 用繁體中文回答\n2. 用清楚易懂的語言解釋\n3. 適時提供實例或比喻\n4. 在不確定時誠實說明`
    )
    setActiveTab("editor")
    setIsEditing(true)
  }

  const handleTest = () => {
    if (!testInput.trim()) return
    setIsTesting(true)
    setTimeout(() => {
      setTestResponse(
        `[${agentName || "智能體"}] 測試回應：\n\n根據你的問題「${testInput}」，我來為你分析...\n\n這是一個模擬的測試回應，實際部署後 AI 會根據你設定的系統指令和知識庫來生成回答。`
      )
      setIsTesting(false)
    }, 1200)
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 lg:py-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold text-foreground">
            <Bot className="h-6 w-6 text-primary" />
            智能體建立器
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            建立專屬的 AI 智能體，設定知識、指令與工具
          </p>
        </div>
        {isEditing && (
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setIsEditing(false)
                setActiveTab("my-agents")
              }}
            >
              取消
            </Button>
            <Button size="sm" className="gap-1.5">
              <Save className="h-3.5 w-3.5" />
              儲存
            </Button>
            <Button size="sm" variant="secondary" className="gap-1.5">
              <Share2 className="h-3.5 w-3.5" />
              發布
            </Button>
          </div>
        )}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
        <TabsList>
          <TabsTrigger value="my-agents">我的智能體</TabsTrigger>
          <TabsTrigger value="templates">模板庫</TabsTrigger>
          {isEditing && <TabsTrigger value="editor">編輯器</TabsTrigger>}
        </TabsList>

        {/* My Agents */}
        <TabsContent value="my-agents" className="mt-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* Create new button */}
            <button
              onClick={() => {
                setAgentName("")
                setAgentDescription("")
                setSystemPrompt("")
                setIsEditing(true)
                setActiveTab("templates")
              }}
              className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border p-8 text-muted-foreground transition-colors hover:border-primary/30 hover:bg-secondary/50"
            >
              <Plus className="h-8 w-8" />
              <span className="mt-2 text-sm font-medium">建立新智能體</span>
            </button>

            {/* Existing agents */}
            {myAgents.map((agent) => (
              <div
                key={agent.id}
                className="rounded-2xl border border-border bg-card p-5 transition-all hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                    <Bot className="h-5 w-5 text-primary" />
                  </div>
                  <Badge
                    variant={
                      agent.status === "published" ? "default" : "secondary"
                    }
                    className="text-xs"
                  >
                    {agent.status === "published" ? "已發布" : "草稿"}
                  </Badge>
                </div>
                <h3 className="mt-3 text-base font-semibold text-card-foreground">
                  {agent.name}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {agent.description}
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 gap-1"
                    onClick={() => {
                      setAgentName(agent.name)
                      setAgentDescription(agent.description)
                      setIsEditing(true)
                      setActiveTab("editor")
                    }}
                  >
                    <Settings className="h-3.5 w-3.5" />
                    編輯
                  </Button>
                  <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground" aria-label="Delete">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* Templates */}
        <TabsContent value="templates" className="mt-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {templates.map((template) => (
              <button
                key={template.name}
                onClick={() => startFromTemplate(template)}
                className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 text-left transition-all hover:border-primary/20 hover:shadow-md"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <template.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-card-foreground">
                    {template.name}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {template.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </TabsContent>

        {/* Editor */}
        <TabsContent value="editor" className="mt-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Left: Settings */}
            <div className="flex flex-col gap-6">
              {/* Basic info */}
              <div className="rounded-2xl border border-border bg-card p-6">
                <h3 className="flex items-center gap-2 text-base font-semibold text-card-foreground">
                  <Settings className="h-4 w-4 text-primary" />
                  基本設定
                </h3>
                <div className="mt-4 flex flex-col gap-4">
                  <div>
                    <Label htmlFor="agent-name">智能體名稱</Label>
                    <Input
                      id="agent-name"
                      value={agentName}
                      onChange={(e) => setAgentName(e.target.value)}
                      placeholder="例：法律學習助手"
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="agent-desc">描述</Label>
                    <Textarea
                      id="agent-desc"
                      value={agentDescription}
                      onChange={(e) => setAgentDescription(e.target.value)}
                      placeholder="簡短描述這個智能體的功能..."
                      className="mt-1.5"
                      rows={2}
                    />
                  </div>
                  <div>
                    <Label>AI 模型</Label>
                    <Select value={model} onValueChange={setModel}>
                      <SelectTrigger className="mt-1.5">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="learnai-pro">LearnAI Pro</SelectItem>
                        <SelectItem value="gpt-4">GPT-4</SelectItem>
                        <SelectItem value="claude">Claude 3.5</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* System prompt */}
              <div className="rounded-2xl border border-border bg-card p-6">
                <h3 className="flex items-center gap-2 text-base font-semibold text-card-foreground">
                  <FileText className="h-4 w-4 text-primary" />
                  系統指令
                </h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  定義智能體的行為、知識範圍和回答風格
                </p>
                <Textarea
                  value={systemPrompt}
                  onChange={(e) => setSystemPrompt(e.target.value)}
                  placeholder="你是一位...請遵守以下規則..."
                  className="mt-3 font-mono text-sm"
                  rows={8}
                />
              </div>

              {/* Tools */}
              <div className="rounded-2xl border border-border bg-card p-6">
                <h3 className="flex items-center gap-2 text-base font-semibold text-card-foreground">
                  <Wand2 className="h-4 w-4 text-primary" />
                  工具與權限
                </h3>
                <div className="mt-4 flex flex-col gap-3">
                  <div className="flex items-center justify-between rounded-lg border border-border p-3">
                    <div className="flex items-center gap-3">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium text-card-foreground">
                          網路搜尋
                        </p>
                        <p className="text-xs text-muted-foreground">
                          允許智能體搜尋網路資訊
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={webSearch}
                      onCheckedChange={setWebSearch}
                    />
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-border p-3">
                    <div className="flex items-center gap-3">
                      <BookOpen className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium text-card-foreground">
                          知識庫存取
                        </p>
                        <p className="text-xs text-muted-foreground">
                          讀取你的學習記憶和文件
                        </p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-border p-3">
                    <div className="flex items-center gap-3">
                      <Code className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium text-card-foreground">
                          程式碼執行
                        </p>
                        <p className="text-xs text-muted-foreground">
                          可執行 Python 程式碼
                        </p>
                      </div>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Test area */}
            <div className="flex flex-col rounded-2xl border border-border bg-card">
              <div className="flex items-center gap-2 border-b border-border px-5 py-3">
                <Play className="h-4 w-4 text-primary" />
                <h3 className="text-sm font-semibold text-card-foreground">
                  測試區
                </h3>
                <Badge variant="secondary" className="ml-auto text-xs">
                  預覽模式
                </Badge>
              </div>

              {/* Test chat */}
              <div className="flex flex-1 flex-col p-5">
                <div className="flex-1">
                  {testResponse ? (
                    <div className="flex gap-3">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary">
                        <Bot className="h-3.5 w-3.5 text-primary-foreground" />
                      </div>
                      <div className="rounded-2xl rounded-tl-md bg-secondary px-4 py-3">
                        <p className="whitespace-pre-line text-sm leading-relaxed text-secondary-foreground">
                          {testResponse}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <Bot className="h-10 w-10 text-muted-foreground/30" />
                      <p className="mt-3 text-sm text-muted-foreground">
                        在下方輸入訊息測試你的智能體
                      </p>
                    </div>
                  )}
                </div>

                {/* Test input */}
                <div className="mt-4 flex gap-2">
                  <Input
                    value={testInput}
                    onChange={(e) => setTestInput(e.target.value)}
                    placeholder="輸入測試訊息..."
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleTest()
                    }}
                  />
                  <Button
                    size="icon"
                    onClick={handleTest}
                    disabled={!testInput.trim() || isTesting}
                    aria-label="Send test"
                  >
                    {isTesting ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
