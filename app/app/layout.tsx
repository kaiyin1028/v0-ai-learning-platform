"use client"

import { useState, createContext, useContext } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sparkles,
  MessageSquare,
  Brain,
  Bot,
  Store,
  ImageIcon,
  Wand2,
  Menu,
  Plus,
  LogOut,
  GraduationCap,
  BookOpen,
  Shield,
  Users,
  BarChart3,
  Settings,
  ChevronDown,
  History,
  HelpCircle,
} from "lucide-react"

// User role type
type UserRole = "student" | "teacher" | "admin"

// Mock user context - replace with real auth
interface User {
  id: string
  name: string
  role: UserRole
  studentId?: string
  class?: string
}

const mockUsers: Record<UserRole, User> = {
  student: {
    id: "1",
    name: "王小明",
    role: "student",
    studentId: "S12345",
    class: "高一甲班"
  },
  teacher: {
    id: "2", 
    name: "陳老師",
    role: "teacher",
    studentId: "T00001",
  },
  admin: {
    id: "3",
    name: "系統管理員",
    role: "admin",
    studentId: "admin",
  }
}

// For demo purposes, default to student
const UserContext = createContext<User>(mockUsers.student)

// Role-based navigation items
const getNavItems = (role: UserRole) => {
  const baseItems = [
    {
      label: "AI 對話",
      href: "/app",
      icon: MessageSquare,
      description: "與 AI 助教對話學習"
    },
    {
      label: "學習記憶",
      href: "/app/memory",
      icon: Brain,
      description: "管理對話記憶與知識庫"
    },
    {
      label: "智能體工作室",
      href: "/app/agent-builder",
      icon: Bot,
      description: "建立專屬學科智能體"
    },
    {
      label: "智能體市集",
      href: "/app/marketplace",
      icon: Store,
      description: "探索與收藏智能體"
    },
    {
      label: "圖像生成",
      href: "/app/image-gen",
      icon: ImageIcon,
      description: "AI 文字轉圖像"
    },
    {
      label: "圖像編輯",
      href: "/app/image-edit",
      icon: Wand2,
      description: "智能圖像處理工具"
    },
  ]

  const teacherItems = [
    {
      label: "學生學習歷程",
      href: "/app/teacher/students",
      icon: Users,
      description: "查看班級學生使用記錄"
    },
    {
      label: "課程智能體管理",
      href: "/app/teacher/agents",
      icon: BookOpen,
      description: "管理課程專屬智能體"
    },
  ]

  const adminItems = [
    {
      label: "帳號管理",
      href: "/app/admin/users",
      icon: Users,
      description: "管理師生帳號"
    },
    {
      label: "使用統計",
      href: "/app/admin/analytics",
      icon: BarChart3,
      description: "平台使用數據分析"
    },
    {
      label: "系統設定",
      href: "/app/admin/settings",
      icon: Settings,
      description: "平台參數設定"
    },
  ]

  if (role === "admin") {
    return [...baseItems, ...adminItems]
  }
  if (role === "teacher") {
    return [...baseItems, ...teacherItems]
  }
  return baseItems
}

const roleConfig = {
  student: {
    icon: GraduationCap,
    label: "學生",
    color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    badgeColor: "bg-blue-500"
  },
  teacher: {
    icon: BookOpen,
    label: "教師",
    color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    badgeColor: "bg-emerald-500"
  },
  admin: {
    icon: Shield,
    label: "管理員",
    color: "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400",
    badgeColor: "bg-violet-500"
  }
}

