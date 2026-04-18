"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  Users,
  Search,
  Plus,
  Upload,
  Download,
  MoreHorizontal,
  Pencil,
  Trash2,
  Key,
  GraduationCap,
  BookOpen,
  Shield,
  Filter,
  UserPlus,
  FileUp,
} from "lucide-react"

type UserRole = "student" | "teacher" | "admin"

interface UserAccount {
  id: string
  name: string
  userId: string
  role: UserRole
  class?: string
  department?: string
  email?: string
  status: "active" | "suspended" | "pending"
  lastLogin: string
  createdAt: string
}

const mockUsers: UserAccount[] = [
  {
    id: "1",
    name: "王小明",
    userId: "S12345",
    role: "student",
    class: "高一甲班",
    email: "s12345@school.edu.tw",
    status: "active",
    lastLogin: "2026-02-27",
    createdAt: "2025-09-01",
  },
  {
    id: "2",
    name: "李美玲",
    userId: "S12346",
    role: "student",
    class: "高一甲班",
    email: "s12346@school.edu.tw",
    status: "active",
    lastLogin: "2026-02-26",
    createdAt: "2025-09-01",
  },
  {
    id: "3",
    name: "陳老師",
    userId: "T00001",
    role: "teacher",
    department: "資訊科",
    email: "t00001@school.edu.tw",
    status: "active",
    lastLogin: "2026-02-27",
    createdAt: "2025-08-15",
  },
  {
    id: "4",
    name: "林主任",
    userId: "T00002",
    role: "teacher",
    department: "國文科",
    email: "t00002@school.edu.tw",
    status: "active",
    lastLogin: "2026-02-25",
    createdAt: "2025-08-15",
  },
  {
    id: "5",
    name: "張同學",
    userId: "S12350",
    role: "student",
    class: "高二甲班",
    email: "s12350@school.edu.tw",
    status: "suspended",
    lastLogin: "2026-01-15",
    createdAt: "2025-09-01",
  },
  {
    id: "6",
    name: "系統管理員",
    userId: "admin",
    role: "admin",
    email: "admin@school.edu.tw",
    status: "active",
    lastLogin: "2026-02-27",
    createdAt: "2025-01-01",
  },
]

const roleConfig = {
  student: {
    icon: GraduationCap,
    label: "學生",
    color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  },
  teacher: {
    icon: BookOpen,
    label: "教師",
    color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  },
  admin: {
    icon: Shield,
    label: "管理員",
    color: "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400",
  },
}

const statusConfig = {
  active: { label: "啟用", color: "bg-emerald-500" },
  suspended: { label: "停用", color: "bg-destructive" },
  pending: { label: "待啟用", color: "bg-amber-500" },
}

export default function AdminUsersPage() {
  const [users] = useState<UserAccount[]>(mockUsers)
  const [search, setSearch] = useState("")
  const [roleFilter, setRoleFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.includes(search) ||
      u.userId.toLowerCase().includes(search.toLowerCase()) ||
      (u.email && u.email.toLowerCase().includes(search.toLowerCase()))
    const matchesRole = roleFilter === "all" || u.role === roleFilter
    const matchesStatus = statusFilter === "all" || u.status === statusFilter
    return matchesSearch && matchesRole && matchesStatus
  })

  const stats = {
    total: users.length,
    students: users.filter((u) => u.role === "student").length,
    teachers: users.filter((u) => u.role === "teacher").length,
    admins: users.filter((u) => u.role === "admin").length,
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 lg:py-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold text-foreground">
            <Users className="h-6 w-6 text-primary" />
            帳號管理
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            管理平台所有師生帳號與權限設定
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-1.5">
            <FileUp className="h-3.5 w-3.5" />
            批量匯入
          </Button>
          <Button variant="outline" size="sm" className="gap-1.5">
            <Download className="h-3.5 w-3.5" />
            匯出
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="gap-1.5">
                <UserPlus className="h-3.5 w-3.5" />
                新增帳號
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>新增帳號</DialogTitle>
                <DialogDescription>
                  建立新的師生帳號，預設密碼為身分證後四碼
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">姓名</Label>
                  <Input id="name" placeholder="請輸入姓名" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="userId">帳號 (學號/教職員編號)</Label>
                  <Input id="userId" placeholder="例: S12345 或 T00001" />
                </div>
                <div className="grid gap-2">
                  <Label>身份</Label>
                  <Select defaultValue="student">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="student">學生</SelectItem>
                      <SelectItem value="teacher">教師</SelectItem>
                      <SelectItem value="admin">管理員</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email (選填)</Label>
                  <Input id="email" type="email" placeholder="example@school.edu.tw" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  取消
                </Button>
                <Button onClick={() => setIsAddDialogOpen(false)}>建立帳號</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-4 gap-4">
        <Card className="border-border/50">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-foreground">{stats.total}</p>
            <p className="text-xs text-muted-foreground">總帳號數</p>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">{stats.students}</p>
            <p className="text-xs text-muted-foreground">學生</p>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-emerald-600">{stats.teachers}</p>
            <p className="text-xs text-muted-foreground">教師</p>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-violet-600">{stats.admins}</p>
            <p className="text-xs text-muted-foreground">管理員</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="搜尋姓名、帳號或 Email..."
            className="pl-10"
          />
        </div>
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-full sm:w-[130px]">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="身份" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部身份</SelectItem>
            <SelectItem value="student">學生</SelectItem>
            <SelectItem value="teacher">教師</SelectItem>
            <SelectItem value="admin">管理員</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[130px]">
            <SelectValue placeholder="狀態" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部狀態</SelectItem>
            <SelectItem value="active">啟用</SelectItem>
            <SelectItem value="suspended">停用</SelectItem>
            <SelectItem value="pending">待啟用</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* User table */}
      <Card className="mt-6 border-border/50">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>帳號</TableHead>
              <TableHead>身份</TableHead>
              <TableHead>班級/科別</TableHead>
              <TableHead>狀態</TableHead>
              <TableHead>最後登入</TableHead>
              <TableHead className="text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-12">
                  <Users className="mx-auto h-10 w-10 text-muted-foreground/30" />
                  <p className="mt-2 text-sm text-muted-foreground">
                    找不到符合條件的帳號
                  </p>
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => {
                const role = roleConfig[user.role]
                const RoleIcon = role.icon
                const status = statusConfig[user.status]
                return (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarFallback className={role.color}>
                            {user.name.slice(0, 1)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-foreground">{user.name}</p>
                          <p className="text-xs text-muted-foreground">{user.userId}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={`gap-1 text-xs ${role.color}`}>
                        <RoleIcon className="h-3 w-3" />
                        {role.label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {user.class || user.department || "-"}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className={`h-2 w-2 rounded-full ${status.color}`} />
                        <span className="text-sm">{status.label}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {user.lastLogin}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>帳號操作</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Pencil className="mr-2 h-4 w-4" />
                            編輯資料
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Key className="mr-2 h-4 w-4" />
                            重設密碼
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            {user.status === "active" ? "停用帳號" : "刪除帳號"}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}
