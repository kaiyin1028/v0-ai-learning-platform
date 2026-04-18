"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  MessageSquare, 
  Bot, 
  ImageIcon, 
  Wand2,
  GraduationCap,
  Shield,
  Sparkles,
  ArrowRight,
  BookOpen,
  Users,
  Brain
} from "lucide-react"

export default function PortalPage() {
  const [isHovered, setIsHovered] = useState<string | null>(null)

  const features = [
    {
      id: "chat",
      icon: MessageSquare,
      title: "AI 對話學習",
      description: "與 AI 助教即時對話，解答課業疑問，支援學習歷程記錄",
      color: "from-blue-500/10 to-cyan-500/10",
      iconColor: "text-blue-600"
    },
    {
      id: "agent",
      icon: Bot,
      title: "智能體工作室",
      description: "建立專屬學科助教，法律、醫學、程式、寫作一應俱全",
      color: "from-violet-500/10 to-purple-500/10",
      iconColor: "text-violet-600"
    },
    {
      id: "image-gen",
      icon: ImageIcon,
      title: "AI 圖像生成",
      description: "文字轉圖像，支援多種風格，創作專題報告素材",
      color: "from-amber-500/10 to-orange-500/10",
      iconColor: "text-amber-600"
    },
    {
      id: "image-edit",
      icon: Wand2,
      title: "圖像編輯工具",
      description: "智能去背、風格轉換、局部重繪，讓創作更專業",
      color: "from-emerald-500/10 to-teal-500/10",
      iconColor: "text-emerald-600"
    }
  ]

  const stats = [
    { icon: Users, value: "5,000+", label: "師生使用中" },
    { icon: Brain, value: "100萬+", label: "對話次數" },
    { icon: BookOpen, value: "50+", label: "學科智能體" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/30">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">LearnAI</h1>
              <p className="text-xs text-muted-foreground">智慧學習平台</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">登入</Button>
            </Link>
            <Link href="/login">
              <Button size="sm" className="gap-2">
                開始使用 <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-16 pb-12 md:pt-24 md:pb-20">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <GraduationCap className="w-4 h-4" />
            <span>校園專屬 AI 學習工具</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4 leading-tight text-balance">
            用 AI 助力學習
            <br />
            <span className="text-primary">開啟智慧校園新體驗</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto text-pretty">
            專為學校師生打造的 AI 學習平台，對話學習、智能體建立、圖像創作，
            一站式滿足課業與創作需求。
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/login">
              <Button size="lg" className="w-full sm:w-auto gap-2 text-base">
                使用學校帳號登入
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="w-full sm:w-auto gap-2 text-base">
              <Shield className="w-4 h-4" />
              了解資料安全
            </Button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="container mx-auto px-4 pb-12">
        <div className="max-w-2xl mx-auto">
          <div className="grid grid-cols-3 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-4">
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-primary" />
                <div className="text-2xl md:text-3xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            四大核心功能
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            從課業輔導到創意製作，AI 全方位支援你的學習旅程
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {features.map((feature) => (
            <Card 
              key={feature.id}
              className={`relative overflow-hidden border-border/50 transition-all duration-300 cursor-pointer
                ${isHovered === feature.id ? 'shadow-lg scale-[1.02] border-primary/30' : 'hover:shadow-md'}`}
              onMouseEnter={() => setIsHovered(feature.id)}
              onMouseLeave={() => setIsHovered(null)}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-50`} />
              <CardHeader className="relative pb-2">
                <div className={`w-12 h-12 rounded-xl bg-background shadow-sm flex items-center justify-center mb-3`}>
                  <feature.icon className={`w-6 h-6 ${feature.iconColor}`} />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="relative">
                <CardDescription className="text-sm leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Role Cards */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              為每個角色設計
            </h2>
            <p className="text-muted-foreground">
              學生、教師、管理員，都能找到適合的工具
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="border-border/50 bg-gradient-to-br from-blue-50 to-background dark:from-blue-950/20">
              <CardHeader>
                <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-2">
                  <GraduationCap className="w-5 h-5 text-blue-600" />
                </div>
                <CardTitle className="text-base">學生</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    AI 對話學習與課業輔導
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    建立與使用學科智能體
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    AI 圖像創作工具
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-gradient-to-br from-emerald-50 to-background dark:from-emerald-950/20">
              <CardHeader>
                <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mb-2">
                  <BookOpen className="w-5 h-5 text-emerald-600" />
                </div>
                <CardTitle className="text-base">教師</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    建立課程專屬智能體
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    查看學生學習歷程
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    管理班級智能體權限
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-gradient-to-br from-violet-50 to-background dark:from-violet-950/20">
              <CardHeader>
                <div className="w-10 h-10 rounded-lg bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center mb-2">
                  <Shield className="w-5 h-5 text-violet-600" />
                </div>
                <CardTitle className="text-base">管理員</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-violet-500" />
                    帳號與權限管理
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-violet-500" />
                    使用量統計與報表
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-violet-500" />
                    系統設定與安全管理
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-muted/30">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-semibold text-foreground">LearnAI</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link href="/privacy" className="hover:text-foreground transition-colors">隱私政策</Link>
              <Link href="/terms" className="hover:text-foreground transition-colors">使用條款</Link>
              <Link href="/help" className="hover:text-foreground transition-colors">幫助中心</Link>
              <Link href="/contact" className="hover:text-foreground transition-colors">聯絡我們</Link>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2026 LearnAI. 版權所有。
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
