import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'

export default function Login() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [loginAttempts, setLoginAttempts] = useState(0)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    // TODO: reCAPTCHA 검증

    // admin@gmail.com/1234 체크
    if (formData.email === 'admin@gmail.com' && formData.password === '1234') {
      // 로그인 성공 - 메인 화면으로 이동 (2차 인증은 메인 화면에서 진행)
      navigate('/main')
    } else {
      // 로그인 실패
      const newAttempts = loginAttempts + 1
      setLoginAttempts(newAttempts)

      if (newAttempts >= 5) {
        setError('로그인 시도 5회 이상 실패하였습니다. 비밀번호를 변경해주세요.')
        setTimeout(() => {
          navigate('/find-password')
        }, 3000)
      } else {
        setError(`이메일 또는 비밀번호가 올바르지 않습니다. (${newAttempts}/5)`)
      }
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Project Name */}
        <div className="text-center">
          <h1 className="font-display text-6xl text-primary tracking-wider">
            SERVERHUB
          </h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-heading text-primary">로그인</CardTitle>
            <CardDescription>계정에 로그인합니다</CardDescription>
          </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">이메일</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="example@email.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">비밀번호</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="비밀번호를 입력하세요"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {/* reCAPTCHA placeholder */}
            <div className="bg-muted p-4 rounded-md text-center text-sm text-muted-foreground border">
              reCAPTCHA 영역 (구현 예정)
            </div>

            <Button type="submit" className="w-full" size="lg">
              로그인
            </Button>

            <div className="flex justify-between text-sm">
              <button
                type="button"
                onClick={() => navigate('/find-email')}
                className="text-primary hover:underline"
              >
                이메일 찾기
              </button>
              <button
                type="button"
                onClick={() => navigate('/find-password')}
                className="text-primary hover:underline"
              >
                비밀번호 찾기
              </button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            계정이 없으신가요?{' '}
            <button
              onClick={() => navigate('/signup')}
              className="text-primary hover:underline font-medium"
            >
              회원가입
            </button>
          </p>
        </CardFooter>
        </Card>
      </div>
    </div>
  )
}
