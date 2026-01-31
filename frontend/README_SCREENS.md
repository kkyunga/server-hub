# Server Hub - 화면 구현 가이드

## 구현된 화면 목록

### 1. 홈 화면 (/)
- **파일**: [src/pages/Home.jsx](src/pages/Home.jsx)
- **설명**: 전체 화면 네비게이션 및 프로젝트 소개

### 2. 회원가입 화면 (/signup)
- **파일**: [src/pages/SignUp.jsx](src/pages/SignUp.jsx)
- **기능**:
  - 이름, 이메일, 전화번호, 비밀번호 입력
  - 이메일 인증 (발송/검증 버튼)
  - 비밀번호 확인 검증
  - 회원가입 완료 후 로그인 화면 이동

### 3. 로그인 화면 (/login)
- **파일**: [src/pages/Login.jsx](src/pages/Login.jsx)
- **기능**:
  - 이메일/비밀번호 입력
  - reCAPTCHA 영역 (구현 예정)
  - 로그인 성공 시 2차 인증 화면으로 이동
  - 로그인 실패 5회 시 비밀번호 찾기 화면 유도
  - 이메일/비밀번호 찾기 링크

### 4. 인증번호 검증 화면 (/verify-code)
- **파일**: [src/pages/VerifyCode.jsx](src/pages/VerifyCode.jsx)
- **기능**:
  - 로그인 2차 인증 전용 화면
  - 6자리 인증번호 입력
  - 5분 타이머 (카운트다운)
  - 인증번호 재전송 기능
  - 검증 성공 시 서버 목록 화면으로 이동 (구현 예정)

### 5. 이메일 찾기 화면 (/find-email)
- **파일**: [src/pages/FindEmail.jsx](src/pages/FindEmail.jsx)
- **기능**:
  - 이름, 전화번호 입력
  - 조건 일치 시 이메일 표시 (마스킹 처리)
  - 로그인 화면으로 이동 버튼

### 6. 비밀번호 찾기 화면 (/find-password)
- **파일**: [src/pages/FindPassword.jsx](src/pages/FindPassword.jsx)
- **기능**:
  - Step 1: 이메일, 이름, 전화번호 입력 → 재설정 링크 전송
  - Step 2: 새 비밀번호 입력 및 확인
  - 비밀번호 변경 완료 후 로그인 화면 이동

### 7. 디자인 시스템 시연 (/design-system)
- **파일**: [src/pages/DesignSystem.jsx](src/pages/DesignSystem.jsx)
- **설명**: 공통 컴포넌트 및 테마 시연

## 라우팅 구조

```
/ (Home)
├── /login (로그인)
│   └── /verify-code (2차 인증)
├── /signup (회원가입)
├── /find-email (이메일 찾기)
├── /find-password (비밀번호 찾기)
└── /design-system (디자인 시스템)
```

## 화면 흐름도

### 회원가입 플로우
```
회원가입 → 이메일 발송 → 인증번호 검증 → 회원가입 완료 → 로그인
```

### 로그인 플로우
```
로그인 → reCAPTCHA → 1차 인증 → 인증번호 발송 → 2차 인증 → 서버 목록
         ↓ (5회 실패)
     비밀번호 찾기
```

### 비밀번호 찾기 플로우
```
비밀번호 찾기 → 정보 입력 → 이메일 링크 → 새 비밀번호 설정 → 로그인
```

## 공통 컴포넌트 사용

### Button
```jsx
import { Button } from '@/components/ui/button'

<Button>기본 버튼</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button size="lg">Large</Button>
```

### Input
```jsx
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

<Label htmlFor="email">이메일</Label>
<Input id="email" type="email" placeholder="example@email.com" />
```

### Card
```jsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'

<Card>
  <CardHeader>
    <CardTitle>제목</CardTitle>
    <CardDescription>설명</CardDescription>
  </CardHeader>
  <CardContent>내용</CardContent>
  <CardFooter>푸터</CardFooter>
</Card>
```

### Alert
```jsx
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'

<Alert variant="success">
  <AlertTitle>성공</AlertTitle>
  <AlertDescription>작업이 완료되었습니다.</AlertDescription>
</Alert>
```

## 테마 및 스타일

### 퍼스널 컬러 (녹색 테마)
- Primary: 녹색 계열 (`hsl(142 76% 36%)`)
- Secondary: 연한 녹색
- Accent: 악센트 녹색

### 폰트
- **기본 폰트**: Inter, Poppins
- **헤딩 폰트**: Poppins (`font-heading`)
- **디스플레이 폰트**: Bebas Neue (`font-display`)
- **한글 지원**: Noto Sans KR

### Tailwind 클래스 활용
```jsx
// 녹색 테마 적용
<div className="bg-primary text-primary-foreground">
  Primary 색상
</div>

// 헤딩 폰트 사용
<h1 className="font-heading text-2xl text-primary">
  제목
</h1>

// 반응형 레이아웃
<div className="grid md:grid-cols-2 gap-4">
  ...
</div>
```

## TODO - 향후 구현 사항

### API 연동
- [ ] 회원가입 API
- [ ] 이메일 인증번호 발송/검증 API
- [ ] 로그인 API (1차/2차 인증)
- [ ] 이메일 찾기 API
- [ ] 비밀번호 찾기/변경 API

### reCAPTCHA 통합
- [ ] Google reCAPTCHA v2 또는 v3 설치
- [ ] 로그인 화면에 reCAPTCHA 적용
- [ ] reCAPTCHA 검증 로직 구현

### 추가 화면
- [ ] 서버 목록 화면
- [ ] 서버 상세 화면
- [ ] 사용자 프로필 화면
- [ ] 설정 화면

### 기능 개선
- [ ] 폼 유효성 검사 강화 (react-hook-form)
- [ ] 로딩 상태 표시 (Spinner)
- [ ] Toast 알림 (react-hot-toast)
- [ ] 다크 모드 토글 버튼
- [ ] 언어 전환 (i18n)

## 개발 서버 실행

```bash
npm run dev
```

브라우저에서 http://localhost:5174 접속

## 프로젝트 구조

```
src/
├── components/
│   └── ui/           # shadcn/ui 컴포넌트
│       ├── button.jsx
│       ├── input.jsx
│       ├── label.jsx
│       ├── card.jsx
│       ├── alert.jsx
│       └── badge.jsx
├── lib/
│   └── utils.js      # 유틸리티 함수
├── pages/            # 페이지 컴포넌트
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── SignUp.jsx
│   ├── FindEmail.jsx
│   ├── FindPassword.jsx
│   ├── VerifyCode.jsx
│   └── DesignSystem.jsx
├── App.jsx           # 라우터 설정
├── main.jsx          # 앱 진입점
└── index.css         # Tailwind + 테마 설정
```

## 참고 문서

- [DESIGN.md](DESIGN.md) - 화면 기획 및 요구사항
- [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) - 디자인 시스템 가이드
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com/)
- [React Router](https://reactrouter.com/)
