import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function Home() {
  const navigate = useNavigate()

  const pages = [
    { path: '/login', title: '로그인', desc: '계정 로그인 및 2차 인증' },
    { path: '/signup', title: '회원가입', desc: '새 계정 생성 및 이메일 인증' },
    { path: '/find-email', title: '이메일 찾기', desc: '이름과 전화번호로 이메일 찾기' },
    { path: '/find-password', title: '비밀번호 찾기', desc: '비밀번호 재설정' },
    { path: '/design-system', title: '디자인 시스템', desc: '컴포넌트 시연' }
  ]

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold font-heading text-primary">
            Server Hub
          </h1>
          <p className="text-lg text-muted-foreground">
            인증 시스템 데모 페이지
          </p>
          <div className="flex justify-center gap-2">
            <Badge>Tailwind CSS</Badge>
            <Badge variant="secondary">shadcn/ui</Badge>
            <Badge variant="outline">React Router</Badge>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>구현된 화면 목록</CardTitle>
            <CardDescription>각 화면을 클릭하여 이동할 수 있습니다</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {pages.map((page) => (
                <button
                  key={page.path}
                  onClick={() => navigate(page.path)}
                  className="text-left p-4 rounded-lg border bg-card hover:bg-accent transition-colors"
                >
                  <h3 className="font-semibold text-primary mb-1">{page.title}</h3>
                  <p className="text-sm text-muted-foreground">{page.desc}</p>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>주요 기능</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">✓</span>
                <span>회원가입 시 이메일 인증 (발송/검증)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">✓</span>
                <span>로그인 2차 인증 (reCAPTCHA + 이메일 인증번호)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">✓</span>
                <span>로그인 실패 5회 시 비밀번호 찾기 유도</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">✓</span>
                <span>이메일/비밀번호 찾기 기능</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">✓</span>
                <span>녹색 퍼스널 컬러 테마 (라이트/다크 모드 지원)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">✓</span>
                <span>Google Fonts (Inter, Poppins, Noto Sans KR)</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <div className="text-center text-sm text-muted-foreground">
          <p>Server Hub · Design System v1.0</p>
        </div>
      </div>
    </div>
  )
}
