"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Menu,
  Sparkles,
  X,
} from "lucide-react"

const navLinks = [
  { label: "功能特色", href: "#features" },
  { label: "使用流程", href: "#how-it-works" },
  { label: "範例展示", href: "#examples" },
  { label: "方案價格", href: "#pricing" },
  { label: "常見問題", href: "#faq" },
]

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold text-foreground">LearnAI</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-3 md:flex">
          <Link href="/app">
            <Button variant="ghost" size="sm">
              登入
            </Button>
          </Link>
          <Link href="/app">
            <Button size="sm">
              免費開始
            </Button>
          </Link>
        </div>

        {/* Mobile Menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <div className="flex flex-col gap-6 pt-6">
              <div className="flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                    <Sparkles className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <span className="text-lg font-bold text-foreground">LearnAI</span>
                </Link>
              </div>
              <nav className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="rounded-md px-3 py-3 text-base font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
              <div className="flex flex-col gap-3 pt-4">
                <Link href="/app" onClick={() => setOpen(false)}>
                  <Button variant="outline" className="w-full">
                    登入
                  </Button>
                </Link>
                <Link href="/app" onClick={() => setOpen(false)}>
                  <Button className="w-full">
                    免費開始
                  </Button>
                </Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
