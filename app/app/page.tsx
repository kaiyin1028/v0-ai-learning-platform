"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sparkles,
  Send,
  Brain,
  Paperclip,
  RotateCcw,
  Copy,
  ThumbsUp,
  ThumbsDown,
  ChevronDown,
  Loader2,
} from "lucide-react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  model?: string
  timestamp: Date
}

const sampleMessages: Message[] = [
  {
    id: "1",
    role: "assistant",
    content:
      "你好！我是你的 AI 學習助手。你可以向我提問任何學科問題，我會盡力用清楚易懂的方式解答。你也可以切換不同的 AI 模型，或是讓我幫你建立專屬的學習智能體。\n\n今天想學什麼呢？",
    model: "LearnAI Pro",
    timestamp: new Date(),
  },
]

const models = [
  { value: "learnai-pro", label: "LearnAI Pro" },
  { value: "learnai-fast", label: "LearnAI Fast" },
  { value: "gpt-4", label: "GPT-4" },
  { value: "claude", label: "Claude 3.5" },
]

const suggestions = [
  "解釋機器學習的反向傳播",
  "幫我寫一段 Python 快速排序",
  "經濟學的供需曲線是什麼？",
  "英文作文：科技的影響",
]

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>(sampleMessages)
  const [input, setInput] = useState("")
  const [model, setModel] = useState("learnai-pro")
  const [isLoading, setIsLoading] = useState(false)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSend = () => {
    if (!input.trim()) return

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "這是一個很好的問題！讓我用簡單的方式為你解釋...\n\n" +
          "基本概念是這樣的：想像你在一個複雜的迷宮中尋找出口。每一步你都需要判斷哪個方向更接近出口。在機器學習中，這個「判斷方向」的過程就是透過數學計算來完成的。\n\n" +
          "具體來說：\n1. **前向傳播**：資料從輸入層流向輸出層，得到預測結果\n2. **計算誤差**：比較預測和實際答案的差距\n3. **反向傳播**：將誤差從輸出層傳回每一層，計算每個參數的影響\n4. **更新參數**：根據影響程度調整參數，讓預測更準確\n\n需要我用程式碼示範嗎？或是想了解更深入的數學原理？",
        model: models.find((m) => m.value === model)?.label || "LearnAI Pro",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiMsg])
      setIsLoading(false)
    }, 1500)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleSuggestion = (text: string) => {
    setInput(text)
    inputRef.current?.focus()
  }

  return (
    <div className="flex h-full flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between border-b border-border px-4 py-2">
        <div className="flex items-center gap-3">
          <Select value={model} onValueChange={setModel}>
            <SelectTrigger className="h-9 w-[160px] text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {models.map((m) => (
                <SelectItem key={m.value} value={m.value}>
                  {m.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="gap-1.5 text-xs" asChild>
            <a href="/app/memory">
              <Brain className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">記憶管理</span>
            </a>
          </Button>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1">
        <div className="mx-auto max-w-3xl px-4 py-6">
          {messages.length === 1 && (
            <div className="mb-8">
              {/* Suggestions */}
              <div className="mt-6 grid gap-2 sm:grid-cols-2">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => handleSuggestion(s)}
                    className="rounded-xl border border-border bg-card px-4 py-3 text-left text-sm text-card-foreground transition-colors hover:border-primary/30 hover:bg-secondary"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col gap-6">
            {messages.map((msg) => (
              <div key={msg.id}>
                {msg.role === "assistant" ? (
                  <div className="flex gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary">
                      <Sparkles className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <div className="flex-1">
                      {msg.model && (
                        <Badge variant="secondary" className="mb-2 text-xs">
                          {msg.model}
                        </Badge>
                      )}
                      <div className="prose prose-sm max-w-none text-foreground">
                        {msg.content.split("\n").map((line, i) => (
                          <p key={i} className={line === "" ? "h-2" : "mb-1 leading-relaxed"}>
                            {line}
                          </p>
                        ))}
                      </div>
                      {/* Actions */}
                      <div className="mt-3 flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground" aria-label="Copy">
                          <Copy className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground" aria-label="Like">
                          <ThumbsUp className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground" aria-label="Dislike">
                          <ThumbsDown className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground" aria-label="Regenerate">
                          <RotateCcw className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-end">
                    <div className="max-w-[80%] rounded-2xl rounded-tr-md bg-primary px-4 py-3">
                      <p className="text-sm leading-relaxed text-primary-foreground">
                        {msg.content}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary">
                  <Sparkles className="h-4 w-4 text-primary-foreground" />
                </div>
                <div className="flex items-center gap-2 rounded-2xl rounded-tl-md bg-secondary px-4 py-3">
                  <Loader2 className="h-4 w-4 animate-spin text-primary" />
                  <span className="text-sm text-muted-foreground">
                    思考中...
                  </span>
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>
        </div>
      </ScrollArea>

      {/* Input area */}
      <div className="border-t border-border bg-background p-4">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-end gap-2 rounded-2xl border border-border bg-card p-2 shadow-sm focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/10">
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 shrink-0 text-muted-foreground"
              aria-label="Attach file"
            >
              <Paperclip className="h-4 w-4" />
            </Button>
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="輸入你的問題..."
              className="max-h-32 min-h-[44px] flex-1 resize-none bg-transparent py-2.5 text-base text-foreground outline-none placeholder:text-muted-foreground"
              rows={1}
            />
            <Button
              size="icon"
              className="h-9 w-9 shrink-0"
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              aria-label="Send message"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="mt-2 text-center text-xs text-muted-foreground">
            AI 可能會產生不準確的資訊，重要內容請自行查證
          </p>
        </div>
      </div>
    </div>
  )
}
