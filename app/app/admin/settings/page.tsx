"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  Settings,
  Shield,
  Bell,
  Palette,
  Database,
  Key,
  Globe,
  MessageSquare,
  Bot,
  ImageIcon,
  Save,
  AlertTriangle,
  CheckCircle,
} from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 lg:py-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold text-foreground">
            <Settings className="h-6 w-6 text-primary" />
            系統設定
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            管理平台全域設定、安全性與 API 配置
          </p>
        </div>
        <Button className="gap-1.5" onClick={handleSave}>
          <Save className="h-4 w-4" />
          儲存變更
        </Button>
      </div>

      {/* Save Alert */}
      {saved && (
        <Alert className="mt-4 border-emerald-500/50 bg-emerald-50 dark:bg-emerald-950/20">
          <CheckCircle className="h-4 w-4 text-emerald-600" />
          <AlertTitle className="text-emerald-600">設定已儲存</AlertTitle>
          <AlertDescription className="text-emerald-600/80">
            系統設定已成功更新。
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="general" className="mt-6">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="general" className="gap-1.5">
            <Globe className="h-4 w-4" />
            一般設定
          </TabsTrigger>
          <TabsTrigger value="features" className="gap-1.5">
            <Bot className="h-4 w-4" />
            功能開關
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-1.5">
            <Shield className="h-4 w-4" />
            安全性
          </TabsTrigger>
          <TabsTrigger value="api" className="gap-1.5">
            <Key className="h-4 w-4" />
            API 設定
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="mt-6 space-y-6">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-base">平台資訊</CardTitle>
              <CardDescription>設定平台名稱與基本資訊</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="platform-name">平台名稱</Label>
                <Input id="platform-name" defaultValue="LearnAI" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="school-name">學校名稱</Label>
                <Input id="school-name" defaultValue="示範高級中學" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="welcome-message">歡迎訊息</Label>
                <Textarea
                  id="welcome-message"
                  defaultValue="歡迎使用 LearnAI 智慧學習平台！"
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-base">使用限制</CardTitle>
              <CardDescription>設定各角色的每日使用配額</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>學生每日對話上限</Label>
                  <Input type="number" defaultValue="100" />
                </div>
                <div className="grid gap-2">
                  <Label>學生每日圖像生成上限</Label>
                  <Input type="number" defaultValue="20" />
                </div>
                <div className="grid gap-2">
                  <Label>教師每日對話上限</Label>
                  <Input type="number" defaultValue="500" />
                </div>
                <div className="grid gap-2">
                  <Label>教師每日圖像生成上限</Label>
                  <Input type="number" defaultValue="50" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Feature Settings */}
        <TabsContent value="features" className="mt-6 space-y-6">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-base">功能模組開關</CardTitle>
              <CardDescription>啟用或停用平台功能模組</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  icon: MessageSquare,
                  name: "AI 對話學習",
                  description: "允許使用者與 AI 進行對話學習",
                  defaultChecked: true,
                },
                {
                  icon: Bot,
                  name: "智能體建立器",
                  description: "允許使用者建立自訂智能體",
                  defaultChecked: true,
                },
                {
                  icon: ImageIcon,
                  name: "圖像生成",
                  description: "允許使用 AI 生成圖像",
                  defaultChecked: true,
                },
                {
                  icon: ImageIcon,
                  name: "圖像編輯",
                  description: "允許使用 AI 編輯圖像",
                  defaultChecked: true,
                },
              ].map((feature) => (
                <div
                  key={feature.name}
                  className="flex items-center justify-between rounded-lg border border-border p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-primary/10 p-2">
                      <feature.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {feature.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                  <Switch defaultChecked={feature.defaultChecked} />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-base">學生功能限制</CardTitle>
              <CardDescription>特定功能的學生使用權限</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">允許學生建立智能體</p>
                  <p className="text-xs text-muted-foreground">
                    學生可自行建立並分享智能體
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">允許學生公開發布智能體</p>
                  <p className="text-xs text-muted-foreground">
                    學生建立的智能體可公開至市集
                  </p>
                </div>
                <Switch />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">啟用內容審核</p>
                  <p className="text-xs text-muted-foreground">
                    自動過濾不當內容與敏感詞彙
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="mt-6 space-y-6">
          <Alert className="border-amber-500/50 bg-amber-50 dark:bg-amber-950/20">
            <AlertTriangle className="h-4 w-4 text-amber-600" />
            <AlertTitle className="text-amber-600">安全提醒</AlertTitle>
            <AlertDescription className="text-amber-600/80">
              修改安全設定可能影響所有使用者的登入狀態，請謹慎操作。
            </AlertDescription>
          </Alert>

          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-base">登入安全</CardTitle>
              <CardDescription>設定登入相關安全規則</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">強制定期更換密碼</p>
                  <p className="text-xs text-muted-foreground">
                    要求使用者每 90 天更換密碼
                  </p>
                </div>
                <Switch />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">登入失敗鎖定</p>
                  <p className="text-xs text-muted-foreground">
                    連續 5 次登入失敗後暫時鎖定帳號
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="grid gap-2">
                <Label>Session 有效時間</Label>
                <Select defaultValue="24h">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1h">1 小時</SelectItem>
                    <SelectItem value="8h">8 小時</SelectItem>
                    <SelectItem value="24h">24 小時</SelectItem>
                    <SelectItem value="7d">7 天</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-base">資料保護</CardTitle>
              <CardDescription>設定資料保留與隱私政策</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label>對話記錄保留天數</Label>
                <Select defaultValue="365">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 天</SelectItem>
                    <SelectItem value="90">90 天</SelectItem>
                    <SelectItem value="180">180 天</SelectItem>
                    <SelectItem value="365">365 天</SelectItem>
                    <SelectItem value="forever">永久保留</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">匿名化統計資料</p>
                  <p className="text-xs text-muted-foreground">
                    統計報表中隱藏個人識別資訊
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* API Settings */}
        <TabsContent value="api" className="mt-6 space-y-6">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-base">AI 服務 API</CardTitle>
              <CardDescription>設定 AI 模型服務的 API 金鑰</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="openai-key">OpenAI API Key</Label>
                <Input
                  id="openai-key"
                  type="password"
                  defaultValue="sk-••••••••••••••••••••••••••••••••"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="anthropic-key">Anthropic API Key</Label>
                <Input
                  id="anthropic-key"
                  type="password"
                  placeholder="sk-ant-..."
                />
              </div>
              <div className="grid gap-2">
                <Label>預設 AI 模型</Label>
                <Select defaultValue="gpt-4">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gpt-4">GPT-4</SelectItem>
                    <SelectItem value="gpt-3.5">GPT-3.5 Turbo</SelectItem>
                    <SelectItem value="claude">Claude 3.5 Sonnet</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-base">圖像生成 API</CardTitle>
              <CardDescription>設定圖像生成服務的 API 金鑰</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="dalle-key">DALL-E API Key</Label>
                <Input
                  id="dalle-key"
                  type="password"
                  defaultValue="sk-••••••••••••••••••••••••••••••••"
                />
              </div>
              <div className="grid gap-2">
                <Label>預設圖像模型</Label>
                <Select defaultValue="dalle-3">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dalle-3">DALL-E 3</SelectItem>
                    <SelectItem value="dalle-2">DALL-E 2</SelectItem>
                    <SelectItem value="stable-diffusion">Stable Diffusion XL</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
