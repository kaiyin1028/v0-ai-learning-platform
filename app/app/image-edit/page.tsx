"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import {
  Wand2,
  Upload,
  ImageIcon,
  Paintbrush,
  Scissors,
  Expand,
  Eraser,
  Palette,
  RotateCcw,
  Download,
  ZoomIn,
  ZoomOut,
  Undo2,
  Redo2,
  Layers,
  Move,
  MousePointer2,
  Square,
  PenTool,
  Loader2,
  ArrowRight,
} from "lucide-react"

const tools = [
  {
    id: "repaint",
    name: "局部重繪",
    icon: Paintbrush,
    description: "選取區域並重新生成",
  },
  {
    id: "style",
    name: "風格轉換",
    icon: Palette,
    description: "將圖片轉為不同風格",
  },
  {
    id: "expand",
    name: "擴圖",
    icon: Expand,
    description: "向外延伸圖片邊界",
  },
  {
    id: "remove-bg",
    name: "去背",
    icon: Eraser,
    description: "移除圖片背景",
  },
  {
    id: "upscale",
    name: "超解析度",
    icon: ZoomIn,
    description: "放大圖片並增強細節",
  },
  {
    id: "erase",
    name: "物件移除",
    icon: Scissors,
    description: "塗抹選取不需要的物件",
  },
]

const styleOptions = [
  "水彩",
  "油畫",
  "素描",
  "動漫",
  "賽博龐克",
  "蒸汽龐克",
  "印象派",
  "波普藝術",
]

