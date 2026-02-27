"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  Sparkles, 
  Eye, 
  EyeOff, 
  ArrowLeft,
  GraduationCap,
  BookOpen,
  Shield,
  Loader2,
  AlertCircle
} from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

type UserRole = "student" | "teacher" | "admin"

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    studentId: "",
    password: "",
    role: "student" as UserRole,
    rememberMe: false
  })

  const roleConfig = {
    student: {
      icon: GraduationCap,
      label: "學生",
      placeholder: "請輸入學號",
      color: "text-blue-600"
    },
    teacher: {
      icon: BookOpen,
      label: "教師",
      placeholder: "請輸入教職員編號",
      color: "text-emerald-600"
    },
    admin: {
      icon: Shield,
      label: "管理員",
      placeholder: "請輸入管理員帳號",
      color: "text-violet-600"
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    // Simulate login - replace with actual auth logic
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Demo: check for demo credentials
    if (formData.studentId && formData.password) {
      // In production, validate against your auth system
      const redirectPath = formData.role === "admin" 
        ? "/app/admin" 
        : formData.role === "teacher"
        ? "/app/teacher"
        : "/app"
      router.push(redirectPath)
    } else {
      setError("請輸入帳號和密碼")
      setIsLoading(false)
    }
  }

  const currentRole = roleConfig[formData.role]
  const RoleIcon = currentRole.icon

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-primary/5 flex flex-col">
      {/* Header */}
      <header className="p-4">
        <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">返回首頁</span>
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent mb-4">
              <Sparkles className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">登入 LearnAI</h1>
            <p className="text-muted-foreground mt-1">使用學校帳號登入平台</p>
          </div>

          {/* Login Card */}
          <Card className="border-border/50 shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <RoleIcon className={`w-5 h-5 ${currentRole.color}`} />
                {currentRole.label}登入
              </CardTitle>
              <CardDescription>
                請輸入您的學校帳號資訊
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Role Selector */}
                <div className="space-y-2">
                  <Label htmlFor="role">身份</Label>
                  <Select
                    value={formData.role}
                    onValueChange={(value: UserRole) => 
                      setFormData(prev => ({ ...prev, role: value, studentId: "" }))
                    }
                  >
                    <SelectTrigger id="role">
                      <SelectValue placeholder="選擇身份" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="student">
                        <div className="flex items-center gap-2">
                          <GraduationCap className="w-4 h-4 text-blue-600" />
                          <span>學生</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="teacher">
                        <div className="flex items-center gap-2">
                          <BookOpen className="w-4 h-4 text-emerald-600" />
                          <span>教師</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="admin">
                        <div className="flex items-center gap-2">
                          <Shield className="w-4 h-4 text-violet-600" />
                          <span>管理員</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Student ID / Employee ID */}
                <div className="space-y-2">
                  <Label htmlFor="studentId">
                    {formData.role === "student" ? "學號" : formData.role === "teacher" ? "教職員編號" : "管理員帳號"}
                  </Label>
                  <Input
                    id="studentId"
                    type="text"
                    placeholder={currentRole.placeholder}
                    value={formData.studentId}
                    onChange={(e) => setFormData(prev => ({ ...prev, studentId: e.target.value }))}
                    className="h-11"
                    autoComplete="username"
                  />
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">密碼</Label>
                    <Link href="/forgot-password" className="text-xs text-primary hover:underline">
                      忘記密碼？
                    </Link>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="請輸入密碼"
                      value={formData.password}
                      onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                      className="h-11 pr-10"
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Remember Me */}
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="rememberMe"
                    checked={formData.rememberMe}
                    onCheckedChange={(checked) => 
                      setFormData(prev => ({ ...prev, rememberMe: checked as boolean }))
                    }
                  />
                  <Label htmlFor="rememberMe" className="text-sm font-normal cursor-pointer">
                    記住我的登入狀態
                  </Label>
                </div>

                {/* Error Alert */}
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  className="w-full h-11 text-base"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      登入中...
                    </>
                  ) : (
                    "登入"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Help Text */}
          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>
              首次登入？預設密碼為身分證後四碼。
              <br />
              如有問題請聯繫 <Link href="/help" className="text-primary hover:underline">資訊中心</Link>
            </p>
          </div>

          {/* Demo Credentials */}
          <Card className="mt-6 border-dashed border-amber-300 bg-amber-50/50 dark:bg-amber-950/20">
            <CardContent className="pt-4 pb-4">
              <p className="text-sm text-amber-800 dark:text-amber-200 font-medium mb-2">
                Demo 測試帳號
              </p>
              <div className="text-xs text-amber-700 dark:text-amber-300 space-y-1">
                <p>學生：S12345 / demo123</p>
                <p>教師：T00001 / demo123</p>
                <p>管理員：admin / demo123</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-4 text-center text-sm text-muted-foreground">
        <div className="flex items-center justify-center gap-4">
          <Link href="/privacy" className="hover:text-foreground transition-colors">隱私政策</Link>
          <span>|</span>
          <Link href="/terms" className="hover:text-foreground transition-colors">使用條款</Link>
          <span>|</span>
          <Link href="/help" className="hover:text-foreground transition-colors">幫助中心</Link>
        </div>
      </footer>
    </div>
  )
}
