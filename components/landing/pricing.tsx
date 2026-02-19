import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check } from "lucide-react"

const plans = [
  {
    name: "Free",
    nameTc: "免費方案",
    price: "NT$0",
    period: "永久免費",
    description: "適合剛開始探索 AI 學習的學生",
    features: [
      "每日 30 次對話",
      "使用基礎 AI 模型",
      "瀏覽智能體市集",
      "每月 10 張圖片生成",
      "基本學習記憶",
    ],
    cta: "免費開始",
    variant: "outline" as const,
    popular: false,
  },
  {
    name: "Pro",
    nameTc: "學生專業版",
    price: "NT$149",
    period: "/月",
    description: "進階功能，滿足深度學習需求",
    features: [
      "無限對話次數",
      "使用所有進階 AI 模型",
      "建立最多 20 個智能體",
      "每月 200 張圖片生成",
      "完整圖片編輯工具",
      "進階記憶與知識庫",
      "優先回應速度",
    ],
    cta: "開始 7 天免費試用",
    variant: "default" as const,
    popular: true,
  },
  {
    name: "School",
    nameTc: "學校方案",
    price: "聯絡我們",
    period: "",
    description: "為教育機構打造的團隊方案",
    features: [
      "Pro 方案所有功能",
      "管理者後台儀表板",
      "學生帳號批量管理",
      "使用數據分析報表",
      "專屬技術支援",
      "自訂品牌設定",
      "資料在地化儲存",
    ],
    cta: "聯絡銷售團隊",
    variant: "outline" as const,
    popular: false,
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            方案價格
          </p>
          <h2 className="mt-3 text-balance text-3xl font-bold text-foreground md:text-4xl">
            為學生量身打造的價格
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            從免費開始，按需升級。學生專屬優惠價，讓每個人都能使用 AI 學習
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl border bg-card p-6 transition-all ${
                plan.popular
                  ? "border-primary shadow-lg shadow-primary/10"
                  : "border-border"
              }`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                  最受歡迎
                </Badge>
              )}
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  {plan.nameTc}
                </h3>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-card-foreground">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-sm text-muted-foreground">
                      {plan.period}
                    </span>
                  )}
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  {plan.description}
                </p>
              </div>

              <ul className="mt-6 flex flex-col gap-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span className="text-sm text-card-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <Link href="/app">
                  <Button
                    variant={plan.variant}
                    className={`min-h-[44px] w-full ${
                      plan.popular ? "" : ""
                    }`}
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
