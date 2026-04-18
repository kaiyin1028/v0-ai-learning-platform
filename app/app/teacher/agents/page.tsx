"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Bot,
  Plus,
  Search,
  Settings,
  Users,
  Eye,
  Lock,
  Unlock,
  Copy,
  Trash2,
  BarChart3,
  BookOpen,
  Code,
  Pen,
  Scale,
  MessageSquare,
} from "lucide-react"

interface CourseAgent {
  id: string
  name: string
  description: string
  course: string
  icon: string
  usageCount: number
  studentCount: number
  isPublic: boolean
  allowedClasses: string[]
  createdAt: string
}

const mockAgents: CourseAgent[] = [
  {
    id: "1",
    name: "程式設計助教",
    description: "Python 基礎教學與程式除錯協助",
    course: "程式設計概論",
    icon: "code",
    usageCount: 234,
    studentCount: 45,
    isPublic: true,
    allowedClasses: ["高一甲班", "高一乙班"],
    createdAt: "2026-01-15",
  },
  {
    id: "2",
    name: "作文批改助手",
    description: "國文作文結構分析與修改建議",
    course: "國文",
    icon: "pen",
    usageCount: 156,
    studentCount: 38,
    isPublic: true,
    allowedClasses: ["高一甲班"],
    createdAt: "2026-01-20",
  },
  {
    id: "3",
    name: "法律概論導讀",
    description: "公民課法律單元的案例分析與問答",
    course: "公民與社會",
    icon: "scale",
    usageCount: 89,
    studentCount: 22,
    isPublic: false,
    allowedClasses: ["高二甲班"],
    createdAt: "2026-02-01",
  },
]

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  code: Code,
  pen: Pen,
  scale: Scale,
  book: BookOpen,
}

const allClasses = ["高一甲班", "高一乙班", "高二甲班", "高二乙班", "高三甲班"]

export default function TeacherAgentsPage() {
  const [agents, setAgents] = useState<CourseAgent[]>(mockAgents)
  const [search, setSearch] = useState("")

  const filteredAgents = agents.filter(
    (a) =>
      a.name.includes(search) ||
      a.course.includes(search) ||
      a.description.includes(search)
  )

  const togglePublic = (id: string) => {
    setAgents((prev) =>
      prev.map((a) => (a.id === id ? { ...a, isPublic: !a.isPublic } : a))
    )
  }

  const totalUsage = agents.reduce((sum, a) => sum + a.usageCount, 0)
  const totalStudents = new Set(agents.flatMap((a) => a.allowedClasses)).size

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 lg:py-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold text-foreground">
            <BookOpen className="h-6 w-6 text-primary" />
            課程智能體管理
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            建立與管理課程專屬的 AI 智能體，設定學生使用權限
          </p>
        </div>
        <Button className="gap-1.5">
          <Plus className="h-4 w-4" />
          建立課程智能體
        </Button>
      </div>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-3 gap-4">
        <Card className="border-border/50">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="rounded-lg bg-emerald-100 p-2.5 text-emerald-600 dark:bg-emerald-900/30">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{agents.length}</p>
              <p className="text-xs text-muted-foreground">課程智能體</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="rounded-lg bg-blue-100 p-2.5 text-blue-600 dark:bg-blue-900/30">
              <MessageSquare className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{totalUsage}</p>
              <p className="text-xs text-muted-foreground">總使用次數</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="rounded-lg bg-violet-100 p-2.5 text-violet-600 dark:bg-violet-900/30">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{totalStudents}</p>
              <p className="text-xs text-muted-foreground">授權班級</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="mt-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="搜尋智能體名稱或課程..."
            className="pl-10"
          />
        </div>
      </div>

      {/* Agent list */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredAgents.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-16 text-center">
            <Bot className="h-10 w-10 text-muted-foreground/30" />
            <p className="mt-3 text-sm font-medium text-muted-foreground">
              {search ? "找不到符合的智能體" : "尚未建立課程智能體"}
            </p>
            <p className="mt-1 text-xs text-muted-foreground/60">
              {search ? "試試不同的搜尋關鍵字" : "點擊上方按鈕建立你的第一個課程智能體"}
            </p>
          </div>
        ) : (
          filteredAgents.map((agent) => {
            const IconComponent = iconMap[agent.icon] || Bot
            return (
              <Card key={agent.id} className="border-border/50 transition-all hover:shadow-md">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                      <IconComponent className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex items-center gap-2">
                      {agent.isPublic ? (
                        <Badge variant="secondary" className="gap-1 text-xs">
                          <Unlock className="h-3 w-3" />
                          公開
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="gap-1 text-xs">
                          <Lock className="h-3 w-3" />
                          限定
                        </Badge>
                      )}
                    </div>
                  </div>
                  <CardTitle className="mt-3 text-base">{agent.name}</CardTitle>
                  <CardDescription className="text-xs">
                    {agent.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <BookOpen className="h-3 w-3" />
                    <span>{agent.course}</span>
                  </div>
                  <div className="mt-3 flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <MessageSquare className="h-3.5 w-3.5" />
                      <span>{agent.usageCount} 次使用</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Users className="h-3.5 w-3.5" />
                      <span>{agent.studentCount} 學生</span>
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1">
                    {agent.allowedClasses.map((cls) => (
                      <Badge key={cls} variant="secondary" className="text-[10px]">
                        {cls}
                      </Badge>
                    ))}
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="flex-1 gap-1.5">
                          <Settings className="h-3.5 w-3.5" />
                          管理
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-2">
                            <IconComponent className="h-5 w-5 text-primary" />
                            {agent.name}
                          </DialogTitle>
                          <DialogDescription>{agent.description}</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium">公開存取</p>
                              <p className="text-xs text-muted-foreground">
                                允許所有授權班級學生使用
                              </p>
                            </div>
                            <Switch
                              checked={agent.isPublic}
                              onCheckedChange={() => togglePublic(agent.id)}
                            />
                          </div>
                          <div>
                            <p className="text-sm font-medium mb-2">授權班級</p>
                            <div className="flex flex-wrap gap-2">
                              {allClasses.map((cls) => (
                                <Badge
                                  key={cls}
                                  variant={
                                    agent.allowedClasses.includes(cls)
                                      ? "default"
                                      : "outline"
                                  }
                                  className="cursor-pointer"
                                >
                                  {cls}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" className="gap-1.5">
                            <BarChart3 className="h-4 w-4" />
                            查看統計
                          </Button>
                          <Button className="gap-1.5">
                            <Settings className="h-4 w-4" />
                            編輯設定
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    <Button variant="ghost" size="sm" className="gap-1.5">
                      <Eye className="h-3.5 w-3.5" />
                      預覽
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })
        )}
      </div>
    </div>
  )
}
