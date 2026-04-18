"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Users,
  Search,
  Download,
  MessageSquare,
  Brain,
  Bot,
  ImageIcon,
  Eye,
  Clock,
  TrendingUp,
  Filter,
  GraduationCap,
} from "lucide-react"

interface Student {
  id: string
  name: string
  studentId: string
  class: string
  totalChats: number
  totalMessages: number
  agentsCreated: number
  imagesGenerated: number
  lastActive: string
  status: "active" | "idle" | "inactive"
}

const mockStudents: Student[] = [
  {
    id: "1",
    name: "王小明",
    studentId: "S12345",
    class: "高一甲班",
    totalChats: 45,
    totalMessages: 312,
    agentsCreated: 3,
    imagesGenerated: 12,
    lastActive: "10 分鐘前",
    status: "active",
  },
  {
    id: "2",
    name: "李美玲",
    studentId: "S12346",
    class: "高一甲班",
    totalChats: 38,
    totalMessages: 256,
    agentsCreated: 2,
    imagesGenerated: 8,
    lastActive: "1 小時前",
    status: "active",
  },
  {
    id: "3",
    name: "陳大偉",
    studentId: "S12347",
    class: "高一甲班",
    totalChats: 22,
    totalMessages: 145,
    agentsCreated: 1,
    imagesGenerated: 5,
    lastActive: "昨天",
    status: "idle",
  },
  {
    id: "4",
    name: "張雅婷",
    studentId: "S12348",
    class: "高一乙班",
    totalChats: 56,
    totalMessages: 423,
    agentsCreated: 5,
    imagesGenerated: 20,
    lastActive: "2 小時前",
    status: "active",
  },
  {
    id: "5",
    name: "林志豪",
    studentId: "S12349",
    class: "高一乙班",
    totalChats: 8,
    totalMessages: 52,
    agentsCreated: 0,
    imagesGenerated: 2,
    lastActive: "一週前",
    status: "inactive",
  },
]

const classes = ["全部班級", "高一甲班", "高一乙班", "高二甲班", "高二乙班"]