export default function ImageEditPage() {
  const [selectedTool, setSelectedTool] = useState<string | null>(null)
  const [hasImage, setHasImage] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [editPrompt, setEditPrompt] = useState("")
  const [brushSize, setBrushSize] = useState([30])
  const [selectedStyle, setSelectedStyle] = useState("水彩")

  const handleUpload = () => {
    setHasImage(true)
    setSelectedTool(null)
  }

  const handleProcess = () => {
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
    }, 2000)
  }

  return (
    <div className="flex h-full flex-col lg:flex-row">
      {/* Tool sidebar */}
      <div className="flex shrink-0 border-b border-border bg-card lg:w-72 lg:flex-col lg:border-b-0 lg:border-r">
        {/* Tool header */}
        <div className="hidden border-b border-border px-5 py-4 lg:block">
          <h1 className="flex items-center gap-2 text-lg font-bold text-foreground">
            <Wand2 className="h-5 w-5 text-primary" />
            圖片編輯
          </h1>
          <p className="mt-1 text-xs text-muted-foreground">
            AI 驅動的圖片編輯工具
          </p>
        </div>

        {/* Mobile: horizontal scroll tools */}
        <div className="flex gap-1 overflow-x-auto p-2 lg:hidden">
          <div className="flex items-center gap-1 px-2 lg:hidden">
            <Wand2 className="h-4 w-4 text-primary" />
            <span className="text-sm font-bold text-foreground">編輯</span>
          </div>
          {tools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => setSelectedTool(tool.id)}
              className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
                selectedTool === tool.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground"
              }`}
            >
              <tool.icon className="h-3.5 w-3.5" />
              {tool.name}
            </button>
          ))}
        </div>

        {/* Desktop: vertical tool list */}
        <div className="hidden flex-1 flex-col gap-1 overflow-y-auto p-3 lg:flex">
          {tools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => setSelectedTool(tool.id)}
              className={`flex items-start gap-3 rounded-xl p-3 text-left transition-all ${
                selectedTool === tool.id
                  ? "bg-primary/10 ring-1 ring-primary/30"
                  : "hover:bg-secondary"
              }`}
            >
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                  selectedTool === tool.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground"
                }`}
              >
                <tool.icon className="h-4 w-4" />
              </div>
              <div>
                <p
                  className={`text-sm font-medium ${
                    selectedTool === tool.id
                      ? "text-primary"
                      : "text-card-foreground"
                  }`}
                >
                  {tool.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {tool.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main canvas area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Toolbar */}
        <div className="flex items-center justify-between border-b border-border bg-background px-4 py-2">
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Undo">
              <Undo2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Redo">
              <Redo2 className="h-4 w-4" />
            </Button>
            <div className="mx-2 h-5 w-px bg-border" />
            <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Zoom in">
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Zoom out">
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="ml-2 text-xs text-muted-foreground">100%</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Reset">
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button size="sm" className="gap-1.5">
              <Download className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">下載</span>
            </Button>
          </div>
        </div>

        {/* Canvas */}
        <div className="flex flex-1 items-center justify-center bg-secondary/20 p-4">
          {!hasImage ? (
            <div className="flex flex-col items-center gap-4">
              <button
                onClick={handleUpload}
                className="flex h-64 w-80 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-card transition-colors hover:border-primary/30 hover:bg-secondary/50 sm:h-80 sm:w-[400px]"
              >
                <Upload className="h-12 w-12 text-muted-foreground/30" />
                <p className="mt-4 text-sm font-medium text-muted-foreground">
                  上傳圖片以開始編輯
                </p>
                <p className="mt-1 text-xs text-muted-foreground/60">
                  支援 PNG、JPG、WebP（最大 10MB）
                </p>
                <Button variant="outline" size="sm" className="mt-4">
                  選擇檔案
                </Button>
              </button>
              <p className="text-xs text-muted-foreground">
                或從「圖片生成」頁面直接送來編輯
              </p>
            </div>
          ) : (
            <div className="relative flex aspect-square max-h-full max-w-full items-center justify-center overflow-hidden rounded-xl border border-border bg-card shadow-sm sm:aspect-auto sm:h-[500px] sm:w-[600px]">
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <ImageIcon className="h-16 w-16 opacity-20" />
                <p className="text-sm">圖片預覽區域</p>
                {selectedTool && (
                  <Badge variant="secondary" className="mt-2">
                    {tools.find((t) => t.id === selectedTool)?.name} 模式
                  </Badge>
                )}
              </div>
              {/* Canvas overlay for tool indication */}
              {selectedTool === "repaint" && (
                <div className="absolute inset-0 flex items-center justify-center bg-foreground/5">
                  <div className="rounded-full border-2 border-dashed border-primary/50 p-12">
                    <Paintbrush className="h-8 w-8 text-primary/50" />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Right panel - tool settings */}
      {selectedTool && hasImage && (
        <div className="shrink-0 border-t border-border bg-card p-4 lg:w-72 lg:border-l lg:border-t-0">
          <h3 className="text-sm font-semibold text-card-foreground">
            {tools.find((t) => t.id === selectedTool)?.name} 設定
          </h3>

          <div className="mt-4 flex flex-col gap-4">
            {/* Repaint / Erase: brush size + prompt */}
            {(selectedTool === "repaint" || selectedTool === "erase") && (
              <>
                <div>
                  <div className="flex items-center justify-between">
                    <Label className="text-xs">筆刷大小</Label>
                    <span className="text-xs text-muted-foreground">
                      {brushSize[0]}px
                    </span>
                  </div>
                  <Slider
                    value={brushSize}
                    onValueChange={setBrushSize}
                    min={5}
                    max={100}
                    step={5}
                    className="mt-2"
                  />
                </div>
                {selectedTool === "repaint" && (
                  <div>
                    <Label className="text-xs">重繪描述</Label>
                    <Textarea
                      value={editPrompt}
                      onChange={(e) => setEditPrompt(e.target.value)}
                      placeholder="描述你想要的修改效果..."
                      className="mt-1.5"
                      rows={3}
                    />
                  </div>
                )}
              </>
            )}

            {/* Style transfer */}
            {selectedTool === "style" && (
              <div>
                <Label className="text-xs">目標風格</Label>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {styleOptions.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedStyle(s)}
                      className={`rounded-lg border px-3 py-2 text-xs font-medium transition-colors ${
                        selectedStyle === s
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border text-muted-foreground hover:border-primary/30"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
                <div className="mt-3">
                  <Label className="text-xs">風格強度</Label>
                  <Slider
                    defaultValue={[70]}
                    min={10}
                    max={100}
                    step={10}
                    className="mt-2"
                  />
                </div>
              </div>
            )}

            {/* Expand */}
            {selectedTool === "expand" && (
              <div>
                <Label className="text-xs">擴展方向</Label>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {["上方", "下方", "左方", "右方"].map((dir) => (
                    <Button
                      key={dir}
                      variant="outline"
                      size="sm"
                      className="text-xs"
                    >
                      {dir}
                    </Button>
                  ))}
                </div>
                <div className="mt-3">
                  <Label className="text-xs">擴展比例</Label>
                  <Slider
                    defaultValue={[25]}
                    min={10}
                    max={100}
                    step={10}
                    className="mt-2"
                  />
                  <p className="mt-1 text-xs text-muted-foreground">
                    向外延伸 25%
                  </p>
                </div>
              </div>
            )}

            {/* Remove bg */}
            {selectedTool === "remove-bg" && (
              <div className="text-center">
                <Eraser className="mx-auto h-10 w-10 text-muted-foreground/30" />
                <p className="mt-3 text-sm text-muted-foreground">
                  一鍵自動移除背景
                </p>
                <p className="mt-1 text-xs text-muted-foreground/60">
                  AI 會自動偵測主體並移除背景
                </p>
              </div>
            )}

            {/* Upscale */}
            {selectedTool === "upscale" && (
              <div>
                <Label className="text-xs">放大倍數</Label>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {["2x", "4x", "8x"].map((scale) => (
                    <Button
                      key={scale}
                      variant="outline"
                      size="sm"
                      className="text-xs"
                    >
                      {scale}
                    </Button>
                  ))}
                </div>
                <p className="mt-3 text-xs text-muted-foreground">
                  更高倍數需要更多處理時間
                </p>
              </div>
            )}

            {/* Action button */}
            <Button
              onClick={handleProcess}
              disabled={isProcessing}
              className="mt-2 min-h-[44px] gap-2"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  處理中...
                </>
              ) : (
                <>
                  <Wand2 className="h-4 w-4" />
                  套用 {tools.find((t) => t.id === selectedTool)?.name}
                </>
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
