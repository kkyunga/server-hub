import {useRef, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

export default function DesignSystem() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)

  // --- Kafka 테스트용 상태 ---
  const [messages, setMessages] = useState([])
  const [isConnected, setIsConnected] = useState(false)
  const socketRef = useRef(null)

  const connectKafka = () => {
    // http가 아니라 ws 프로토콜을 사용합니다.
    const wsUrl = 'ws://localhost:9080/api/ws-connect';
    const stompClient = Stomp.over(new WebSocket(wsUrl));

    stompClient.connect({}, (frame) => {
      setIsConnected(true);
      stompClient.subscribe('/topic/monitor', (msg) => {
        setMessages((prev) => [msg.body, ...prev].slice(0, 20));
      });
    }, (err) => {
      console.error(err);
    });

    socketRef.current = stompClient;
  };

  const disconnectKafka = () => {
    if (socketRef.current) {
      socketRef.current.disconnect();
      setIsConnected(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold font-heading text-primary">Design System</h1>
            <p className="text-muted-foreground mt-2">Tailwind CSS + shadcn/ui + 녹색 테마</p>
          </div>
          <Button onClick={() => navigate('/')} variant="outline">
            ← 홈으로
          </Button>
        </div>

        {showSuccess && (
          <Alert variant="success">
            <AlertTitle>성공!</AlertTitle>
            <AlertDescription>폼이 성공적으로 제출되었습니다.</AlertDescription>
          </Alert>
        )}

        <div className="grid md:grid-cols-2 gap-6">

          {/* --- Kafka 테스트 카드 수정본 --- */}
          <Card className="border-primary/50 shadow-md">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Kafka 실시간 모니터링</CardTitle>
                <Badge variant={isConnected ? "default" : "destructive"}>
                  {isConnected ? "연결됨" : "연결 끊김"}
                </Badge>
              </div>
              <CardDescription>DB - Kafka - WebSocket 흐름 테스트</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Button
                    type="button"
                    onClick={connectKafka}
                    disabled={isConnected}
                    className="bg-green-600 hover:bg-green-700 text-white"
                >
                  연결 시작
                </Button>
                <Button
                    type="button"
                    onClick={disconnectKafka}
                    disabled={!isConnected}
                    variant="outline"
                >
                  연결 종료
                </Button>
                <Button
                    type="button"
                    onClick={() => setMessages([])}
                    variant="ghost"
                    size="sm"
                >
                  비우기
                </Button>
              </div>

              <div className="h-[200px] border rounded-md bg-muted/30 p-4 overflow-y-auto font-mono text-xs">
                {messages.length === 0 ? (
                    <p className="text-muted-foreground text-center pt-20">수신된 메시지가 없습니다.</p>
                ) : (
                    messages.map((msg, idx) => (
                        <div key={idx} className="mb-2 pb-2 border-b last:border-0 border-primary/20 text-foreground">
            <span className="text-primary font-bold mr-2">
              [{new Date().toLocaleTimeString()}]
            </span>
                          {typeof msg === 'object' ? JSON.stringify(msg) : msg}
                        </div>
                    ))
                )}
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-xs text-muted-foreground">※ 백엔드의 /ws/monitor 엔드포인트와 통신합니다.</p>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Button 컴포넌트</CardTitle>
              <CardDescription>다양한 버튼 스타일</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Button>Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Form 컴포넌트</CardTitle>
              <CardDescription>입력 필드 및 레이블</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">이메일</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="example@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">비밀번호</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="비밀번호를 입력하세요"
                  />
                </div>
                <Button type="submit" className="w-full">로그인</Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Alert 컴포넌트</CardTitle>
              <CardDescription>알림 메시지</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <AlertTitle>기본 알림</AlertTitle>
                <AlertDescription>기본 알림 메시지입니다.</AlertDescription>
              </Alert>
              <Alert variant="success">
                <AlertTitle>성공</AlertTitle>
                <AlertDescription>작업이 완료되었습니다.</AlertDescription>
              </Alert>
              <Alert variant="destructive">
                <AlertTitle>오류</AlertTitle>
                <AlertDescription>오류가 발생했습니다.</AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Typography</CardTitle>
              <CardDescription>폰트 패밀리</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Sans-serif</p>
                <p className="font-sans">The quick brown fox jumps</p>
                <p className="font-sans text-sm">빠른 갈색 여우가 게으른 개를</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Heading</p>
                <p className="font-heading text-xl font-semibold">Heading Typography</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Display</p>
                <p className="font-display text-2xl">DISPLAY FONT</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge>New</Badge>
                <Badge variant="secondary">Updated</Badge>
                <Badge variant="destructive">Deprecated</Badge>
                <Badge variant="outline">Beta</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>녹색 테마 컬러 팔레트</CardTitle>
            <CardDescription>Primary, Secondary, Accent</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <div className="h-20 rounded-lg bg-primary"></div>
                <p className="text-sm font-medium">Primary</p>
              </div>
              <div className="space-y-2">
                <div className="h-20 rounded-lg bg-secondary"></div>
                <p className="text-sm font-medium">Secondary</p>
              </div>
              <div className="space-y-2">
                <div className="h-20 rounded-lg bg-accent"></div>
                <p className="text-sm font-medium">Accent</p>
              </div>
              <div className="space-y-2">
                <div className="h-20 rounded-lg bg-muted"></div>
                <p className="text-sm font-medium">Muted</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
