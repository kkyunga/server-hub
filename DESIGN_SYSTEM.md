# Server Hub Design System

## 개요
Tailwind CSS와 shadcn/ui를 기반으로 한 녹색 퍼스널 컬러 테마의 디자인 시스템입니다.

## 기술 스택
- **CSS 프레임워크**: Tailwind CSS
- **UI 컴포넌트**: shadcn/ui
- **폰트**: Google Fonts (Inter, Poppins, Noto Sans KR, Bebas Neue, Oswald)
- **주 색상**: 녹색 (Green)

## 설치된 패키지
```json
{
  "dependencies": {
    "class-variance-authority": "^latest",
    "clsx": "^latest",
    "tailwind-merge": "^latest",
    "lucide-react": "^latest"
  },
  "devDependencies": {
    "tailwindcss": "^latest",
    "postcss": "^latest",
    "autoprefixer": "^latest"
  }
}
```

## 폰트 설정

### Sans-Serif (기본 폰트)
- **Inter**: 본문 텍스트, UI 요소에 사용
- **Poppins**: 헤딩, 제목에 사용
- **Noto Sans KR**: 한글 지원

### Display Fonts (제목 전용)
- **Bebas Neue**: 대형 헤드라인
- **Oswald**: 강조 헤드라인

### 사용 방법
```jsx
<h1 className="font-sans">기본 산세리프 폰트</h1>
<h2 className="font-heading">헤딩 폰트 (Poppins)</h2>
<h1 className="font-display">디스플레이 폰트 (Bebas Neue)</h1>
```

## 색상 팔레트

### Primary (녹색 계열)
- Primary: `hsl(142 76% 36%)` - 메인 녹색
- Primary Foreground: `hsl(144 100% 98%)` - 흰색

### Secondary
- Secondary: `hsl(142 10% 95%)` - 연한 녹색
- Secondary Foreground: `hsl(142 8% 15%)` - 진한 회색

### Accent
- Accent: `hsl(142 10% 90%)` - 악센트 녹색
- Accent Foreground: `hsl(142 8% 15%)` - 진한 회색

### Additional Colors
- Destructive: 빨간색 계열 (삭제, 오류)
- Muted: 비활성화된 텍스트
- Border: 테두리 색상
- Input: 입력 필드 배경

## 컴포넌트 목록

### 1. Button
다양한 버튼 스타일과 크기를 제공합니다.

```jsx
import { Button } from '@/components/ui/button'

// Variants
<Button>Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="link">Link</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon">Icon</Button>
```

### 2. Input
입력 필드 컴포넌트입니다.

```jsx
import { Input } from '@/components/ui/input'

<Input type="text" placeholder="텍스트 입력" />
<Input type="email" placeholder="이메일 입력" />
<Input type="password" placeholder="비밀번호 입력" />
```

### 3. Label
입력 필드의 레이블입니다.

```jsx
import { Label } from '@/components/ui/label'

<Label htmlFor="email">이메일</Label>
<Input id="email" type="email" />
```

### 4. Card
카드 컨테이너 컴포넌트입니다.

```jsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'

<Card>
  <CardHeader>
    <CardTitle>카드 제목</CardTitle>
    <CardDescription>카드 설명</CardDescription>
  </CardHeader>
  <CardContent>
    카드 내용
  </CardContent>
  <CardFooter>
    카드 푸터
  </CardFooter>
</Card>
```

### 5. Alert
알림 메시지 컴포넌트입니다.

```jsx
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'

<Alert>
  <AlertTitle>알림 제목</AlertTitle>
  <AlertDescription>알림 내용</AlertDescription>
</Alert>

<Alert variant="success">성공 메시지</Alert>
<Alert variant="destructive">오류 메시지</Alert>
```

### 6. Badge
작은 라벨 컴포넌트입니다.

```jsx
import { Badge } from '@/components/ui/badge'

<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="destructive">Destructive</Badge>
<Badge variant="outline">Outline</Badge>
```

## 개발 서버 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:5173`을 열면 디자인 시스템 시연 페이지를 확인할 수 있습니다.

## 파일 구조

```
src/
├── components/
│   └── ui/
│       ├── button.jsx
│       ├── input.jsx
│       ├── label.jsx
│       ├── card.jsx
│       ├── alert.jsx
│       └── badge.jsx
├── lib/
│   └── utils.js
├── App.jsx (디자인 시스템 시연 페이지)
├── main.jsx
└── index.css (Tailwind + 테마 설정)
```

## 다크 모드

모든 컴포넌트는 다크 모드를 지원합니다. HTML 요소에 `dark` 클래스를 추가하면 다크 모드가 활성화됩니다.

```jsx
<html className="dark">
  <!-- 다크 모드 적용 -->
</html>
```

## 추가 컴포넌트

필요한 경우 shadcn/ui의 다른 컴포넌트들도 추가할 수 있습니다:
- Dialog (모달)
- Dropdown Menu
- Tabs
- Toast (알림)
- Select
- Checkbox
- Radio Group
- Textarea
- 등등...

## 프로젝트에서 사용하기

1. 컴포넌트 import:
```jsx
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
```

2. Tailwind 클래스 사용:
```jsx
<div className="bg-primary text-primary-foreground p-4 rounded-lg">
  녹색 배경의 박스
</div>
```

3. 커스텀 스타일링:
```jsx
<Button className="bg-green-600 hover:bg-green-700">
  커스텀 녹색 버튼
</Button>
```

## 참고 자료
- [Tailwind CSS 문서](https://tailwindcss.com/docs)
- [shadcn/ui 문서](https://ui.shadcn.com/)
- [Google Fonts](https://fonts.google.com/)