function SidebarContent({ onNavigate, user }: { onNavigate?: () => void; user: User }) {
  const pathname = usePathname()
  const navItems = getNavItems(user.role)
  const config = roleConfig[user.role]
  const RoleIcon = config.icon

  // Split items into main and role-specific
  const mainItems = navItems.slice(0, 6)
  const roleItems = navItems.slice(6)

  return (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-4">
        <Link href="/" className="flex items-center gap-2" onClick={onNavigate}>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary">
            <Sparkles className="h-4 w-4 text-sidebar-primary-foreground" />
          </div>
          <span className="text-base font-bold text-sidebar-foreground">
            LearnAI
          </span>
        </Link>
      </div>

      {/* New Chat button */}
      <div className="p-3">
        <Link href="/app" onClick={onNavigate}>
          <Button className="w-full gap-2" size="sm">
            <Plus className="h-4 w-4" />
            新對話
          </Button>
        </Link>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3">
        <nav className="flex flex-col gap-1" aria-label="App navigation">
          {mainItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/app" && pathname.startsWith(item.href))
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onNavigate}
                className={cn(
                  "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                )}
              >
                <item.icon className="h-4.5 w-4.5 shrink-0" />
                <span className="flex-1">{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Role-specific items */}
        {roleItems.length > 0 && (
          <div className="mt-4 pt-4 border-t border-sidebar-border">
            <p className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/50 flex items-center gap-2">
              <RoleIcon className="h-3 w-3" />
              {config.label}專區
            </p>
            <nav className="flex flex-col gap-1">
              {roleItems.map((item) => {
                const isActive = pathname.startsWith(item.href)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onNavigate}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                    )}
                  >
                    <item.icon className="h-4.5 w-4.5 shrink-0" />
                    {item.label}
                  </Link>
                )
              })}
            </nav>
          </div>
        )}

        {/* Recent chats - only for students and teachers */}
        {(user.role === "student" || user.role === "teacher") && (
          <div className="mt-4 pt-4 border-t border-sidebar-border pb-4">
            <p className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/50 flex items-center gap-2">
              <History className="h-3 w-3" />
              最近對話
            </p>
            <div className="flex flex-col gap-0.5">
              {[
                "量子力學入門筆記",
                "Python 排序演算法",
                "經濟學供需分析",
                "英文寫作練習",
              ].map((chat) => (
                <button
                  key={chat}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-sidebar-foreground/60 transition-colors hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                >
                  <MessageSquare className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">{chat}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </ScrollArea>

      {/* User Profile */}
      <div className="border-t border-sidebar-border p-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex w-full items-center gap-3 rounded-lg px-2 py-2 hover:bg-sidebar-accent/50 transition-colors">
              <Avatar className="h-9 w-9">
                <AvatarFallback className={cn("text-xs font-medium", config.color)}>
                  {user.name.slice(0, 1)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 text-left min-w-0">
                <div className="flex items-center gap-2">
                  <p className="truncate text-sm font-medium text-sidebar-foreground">
                    {user.name}
                  </p>
                  <Badge variant="secondary" className={cn("text-[10px] px-1.5 py-0", config.color)}>
                    {config.label}
                  </Badge>
                </div>
                <p className="truncate text-xs text-sidebar-foreground/50">
                  {user.studentId} {user.class && `· ${user.class}`}
                </p>
              </div>
              <ChevronDown className="h-4 w-4 text-sidebar-foreground/50" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>我的帳號</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              個人設定
            </DropdownMenuItem>
            <DropdownMenuItem>
              <HelpCircle className="mr-2 h-4 w-4" />
              幫助中心
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/login" className="text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                登出
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [mobileOpen, setMobileOpen] = useState(false)
  
  // Demo: Get role from URL or default to student
  // In production, this would come from auth context
  const pathname = usePathname()
  let currentUser = mockUsers.student
  if (pathname.includes("/admin")) {
    currentUser = mockUsers.admin
  } else if (pathname.includes("/teacher")) {
    currentUser = mockUsers.teacher
  }

  return (
    <UserContext.Provider value={currentUser}>
      <div className="flex h-dvh bg-background">
        {/* Desktop sidebar */}
        <aside className="hidden w-64 shrink-0 border-r border-sidebar-border bg-sidebar lg:block">
          <SidebarContent user={currentUser} />
        </aside>

        {/* Mobile sidebar */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetContent side="left" className="w-64 bg-sidebar p-0">
            <SidebarContent onNavigate={() => setMobileOpen(false)} user={currentUser} />
          </SheetContent>
        </Sheet>

        {/* Main */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Mobile header */}
          <header className="flex h-14 items-center justify-between gap-3 border-b border-border bg-background px-4 lg:hidden">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9"
                onClick={() => setMobileOpen(true)}
                aria-label="開啟選單"
              >
                <Menu className="h-5 w-5" />
              </Button>
              <Link href="/app" className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary">
                  <Sparkles className="h-3.5 w-3.5 text-primary-foreground" />
                </div>
                <span className="text-sm font-bold text-foreground">LearnAI</span>
              </Link>
            </div>
            <Badge variant="secondary" className={cn("text-xs", roleConfig[currentUser.role].color)}>
              {roleConfig[currentUser.role].label}
            </Badge>
          </header>

          {/* Page content */}
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </div>
    </UserContext.Provider>
  )
}
