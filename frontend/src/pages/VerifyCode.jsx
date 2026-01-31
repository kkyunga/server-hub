import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'

export default function VerifyCode() {
  const navigate = useNavigate()
  const location = useLocation()
  const email = location.state?.email || ''

  const [verificationCode, setVerificationCode] = useState('')
  const [error, setError] = useState('')
  const [timeLeft, setTimeLeft] = useState(300) // 5분 = 300초

  useEffect(() => {
    if (!email) {
      navigate('/login')
      return
    }

    // 타이머 설정
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          setError('인증 시간이 만료되었습니다. 다시 로그인해주세요.')
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [email, navigate])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleVerify = async (e) => {
    e.preventDefault()
    setError('')

    if (!verificationCode) {
      setError('인증번호를 입력해주세요.')
      return
    }

    // 인증번호 검증 (4567abc)
    if (verificationCode === '4567abc') {
      // 인증 성공 - 메인 화면으로 이동
      navigate('/main')
    } else {
      setError('인증번호가 올바르지 않습니다. 다시 확인해주세요.')
    }
  }

  const handleResendCode = async () => {
    // TODO: API 호출 - 인증번호 재발송
    setTimeLeft(300)
    setError('')
    alert('인증번호가 재전송되었습니다.')
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-heading text-primary">2차 인증</CardTitle>
          <CardDescription>
            <span className="block mb-1">이메일로 전송된 인증번호를 입력하세요</span>
            <span className="text-primary font-medium">{email}</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleVerify} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Alert>
              <AlertDescription>
                인증번호가 {email}로 전송되었습니다.
              </AlertDescription>
            </Alert>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="verificationCode">인증번호</Label>
                <span className="text-sm font-medium text-primary">
                  남은 시간: {formatTime(timeLeft)}
                </span>
              </div>
              <Input
                id="verificationCode"
                name="verificationCode"
                type="text"
                placeholder="인증번호 입력"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                maxLength={20}
                className="text-center text-lg tracking-widest"
                required
                autoFocus
              />
              <p className="text-xs text-muted-foreground text-center">
                이메일을 확인하여 인증번호를 입력하세요
              </p>
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={timeLeft === 0}>
              인증 확인
            </Button>

            <div className="text-center">
              <button
                type="button"
                onClick={handleResendCode}
                className="text-sm text-primary hover:underline"
                disabled={timeLeft === 0}
              >
                인증번호 재전송
              </button>
            </div>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="text-sm text-muted-foreground hover:text-primary"
              >
                ← 로그인 화면으로 돌아가기
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
