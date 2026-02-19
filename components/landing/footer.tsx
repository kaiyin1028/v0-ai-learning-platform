import Link from "next/link"
import { Sparkles } from "lucide-react"

const footerLinks = {
  product: {
    title: "產品",
    links: [
      { label: "AI 對話", href: "#features" },
      { label: "智能體建立器", href: "#features" },
      { label: "圖片生成", href: "#features" },
      { label: "圖片編輯", href: "#features" },
      { label: "方案價格", href: "#pricing" },
    ],
  },
  resources: {
    title: "資源",
    links: [
      { label: "使用指南", href: "#" },
      { label: "API 文件", href: "#" },
      { label: "教師資源", href: "#" },
      { label: "部落格", href: "#" },
      { label: "更新紀錄", href: "#" },
    ],
  },
  company: {
    title: "公司",
    links: [
      { label: "關於我們", href: "#" },
      { label: "聯絡我們", href: "#" },
      { label: "工作機會", href: "#" },
      { label: "合作夥伴", href: "#" },
    ],
  },
  legal: {
    title: "法律",
    links: [
      { label: "隱私權政策", href: "#" },
      { label: "服務條款", href: "#" },
      { label: "資料安全", href: "#" },
      { label: "Cookie 政策", href: "#" },
    ],
  },
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Sparkles className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold text-foreground">
                LearnAI
              </span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              以 AI 驅動的全方位學習平台，讓每位學生都能享受個人化的智慧學習體驗。
            </p>
          </div>

          {/* Links */}
          {Object.values(footerLinks).map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-foreground">
                {section.title}
              </h3>
              <ul className="mt-3 flex flex-col gap-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            {"© 2026 LearnAI. All rights reserved."}
          </p>
          <div className="flex gap-4">
            <a
              href="#"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Twitter"
            >
              Twitter
            </a>
            <a
              href="#"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              aria-label="GitHub"
            >
              GitHub
            </a>
            <a
              href="#"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Discord"
            >
              Discord
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
