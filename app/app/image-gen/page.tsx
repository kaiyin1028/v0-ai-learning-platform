"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ImageIcon,
  Sparkles,
  Download,
  Share2,
  Heart,
  Trash2,
  Loader2,
  Grid3X3,
  LayoutGrid,
  Clock,
  Wand2,
  RotateCcw,
} from "lucide-react"

interface GeneratedImage {
  id: string
  prompt: string
  style: string
  createdAt: string
  ratio: string
}

const sampleImages: GeneratedImage[] = [
  {
    id: "1",
    prompt: "一座未來主義的綠色城市鳥瞰圖，充滿植物與玻璃建築",
    style: "寫實風格",
    createdAt: "2 分鐘前",
    ratio: "1:1",
  },
  {
    id: "2",
    prompt: "水彩風格的台灣九份老街",
    style: "水彩風格",
    createdAt: "15 分鐘前",
    ratio: "16:9",
  },
  {
    id: "3",
    prompt: "DNA 雙螺旋結構的科技感 3D 渲染",
    style: "3D 渲染",
    createdAt: "1 小時前",
    ratio: "1:1",
  },
  {
    id: "4",
    prompt: "極簡主義風格的書房空間設計",
    style: "極簡風格",
    createdAt: "2 小時前",
    ratio: "4:3",
  },
  {
    id: "5",
    prompt: "動漫風格的女孩在櫻花樹下讀書",
    style: "動漫風格",
    createdAt: "3 小時前",
    ratio: "9:16",
  },
  {
    id: "6",
    prompt: "油畫風格的日月潭日出",
    style: "油畫風格",
    createdAt: "昨天",
    ratio: "16:9",
  },
]

const styles = [
  "寫實風格",
  "水彩風格",
  "3D 渲染",
  "極簡風格",
  "動漫風格",
  "油畫風格",
  "像素風格",
  "素描風格",
]

const ratios = [
  { value: "1:1", label: "1:1 正方形" },
  { value: "16:9", label: "16:9 橫幅" },
  { value: "9:16", label: "9:16 直幅" },
  { value: "4:3", label: "4:3 標準" },
  { value: "3:2", label: "3:2 照片" },
]

