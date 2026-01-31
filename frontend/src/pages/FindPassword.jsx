import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

export default function FindPassword() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1) // 1: 정보 입력, 2: 비밀번호 변경
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    phone: '',
    newPassword: '',
    newPasswordConfirm: ''
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleRequestReset = async (e) => {
    e.preventDefault()
    setError('')

    // TODO: API 호출 - 비밀번호 재설정 링크 전송
    console.log('비밀번호 찾기 데이터:', formData)

    setSuccess('비밀번호 변경 링크가 이메일로 전송되었습니다.')

    // 실제로는 이메일 링크를 통해 접근하지만, 데모를 위해 다음 단계로 진행
    setTimeout(() => {
      setStep(2)
      setSuccess('')
    }, 2000)
  }

  const handleResetPassword = async (e) => {
    e.preventDefault()
    setError('')

    if (formData.newPassword !== formData.newPasswordConfirm) {
      setError('비밀번호가 일치하지 않습니다.')
      return
    }

    if (formData.newPassword.length < 8) {
      setError('비밀번호는 최소 8자 이상이어야 합니다.')
      return
    }

    // TODO: API 호출 - 비밀번호 변경
    console.log('새 비밀번호:', formData.newPassword)

    setSuccess('비밀번호가 성공적으로 변경되었습니다.')
    setTimeout(() => {
      navigate('/login')
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-heading text-primary">
            {step === 1 ? '비밀번호 찾기' : '비밀번호 변경'}
          </CardTitle>
          <CardDescription>
            {step === 1
              ? '계정 정보를 입력하여 비밀번호를 재설정합니다'
              : '새로운 비밀번호를 입력하세요'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === 1 ? (
            <form onSubmit={handleRequestReset} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              {success && (
                <Alert variant="success">
                  <AlertTitle>전송 완료</AlertTitle>
                  <AlertDescription>{success}</AlertDescription>
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

              <Button type="submit" className="w-full" size="lg">
                비밀번호 재설정 링크 전송
              </Button>
            </form>
          ) : (
            <form onSubmit={handleResetPassword} className="space-y-4">
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
                <Label htmlFor="newPassword">새 비밀번호</Label>
                <Input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  placeholder="새 비밀번호 (최소 8자)"
                  value={formData.newPassword}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="newPasswordConfirm">새 비밀번호 확인</Label>
                <Input
                  id="newPasswordConfirm"
                  name="newPasswordConfirm"
                  type="password"
                  placeholder="새 비밀번호 확인"
                  value={formData.newPasswordConfirm}
                  onChange={handleChange}
                  required
                />
              </div>

              <Button type="submit" className="w-full" size="lg">
                비밀번호 변경
              </Button>
            </form>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          <button
            onClick={() => navigate('/login')}
            className="text-sm text-muted-foreground hover:text-primary"
          >
            ← 로그인 화면으로 돌아가기
          </button>
        </CardFooter>
      </Card>
    </div>
  )
}
