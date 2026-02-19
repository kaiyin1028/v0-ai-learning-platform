import { UserPlus, MessageSquare, Bot, Sparkles } from "lucide-react"

const steps = [
  {
    step: "01",
    icon: UserPlus,
    title: "免費註冊",
    description: "用信箱或社群帳號快速註冊，30 秒內完成，無需信用卡。",
  },
  {
    step: "02",
    icon: MessageSquare,
    title: "開始對話學習",
    description: "直接向 AI 提問任何學科問題，AI 會記住你的學習風格並給出個人化回答。",
  },
  {
    step: "03",
    icon: Bot,
    title: "建立或選擇智能體",
    description: "從市集挑選專業智能體，或自己建立一個 —— 設定知識領域、指令與工具。",
  },
  {
    step: "04",
    icon: Sparkles,
    title: "探索 AI 創作",
    description: "使用 AI 生成圖片或編輯現有圖片，為你的報告、簡報、作品集增添專業素材。",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-secondary/30 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            使用流程
          </p>
          <h2 className="mt-3 text-balance text-3xl font-bold text-foreground md:text-4xl">
            4 步開始你的 AI 學習旅程
          </h2>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((item, index) => (
            <div key={item.step} className="relative flex flex-col items-center text-center">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="absolute left-1/2 top-10 hidden h-px w-full bg-border lg:block" />
              )}
              {/* Step circle */}
              <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-2xl border-2 border-primary/20 bg-card shadow-sm">
                <item.icon className="h-8 w-8 text-primary" />
              </div>
              <span className="mt-4 text-xs font-bold uppercase tracking-widest text-primary">
                Step {item.step}
              </span>
              <h3 className="mt-2 text-lg font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
