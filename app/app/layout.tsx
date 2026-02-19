"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Sparkles,
  MessageSquare,
  Brain,
  Bot,
  Store,
  ImageIcon,
  Wand2,
  Settings,
  Menu,
  ChevronLeft,
  Plus,
  LogOut,
} from "lucide-react"

const navItems = [
  {
    label: "AI 對話",
    href: "/app",
    icon: MessageSquare,
  },
  {
    label: "記憶 / 知識庫",
    href: "/app/memory",
    icon: Brain,
  },
  {
    label: "智能體建立器",
    href: "/app/agent-builder",
    icon: Bot,
  },
  {
    label: "智能體市集",
    href: "/app/marketplace",
    icon: Store,
  },
  {
    label: "圖片生成",
    href: "/app/image-gen",
    icon: ImageIcon,
  },
  {
    label: "圖片編輯",
    href: "/app/image-edit",
    icon: Wand2,
  },
]

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()

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
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/app" && pathname.startsWith(item.href))
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

        {/* Recent chats */}
        <div className="mt-6 pb-4">
          <p className="px-3 text-xs font-semibold uppercase tracking-widest text-sidebar-foreground/50">
            最近對話
          </p>
          <div className="mt-2 flex flex-col gap-0.5">
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
      </ScrollArea>

      {/* User */}
      <div className="border-t border-sidebar-border p-3">
        <div className="flex items-center gap-3 rounded-lg px-2 py-2">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-sidebar-primary/10 text-xs text-sidebar-primary">
              S
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 truncate">
            <p className="truncate text-sm font-medium text-sidebar-foreground">
              學生帳號
            </p>
            <p className="truncate text-xs text-sidebar-foreground/50">
              Free 方案
            </p>
          </div>
          <Link href="/">
            <Button variant="ghost" size="icon" className="h-8 w-8 text-sidebar-foreground/50" aria-label="Logout">
              <LogOut className="h-4 w-4" />
            </Button>
          </Link>
        </div>
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

  return (
    <div className="flex h-dvh bg-background">
      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 border-r border-sidebar-border bg-sidebar lg:block">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-64 bg-sidebar p-0">
          <SidebarContent onNavigate={() => setMobileOpen(false)} />
        </SheetContent>
      </Sheet>

      {/* Main */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Mobile header */}
        <header className="flex h-14 items-center gap-3 border-b border-border bg-background px-4 lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9"
            onClick={() => setMobileOpen(true)}
            aria-label="Open sidebar"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <Link href="/app" className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary">
              <Sparkles className="h-3.5 w-3.5 text-primary-foreground" />
            </div>
            <span className="text-sm font-bold text-foreground">LearnAI</span>
          </Link>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}
