import { useNavigate } from "react-router-dom";
import api from "@/api/axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useState, useLayoutEffect } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useLogin } from "@/hooks/queries/useAuth";

export default function Login() {
  // [추가] 컴포넌트 렌더링 전 로그인 상태 체크
  const navigate = useNavigate();
  useLayoutEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      // replace: true를 사용하여 히스토리에 로그인 페이지를 남기지 않음
      navigate("/main", { replace: true });
    }
  }, [navigate]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loginAttempts, setLoginAttempts] = useState(0);
  const { mutate: login, isPending } = useLogin(setLoginAttempts, setError);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    login({
      email: formData.email,
      password: formData.password,
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-background">
      <div className="w-full max-w-md space-y-6">
        {/* Project Name */}
        <div className="text-center">
          <h1 className="text-6xl tracking-wider font-display text-primary">
            SERVERHUB
          </h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-heading text-primary">
              로그인
            </CardTitle>
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

              <Button type="submit" className="w-full" size="lg">
                로그인
              </Button>

              <div className="flex justify-between text-sm">
                <button
                  type="button"
                  onClick={() => navigate("/find-email")}
                  className="text-primary hover:underline"
                >
                  이메일 찾기
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/find-password")}
                  className="text-primary hover:underline"
                >
                  비밀번호 찾기
                </button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-muted-foreground">
              계정이 없으신가요?{" "}
              <button
                onClick={() => navigate("/signup")}
                className="font-medium text-primary hover:underline"
              >
                회원가입
              </button>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
