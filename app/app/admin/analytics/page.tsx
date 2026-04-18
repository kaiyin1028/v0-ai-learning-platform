"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  BarChart3,
  TrendingUp,
  Users,
  MessageSquare,
  Bot,
  ImageIcon,
  Download,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"

export default function AdminAnalyticsPage() {
  const stats = [
    {
      label: "總使用次數",
      value: "45,231",
      change: "+12.5%",
      trend: "up",
      icon: MessageSquare,
      color: "text-blue-600",
      bgColor: "bg-blue-100 dark:bg-blue-900/30",
    },
    {
      label: "活躍用戶",
      value: "1,234",
      change: "+8.2%",
      trend: "up",
      icon: Users,
      color: "text-emerald-600",
      bgColor: "bg-emerald-100 dark:bg-emerald-900/30",
    },
    {
      label: "智能體使用",
      value: "8,567",
      change: "+23.1%",
      trend: "up",
      icon: Bot,
      color: "text-violet-600",
      bgColor: "bg-violet-100 dark:bg-violet-900/30",
    },
    {
      label: "圖像生成",
      value: "2,891",
      change: "-3.2%",
      trend: "down",
      icon: ImageIcon,
      color: "text-amber-600",
      bgColor: "bg-amber-100 dark:bg-amber-900/30",
    },
  ]

  const topAgents = [
    { name: "程式設計助教", uses: 1234, category: "程式" },
    { name: "作文批改助手", uses: 987, category: "國文" },
    { name: "數學解題王", uses: 876, category: "數學" },
    { name: "英文文法檢查", uses: 654, category: "英文" },
    { name: "歷史知識通", uses: 543, category: "歷史" },
  ]

  const topClasses = [
    { name: "高一甲班", usage: 4521, students: 42 },
    { name: "高二乙班", usage: 3987, students: 38 },
    { name: "高一乙班", usage: 3654, students: 40 },
    { name: "高三甲班", usage: 2987, students: 35 },
    { name: "高二甲班", usage: 2543, students: 39 },
  ]

  const dailyUsage = [
    { day: "週一", value: 85 },
    { day: "週二", value: 92 },
    { day: "週三", value: 78 },
    { day: "週四", value: 95 },
    { day: "週五", value: 88 },
    { day: "週六", value: 45 },
    { day: "週日", value: 38 },
  ]

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 lg:py-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold text-foreground">
            <BarChart3 className="h-6 w-6 text-primary" />
            使用統計
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            平台整體使用數據分析與趨勢報告
          </p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="7d">
            <SelectTrigger className="w-[140px]">
              <Calendar className="mr-2 h-4 w-4" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">過去 7 天</SelectItem>
              <SelectItem value="30d">過去 30 天</SelectItem>
              <SelectItem value="90d">過去 90 天</SelectItem>
              <SelectItem value="1y">過去一年</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" className="gap-1.5">
            <Download className="h-3.5 w-3.5" />
            匯出報表
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className={`rounded-lg p-2 ${stat.bgColor} ${stat.color}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
                <div className={`flex items-center gap-1 text-xs ${
                  stat.trend === "up" ? "text-emerald-600" : "text-destructive"
                }`}>
                  {stat.trend === "up" ? (
                    <ArrowUpRight className="h-3 w-3" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3" />
                  )}
                  {stat.change}
                </div>
              </div>
              <p className="mt-3 text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {/* Usage Chart */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-base">每日使用趨勢</CardTitle>
            <CardDescription>本週各天的平台使用量分布</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-2 h-48">
              {dailyUsage.map((item) => (
                <div key={item.day} className="flex-1 flex flex-col items-center gap-2">
                  <div 
                    className="w-full bg-primary/80 rounded-t-md transition-all hover:bg-primary"
                    style={{ height: `${item.value * 1.5}px` }}
                  />
                  <span className="text-xs text-muted-foreground">{item.day}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Feature Distribution */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-base">功能使用分布</CardTitle>
            <CardDescription>各功能模組的使用比例</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "AI 對話", value: 45, color: "bg-blue-500" },
                { name: "智能體", value: 28, color: "bg-violet-500" },
                { name: "圖像生成", value: 18, color: "bg-amber-500" },
                { name: "圖像編輯", value: 9, color: "bg-emerald-500" },
              ].map((item) => (
                <div key={item.name} className="space-y-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-foreground">{item.name}</span>
                    <span className="text-muted-foreground">{item.value}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-secondary overflow-hidden">
                    <div 
                      className={`h-full ${item.color} rounded-full transition-all`}
                      style={{ width: `${item.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tables Row */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {/* Top Agents */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Bot className="h-4 w-4 text-primary" />
              熱門智能體
            </CardTitle>
            <CardDescription>使用次數最多的智能體排行</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topAgents.map((agent, index) => (
                <div
                  key={agent.name}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{agent.name}</p>
                    <p className="text-xs text-muted-foreground">{agent.category}</p>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {agent.uses.toLocaleString()} 次
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Classes */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              活躍班級排行
            </CardTitle>
            <CardDescription>平台使用量最高的班級</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topClasses.map((cls, index) => (
                <div
                  key={cls.name}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-sm font-medium text-emerald-600 dark:bg-emerald-900/30">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{cls.name}</p>
                    <p className="text-xs text-muted-foreground">{cls.students} 位學生</p>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {cls.usage.toLocaleString()} 次
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
