import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'

export default function SignUp() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    verificationCode: '',
    phone: '',
    password: '',
    passwordConfirm: ''
  })
  const [isCodeSent, setIsCodeSent] = useState(false)
  const [isCodeVerified, setIsCodeVerified] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSendCode = async () => {
    if (!formData.email) {
      setError('이메일을 입력해주세요.')
      return
    }
    // TODO: API 호출 - 인증번호 발송
    setIsCodeSent(true)
    setSuccess('인증번호가 이메일로 전송되었습니다.')
    setTimeout(() => setSuccess(''), 3000)
  }

  const handleVerifyCode = async () => {
    if (!formData.verificationCode) {
      setError('인증번호를 입력해주세요.')
      return
    }
    // TODO: API 호출 - 인증번호 검증
    setIsCodeVerified(true)
    setSuccess('이메일 인증이 완료되었습니다.')
    setTimeout(() => setSuccess(''), 3000)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!isCodeVerified) {
      setError('이메일 인증을 완료해주세요.')
      return
    }

    if (formData.password !== formData.passwordConfirm) {
      setError('비밀번호가 일치하지 않습니다.')
      return
    }

    // TODO: API 호출 - 회원가입
    console.log('회원가입 데이터:', formData)
    setSuccess('회원가입이 완료되었습니다.')
    setTimeout(() => {
      navigate('/login')
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-heading text-primary">회원가입</CardTitle>
          <CardDescription>새로운 계정을 생성합니다</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {success && (
              <Alert variant="success">
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="name">이름</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="홍길동"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">이메일</Label>
              <div className="flex gap-2">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="example@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isCodeVerified}
                  required
                  className="flex-1"
                />
                <Button
                  type="button"
                  onClick={handleSendCode}
                  disabled={isCodeVerified || !formData.email}
                  variant={isCodeSent ? "secondary" : "default"}
                >
                  {isCodeSent ? '재발송' : '발송'}
                </Button>
              </div>
            </div>

            {isCodeSent && (
              <div className="space-y-2">
                <Label htmlFor="verificationCode">인증번호</Label>
                <div className="flex gap-2">
                  <Input
                    id="verificationCode"
                    name="verificationCode"
                    type="text"
                    placeholder="6자리 인증번호"
                    value={formData.verificationCode}
                    onChange={handleChange}
                    disabled={isCodeVerified}
                    required
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    onClick={handleVerifyCode}
                    disabled={isCodeVerified || !formData.verificationCode}
                  >
                    {isCodeVerified ? '완료' : '검증'}
                  </Button>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="phone">전화번호</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="010-1234-5678"
                value={formData.phone}
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

            <div className="space-y-2">
              <Label htmlFor="passwordConfirm">비밀번호 확인</Label>
              <Input
                id="passwordConfirm"
                name="passwordConfirm"
                type="password"
                placeholder="비밀번호를 다시 입력하세요"
                value={formData.passwordConfirm}
                onChange={handleChange}
                required
              />
            </div>

            <Button type="submit" className="w-full" size="lg">
              가입하기
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            이미 계정이 있으신가요?{' '}
            <button
              onClick={() => navigate('/login')}
              className="text-primary hover:underline font-medium"
            >
              로그인
            </button>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