export default function ImageGenPage() {
  const [prompt, setPrompt] = useState("")
  const [style, setStyle] = useState("寫實風格")
  const [ratio, setRatio] = useState("1:1")
  const [quality, setQuality] = useState([75])
  const [isGenerating, setIsGenerating] = useState(false)
  const [images, setImages] = useState<GeneratedImage[]>(sampleImages)
  const [activeTab, setActiveTab] = useState("generate")

  const handleGenerate = () => {
    if (!prompt.trim()) return
    setIsGenerating(true)
    setTimeout(() => {
      const newImage: GeneratedImage = {
        id: Date.now().toString(),
        prompt: prompt.trim(),
        style,
        createdAt: "剛剛",
        ratio,
      }
      setImages((prev) => [newImage, ...prev])
      setIsGenerating(false)
      setPrompt("")
    }, 2000)
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 lg:py-8">
      {/* Header */}
      <div>
        <h1 className="flex items-center gap-2 text-2xl font-bold text-foreground">
          <ImageIcon className="h-6 w-6 text-primary" />
          AI 圖片生成
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          輸入描述，AI 為你生成高品質圖片
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
        <TabsList>
          <TabsTrigger value="generate" className="gap-1.5">
            <Sparkles className="h-3.5 w-3.5" />
            生成
          </TabsTrigger>
          <TabsTrigger value="gallery" className="gap-1.5">
            <LayoutGrid className="h-3.5 w-3.5" />
            圖庫
            <Badge variant="secondary" className="ml-1 text-xs">
              {images.length}
            </Badge>
          </TabsTrigger>
        </TabsList>

        {/* Generate Tab */}
        <TabsContent value="generate" className="mt-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
            {/* Main input & preview */}
            <div className="flex flex-col gap-6">
              {/* Prompt input */}
              <div className="rounded-2xl border border-border bg-card p-6">
                <Label htmlFor="prompt" className="text-base font-semibold">
                  描述你想要的圖片
                </Label>
                <Textarea
                  id="prompt"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="例：一座未來城市的鳥瞰圖，充滿綠色植物與玻璃建築，晴天，高解析度..."
                  className="mt-3"
                  rows={4}
                />
                <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex flex-wrap gap-2">
                    {["報告插圖", "簡報背景", "概念圖", "人物角色"].map(
                      (tag) => (
                        <button
                          key={tag}
                          onClick={() =>
                            setPrompt((prev) =>
                              prev ? `${prev}, ${tag}` : tag
                            )
                          }
                          className="rounded-full border border-border bg-secondary px-3 py-1 text-xs text-secondary-foreground transition-colors hover:border-primary/30"
                        >
                          + {tag}
                        </button>
                      )
                    )}
                  </div>
                  <Button
                    onClick={handleGenerate}
                    disabled={!prompt.trim() || isGenerating}
                    className="min-h-[44px] gap-2"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        生成中...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4" />
                        生成圖片
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {/* Preview / Result area */}
              <div className="rounded-2xl border border-border bg-card">
                {isGenerating ? (
                  <div className="flex aspect-square max-h-[500px] flex-col items-center justify-center gap-4 p-8">
                    <div className="relative">
                      <div className="h-16 w-16 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-foreground">
                        AI 正在創作中...
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        通常需要 10-30 秒
                      </p>
                    </div>
                  </div>
                ) : images.length > 0 ? (
                  <div>
                    <div className="flex aspect-square max-h-[500px] items-center justify-center bg-secondary/30 p-8">
                      <div className="flex flex-col items-center gap-3 text-muted-foreground">
                        <ImageIcon className="h-16 w-16 opacity-30" />
                        <p className="text-sm">最新生成圖片預覽</p>
                        <p className="text-xs text-muted-foreground/60">
                          {images[0].prompt}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between border-t border-border px-5 py-3">
                      <div className="flex gap-1.5">
                        <Badge variant="secondary" className="text-xs">
                          {images[0].style}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {images[0].ratio}
                        </Badge>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Download">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Share">
                          <Share2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Edit">
                          <Wand2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex aspect-square max-h-[500px] flex-col items-center justify-center p-8 text-center">
                    <ImageIcon className="h-16 w-16 text-muted-foreground/20" />
                    <p className="mt-4 text-sm font-medium text-muted-foreground">
                      輸入描述並點擊生成
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground/60">
                      你的 AI 圖片將在這裡顯示
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Settings sidebar */}
            <div className="flex flex-col gap-4">
              {/* Style */}
              <div className="rounded-2xl border border-border bg-card p-5">
                <Label className="text-sm font-semibold">風格選擇</Label>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {styles.map((s) => (
                    <button
                      key={s}
                      onClick={() => setStyle(s)}
                      className={`rounded-lg border px-3 py-2 text-xs font-medium transition-colors ${
                        style === s
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border text-muted-foreground hover:border-primary/30"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Ratio */}
              <div className="rounded-2xl border border-border bg-card p-5">
                <Label className="text-sm font-semibold">畫面比例</Label>
                <Select value={ratio} onValueChange={setRatio}>
                  <SelectTrigger className="mt-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ratios.map((r) => (
                      <SelectItem key={r.value} value={r.value}>
                        {r.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Quality */}
              <div className="rounded-2xl border border-border bg-card p-5">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-semibold">品質</Label>
                  <span className="text-sm text-muted-foreground">
                    {quality[0]}%
                  </span>
                </div>
                <Slider
                  value={quality}
                  onValueChange={setQuality}
                  max={100}
                  min={25}
                  step={25}
                  className="mt-3"
                />
                <div className="mt-1.5 flex justify-between text-xs text-muted-foreground">
                  <span>快速</span>
                  <span>高品質</span>
                </div>
              </div>

              {/* Quota */}
              <div className="rounded-xl border border-border bg-secondary/50 p-4">
                <p className="text-xs font-medium text-muted-foreground">
                  本月剩餘額度
                </p>
                <p className="mt-1 text-lg font-bold text-foreground">
                  7 / 10 張
                </p>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-border">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: "70%" }}
                  />
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  升級 Pro 方案取得每月 200 張額度
                </p>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Gallery Tab */}
        <TabsContent value="gallery" className="mt-6">
          {images.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-16">
              <ImageIcon className="h-10 w-10 text-muted-foreground/30" />
              <p className="mt-3 text-sm font-medium text-muted-foreground">
                尚無生成圖片
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-4"
                onClick={() => setActiveTab("generate")}
              >
                開始生成
              </Button>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {images.map((image) => (
                <div
                  key={image.id}
                  className="group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:shadow-md"
                >
                  <div className="flex aspect-square items-center justify-center bg-secondary/30">
                    <div className="flex flex-col items-center gap-2 p-4 text-center text-muted-foreground">
                      <ImageIcon className="h-8 w-8 opacity-30" />
                      <p className="line-clamp-2 text-xs">{image.prompt}</p>
                    </div>
                  </div>
                  <div className="p-3">
                    <div className="flex items-center gap-1.5">
                      <Badge variant="secondary" className="text-xs">
                        {image.style}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {image.ratio}
                      </Badge>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {image.createdAt}
                      </span>
                      <div className="flex gap-0.5">
                        <Button variant="ghost" size="icon" className="h-7 w-7" aria-label="Download">
                          <Download className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7" aria-label="Delete">
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
