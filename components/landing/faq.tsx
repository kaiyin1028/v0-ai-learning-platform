import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "LearnAI 是免費的嗎？",
    answer:
      "是的！LearnAI 提供永久免費方案，每日可進行 30 次 AI 對話、每月生成 10 張圖片，並可瀏覽智能體市集。如果需要更多進階功能，可升級至學生專業版（NT$149/月）。",
  },
  {
    question: "AI 會記住我的學習內容嗎？是否安全？",
    answer:
      "LearnAI 的記憶功能會儲存你的學習偏好與歷程，讓 AI 能提供更個人化的回答。你可以隨時在「記憶管理」頁面查看、關閉或刪除特定記憶。所有資料皆加密儲存，絕不會分享給第三方。",
  },
  {
    question: "什麼是 AIA 智能體？跟一般對話有什麼不同？",
    answer:
      "智能體是你自訂的專業 AI 助手。你可以設定它的知識領域、人格特質、工具使用權限等。例如建立一個「法律助手」，它會用法律思維回答問題。相較於一般對話，智能體更專精、更準確。",
  },
  {
    question: "生成的圖片版權歸誰？可以商用嗎？",
    answer:
      "使用 LearnAI 生成的圖片，個人學習用途不受限制。Pro 方案用戶可將圖片用於報告、簡報等學術用途。商業使用請參考我們的使用條款或聯絡我們。",
  },
  {
    question: "學校方案包含什麼？如何申請？",
    answer:
      "學校方案包含 Pro 方案所有功能，另有管理者儀表板、批量帳號管理、數據分析報表、專屬技術支援與資料在地化儲存。歡迎透過「聯絡銷售團隊」按鈕與我們洽詢，我們會依照學校規模提供優惠報價。",
  },
  {
    question: "支援哪些語言？",
    answer:
      "LearnAI 支援繁體中文、簡體中文、英文、日文、韓文等多種語言的對話。AI 圖片生成也支援多語言提示詞。介面目前以繁體中文為主，英文介面正在開發中。",
  },
]

export function FAQ() {
  return (
    <section id="faq" className="bg-secondary/30 py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-4 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            常見問題
          </p>
          <h2 className="mt-3 text-balance text-3xl font-bold text-foreground md:text-4xl">
            有什麼想問的？
          </h2>
        </div>

        <Accordion type="single" collapsible className="mt-12">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`faq-${index}`}>
              <AccordionTrigger className="text-left text-base font-medium">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
