import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  MessageSquare,
  Bot,
  Image,
  Sparkles,
} from "lucide-react"

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute right-0 top-1/3 h-[400px] w-[400px] rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-20 pt-16 lg:px-8 lg:pb-28 lg:pt-24">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <Badge
            variant="secondary"
            className="mb-6 gap-1.5 px-3 py-1.5 text-sm font-medium"
          >
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            全新 AI 學習體驗，現已開放
          </Badge>

          {/* Title */}
          <h1 className="text-balance text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
            用 AI 解鎖你的
            <span className="text-primary">無限學習潛能</span>
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
            對話式學習、自訂專業智能體、AI 圖像生成與編輯 ——
            一站式平台，讓每位學生都能享受個人化的 AI 學伴。
          </p>

          {/* CTA */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/app">
              <Button size="lg" className="min-h-[48px] gap-2 px-8 text-base">
                免費開始使用
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <a href="#features">
              <Button
                variant="outline"
                size="lg"
                className="min-h-[48px] px-8 text-base"
              >
                了解更多
              </Button>
            </a>
          </div>

          {/* Stat chips */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                <MessageSquare className="h-4 w-4 text-primary" />
              </div>
              <span>50 萬+ 對話次數</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/10">
                <Bot className="h-4 w-4 text-accent" />
              </div>
              <span>2,000+ 智能體</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                <Image className="h-4 w-4 text-primary" />
              </div>
              <span>100 萬+ 生成圖片</span>
            </div>
          </div>
        </div>

        {/* Hero Product Preview */}
        <div className="mx-auto mt-16 max-w-5xl">
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-xl shadow-primary/5">
            {/* Window bar */}
            <div className="flex items-center gap-2 border-b border-border bg-secondary/50 px-4 py-3">
              <div className="h-3 w-3 rounded-full bg-destructive/40" />
              <div className="h-3 w-3 rounded-full bg-chart-4/40" />
              <div className="h-3 w-3 rounded-full bg-accent/40" />
              <div className="ml-4 flex-1 rounded-md bg-background/60 px-3 py-1 text-center text-xs text-muted-foreground">
                app.learnai.com
              </div>
            </div>
            {/* Chat preview */}
            <div className="flex flex-col gap-4 p-6 md:p-8">
              {/* AI message */}
              <div className="flex gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary">
                  <Sparkles className="h-4 w-4 text-primary-foreground" />
                </div>
                <div className="max-w-md rounded-2xl rounded-tl-md bg-secondary px-4 py-3">
                  <p className="text-sm leading-relaxed text-secondary-foreground">
                    {"你好！我是你的 AI 學習助手。你可以問我任何學科問題，或者讓我幫你建立一個專屬的學習智能體。今天想學什麼呢？"}
                  </p>
                </div>
              </div>
              {/* User message */}
              <div className="flex justify-end gap-3">
                <div className="max-w-md rounded-2xl rounded-tr-md bg-primary px-4 py-3">
                  <p className="text-sm leading-relaxed text-primary-foreground">
                    {"幫我解釋一下機器學習中的梯度下降法，用簡單的比喻"}
                  </p>
                </div>
              </div>
              {/* AI response */}
              <div className="flex gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary">
                  <Sparkles className="h-4 w-4 text-primary-foreground" />
                </div>
                <div className="max-w-lg rounded-2xl rounded-tl-md bg-secondary px-4 py-3">
                  <p className="text-sm leading-relaxed text-secondary-foreground">
                    {"想像你在一座大霧瀰漫的山上，想走到最低的山谷。你看不到全貌，只能感覺腳下哪個方向是下坡。每一步你都朝最陡的下坡方向走一小步 —— 這就是梯度下降！「梯度」就是坡度，「下降」就是往低處走。"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