export default function TeacherStudentsPage() {
  const [students] = useState<Student[]>(mockStudents)
  const [search, setSearch] = useState("")
  const [selectedClass, setSelectedClass] = useState("全部班級")
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)

  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.name.includes(search) ||
      s.studentId.toLowerCase().includes(search.toLowerCase())
    const matchesClass =
      selectedClass === "全部班級" || s.class === selectedClass
    return matchesSearch && matchesClass
  })

  const stats = [
    {
      label: "總學生數",
      value: students.length,
      icon: Users,
      color: "text-blue-600",
    },
    {
      label: "本週活躍",
      value: students.filter((s) => s.status === "active").length,
      icon: TrendingUp,
      color: "text-emerald-600",
    },
    {
      label: "總對話數",
      value: students.reduce((sum, s) => sum + s.totalChats, 0),
      icon: MessageSquare,
      color: "text-violet-600",
    },
    {
      label: "總智能體",
      value: students.reduce((sum, s) => sum + s.agentsCreated, 0),
      icon: Bot,
      color: "text-amber-600",
    },
  ]

  const statusConfig = {
    active: { label: "活躍", color: "bg-emerald-500" },
    idle: { label: "閒置", color: "bg-amber-500" },
    inactive: { label: "未活動", color: "bg-muted-foreground" },
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 lg:py-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold text-foreground">
            <Users className="h-6 w-6 text-primary" />
            學生學習歷程
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            查看班級學生的 AI 使用狀況與學習數據
          </p>
        </div>
        <Button variant="outline" size="sm" className="gap-1.5">
          <Download className="h-3.5 w-3.5" />
          匯出報表
        </Button>
      </div>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-border/50">
            <CardContent className="flex items-center gap-3 p-4">
              <div className={`rounded-lg bg-secondary p-2.5 ${stat.color}`}>
                <stat.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="搜尋學生姓名或學號..."
            className="pl-10"
          />
        </div>
        <Select value={selectedClass} onValueChange={setSelectedClass}>
          <SelectTrigger className="w-full sm:w-[160px]">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {classes.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Student table */}
      <Card className="mt-6 border-border/50">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>學生</TableHead>
              <TableHead>班級</TableHead>
              <TableHead className="text-center">對話數</TableHead>
              <TableHead className="text-center">智能體</TableHead>
              <TableHead className="text-center">圖像</TableHead>
              <TableHead>狀態</TableHead>
              <TableHead className="text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-12">
                  <GraduationCap className="mx-auto h-10 w-10 text-muted-foreground/30" />
                  <p className="mt-2 text-sm text-muted-foreground">
                    找不到符合條件的學生
                  </p>
                </TableCell>
              </TableRow>
            ) : (
              filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback className="bg-blue-100 text-blue-700 text-sm">
                          {student.name.slice(0, 1)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-foreground">{student.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {student.studentId}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="text-xs">
                      {student.class}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex flex-col items-center">
                      <span className="font-medium">{student.totalChats}</span>
                      <span className="text-xs text-muted-foreground">
                        {student.totalMessages} 則
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center font-medium">
                    {student.agentsCreated}
                  </TableCell>
                  <TableCell className="text-center font-medium">
                    {student.imagesGenerated}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div
                        className={`h-2 w-2 rounded-full ${statusConfig[student.status].color}`}
                      />
                      <span className="text-sm">{statusConfig[student.status].label}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {student.lastActive}
                    </p>
                  </TableCell>
                  <TableCell className="text-right">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="gap-1.5"
                          onClick={() => setSelectedStudent(student)}
                        >
                          <Eye className="h-3.5 w-3.5" />
                          詳情
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-lg">
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarFallback className="bg-blue-100 text-blue-700">
                                {student.name.slice(0, 1)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              {student.name}
                              <p className="text-sm font-normal text-muted-foreground">
                                {student.studentId} · {student.class}
                              </p>
                            </div>
                          </DialogTitle>
                        </DialogHeader>
                        <div className="mt-4 grid grid-cols-2 gap-4">
                          <Card className="border-border/50">
                            <CardContent className="p-4">
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <MessageSquare className="h-4 w-4" />
                                <span className="text-xs">總對話</span>
                              </div>
                              <p className="mt-1 text-2xl font-bold">{student.totalChats}</p>
                              <p className="text-xs text-muted-foreground">
                                {student.totalMessages} 則訊息
                              </p>
                            </CardContent>
                          </Card>
                          <Card className="border-border/50">
                            <CardContent className="p-4">
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <Bot className="h-4 w-4" />
                                <span className="text-xs">智能體</span>
                              </div>
                              <p className="mt-1 text-2xl font-bold">
                                {student.agentsCreated}
                              </p>
                              <p className="text-xs text-muted-foreground">已建立</p>
                            </CardContent>
                          </Card>
                          <Card className="border-border/50">
                            <CardContent className="p-4">
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <ImageIcon className="h-4 w-4" />
                                <span className="text-xs">圖像生成</span>
                              </div>
                              <p className="mt-1 text-2xl font-bold">
                                {student.imagesGenerated}
                              </p>
                              <p className="text-xs text-muted-foreground">張</p>
                            </CardContent>
                          </Card>
                          <Card className="border-border/50">
                            <CardContent className="p-4">
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <Clock className="h-4 w-4" />
                                <span className="text-xs">最後活躍</span>
                              </div>
                              <p className="mt-1 text-lg font-medium">
                                {student.lastActive}
                              </p>
                            </CardContent>
                          </Card>
                        </div>
                        <div className="mt-4 flex gap-2">
                          <Button variant="outline" className="flex-1 gap-1.5">
                            <MessageSquare className="h-4 w-4" />
                            查看對話記錄
                          </Button>
                          <Button variant="outline" className="flex-1 gap-1.5">
                            <Brain className="h-4 w-4" />
                            查看學習歷程
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}
