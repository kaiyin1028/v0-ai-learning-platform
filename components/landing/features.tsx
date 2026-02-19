import {
  MessageSquare,
  Bot,
  ImageIcon,
  Wand2,
  Brain,
  History,
  Store,
  Palette,
} from "lucide-react"

const features = [
  {
    icon: MessageSquare,
    title: "AI 對話學習",
    description:
      "與多種 AI 模型即時對話，支援學科問答、寫作輔助、邏輯推理。對話內容自動儲存，隨時回顧。",
    color: "text-primary" as const,
    bgColor: "bg-primary/10" as const,
  },
  {
    icon: Brain,
    title: "學習記憶管理",
    description:
      "AI 會記住你的學習歷程與偏好，提供更個人化的回答。支援查看、分群、開關與刪除記憶。",
    color: "text-accent" as const,
    bgColor: "bg-accent/10" as const,
  },
  {
    icon: Bot,
    title: "AIA 智能體建立器",
    description:
      "自訂專業 AI 智能體：設定領域知識、人格、工具與指令，打造法律、醫學、程式等領域的專屬助手。",
    color: "text-primary" as const,
    bgColor: "bg-primary/10" as const,
  },
  {
    icon: Store,
    title: "智能體市集",
    description:
      "瀏覽社群分享的智能體，一鍵收藏或複製。探索數千個由學生與教師打造的高品質學習助手。",
    color: "text-accent" as const,
    bgColor: "bg-accent/10" as const,
  },
  {
    icon: ImageIcon,
    title: "AI 圖片生成",
    description:
      "輸入描述即可生成高品質圖片，支援多種風格選擇。適用於報告插圖、簡報素材、創意作品。",
    color: "text-primary" as const,
    bgColor: "bg-primary/10" as const,
  },
  {
    icon: Wand2,
    title: "圖片變形 / 編輯",
    description:
      "重繪、局部修改、風格化、擴圖、去背 —— 完整的 AI 圖片編輯工作流，讓創作更有效率。",
    color: "text-accent" as const,
    bgColor: "bg-accent/10" as const,
  },
]

export function Features() {
  return (
    <section id="features" className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            功能特色
          </p>
          <h2 className="mt-3 text-balance text-3xl font-bold text-foreground md:text-4xl">
            一個平台，全方位 AI 學習工具
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            從對話問答到圖像創作，LearnAI 整合你所有需要的 AI 能力
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5"
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl ${feature.bgColor}`}
              >
                <feature.icon className={`h-6 w-6 ${feature.color}`} />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-card-foreground">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
