import { Star } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const stats = [
  { value: "50,000+", label: "活躍學生" },
  { value: "200+", label: "合作學校" },
  { value: "500 萬+", label: "對話次數" },
  { value: "4.9/5", label: "使用者評分" },
]

const testimonials = [
  {
    name: "陳同學",
    role: "台大資工系",
    content:
      "LearnAI 的程式碼智能體幫我理解了很多演算法概念，比看教科書有效率太多了。最棒的是它會記住我之前學過什麼，不用重複解釋。",
    avatar: "陳",
  },
  {
    name: "林同學",
    role: "成大醫學系",
    content:
      "醫學相關的智能體非常專業，能用圖解解釋複雜的病理機制。期末考前靠它複習省了很多時間。",
    avatar: "林",
  },
  {
    name: "王老師",
    role: "北一女中教師",
    content:
      "我推薦學生使用 LearnAI 做課後學習。學校方案很划算，後台也能追蹤學生使用狀況，非常適合教學輔助。",
    avatar: "王",
  },
]

const logos = [
  "台灣大學",
  "成功大學",
  "清華大學",
  "交通大學",
  "政治大學",
  "師範大學",
]

export function SocialProof() {
  return (
    <section className="bg-secondary/30 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold text-foreground md:text-4xl">
                {stat.value}
              </div>
              <div className="mt-1 text-sm text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Logos */}
        <div className="mt-16">
          <p className="text-center text-sm font-medium uppercase tracking-widest text-muted-foreground">
            受到各大學校信賴
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-8">
            {logos.map((logo) => (
              <div
                key={logo}
                className="rounded-lg bg-card px-5 py-2.5 text-sm font-semibold text-muted-foreground shadow-sm"
              >
                {logo}
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-chart-4 text-chart-4"
                  />
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-card-foreground">
                {`"${testimonial.content}"`}
              </p>
              <div className="mt-4 flex items-center gap-3">
                <Avatar className="h-9 w-9">
                  <AvatarFallback className="bg-primary/10 text-sm text-primary">
                    {testimonial.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-sm font-medium text-card-foreground">
                    {testimonial.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
